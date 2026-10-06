import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const PORT = 3000;

// Lazy initialization of Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Parham School FinTech Platform", time: new Date().toISOString() });
  });

  // Financial Market Simulated/Live Reference Rates
  app.get("/api/rates", (_req, res) => {
    res.json({
      gold18kPerGram: 4680000, // Tomans per gram
      goldChange24h: "+1.8%",
      silverPerGram: 88500, // Tomans per gram
      silverChange24h: "+2.4%",
      fixedIncomeFundAnnualYield: "31.2%",
      parhamPayDefaultCreditLimit: 15000000, // 15 million tomans
      teacherAdvanceMaxPct: 80, // up to 80% of monthly salary
      wageAdvanceFeePct: 2.5, // 2.5% fee on early salary
    });
  });

  // Calculate Loan & Installments
  app.post("/api/loans/calculate", (req, res) => {
    try {
      const { amount = 20000000, months = 12, interestRate = 4, type = "tuition" } = req.body;
      const principal = Number(amount);
      const n = Number(months);
      const r = Number(interestRate) / 100 / 12;

      let monthlyPayment = 0;
      let totalPayment = 0;
      let totalInterest = 0;

      if (r === 0) {
        monthlyPayment = Math.round(principal / n);
        totalPayment = principal;
        totalInterest = 0;
      } else {
        // Standard amortization formula
        monthlyPayment = Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        totalPayment = monthlyPayment * n;
        totalInterest = totalPayment - principal;
      }

      res.json({
        principal,
        months: n,
        interestRatePercent: interestRate,
        monthlyPayment,
        totalPayment,
        totalInterest,
        type,
      });
    } catch (err: any) {
      res.status(400).json({ error: err?.message || "Invalid calculation request" });
    }
  });

  // Gemini AI Financial Advisor
  app.post("/api/advisor", async (req, res) => {
    const { message, role = "مدرسه", history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "متن پیام الزامی است." });
    }

    const systemInstruction = `شما «مشاور هوشمند مالی پرهام» (پلتفرم جامع فین‌تک مدارس و آموزش) هستید.
وظیفه شما راهنمایی تخصصی، دوستانه، دقیق و کاربردی به زبان فارسی درباره ۴ ستون اصلی پلتفرم پرهام است:
۱. بخش اعتبارات و تسهیلات:
   - وام شهریه برای اولیا (اقساط منعطف، تسویه مستقیم با مدرسه)
   - تسهیلات تجهیز، هوشمندسازی و ودیعه/اجاره برای مدارس
   - وام‌های ضروری و رفاهی معلمان
   - سرویس پرداخت حقوق پیش از موعد (Earned Wage Access / مساعده سریع دبیران با کسر کارمزد منصفانه سر ماه)
۲. پرهام‌پی (خرید اعتباری و BNPL):
   - خرید قسطی کتاب کمک‌آموزشی، آزمون‌های آزمایشی، سرویس ایاب و ذهاب، لباس فرم، لوازم‌التحریر، کلاس خصوصی و اردوهای تفریحی بدون نیاز به ضامن
۳. خدمات بیمه:
   - بیمه تکمیلی گروهی معلمان (بدون نیاز به حدنصاب صدها نفره در مدارس خرد)
   - بیمه حوادث و مسئولیت دانش‌آموزی مدارس
   - بیمه عمر و پس‌انداز آتیه فرزندان
۴. سرمایه‌گذاری و سواد مالی:
   - تبدیل سود رسوب نقدی مدارس به طلا، نقره و صندوق‌های کم‌ریسک جهت حفظ ارزش در برابر تورم
   - «طرح قلک پرهام» برای دانش‌آموزان (پس‌انداز هدفمند خرد در طلا و نقره به همراه آموزش هوش مالی)
   - دوره‌های آموزشی سواد مالی و بودجه‌بندی

نقش فعلی کاربر: "${role}".
پاسخ‌های شما باید دقیق، ساختاریافته با پاراگراف‌بندی مناسب، با اعداد و محاسبات شفاف باشد. لحن حرفه‌ای، انگیزشی و کاملاً منطبق با نیازهای آموزشی و مالی ارائه دهید.`;

    const client = getGeminiClient();
    if (client) {
      try {
        const response = await client.models.generateContent({
          model: "gemini-3.8-flash",
          contents: message,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || "پاسخی از مدل دریافت نشد.";
        return res.json({ reply, source: "gemini-3.8-flash" });
      } catch (geminiError: any) {
        console.error("Gemini API error:", geminiError);
        // Fallback to contextual heuristic response
      }
    }

    // High quality intelligent fallback if API key not available or offline
    let fallbackReply = "";
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("وام") || lowerMsg.includes("شهریه") || lowerMsg.includes("تسهیلات")) {
      fallbackReply = `🔹 **راهنمای تسهیلات و وام شهریه پرهام:**
در سامانه پرهام، اولیا گرامی می‌توانند تا سقف ۵۰ میلیون تومان وام شهریه با کارمزد ۴٪ قرض‌الحسنه و بازپرداخت ۱۰ تا ۲۴ ماهه دریافت نمایند.
- **مزیت برای اولیا:** پرداخت شهریه به صورت اقساط سبک ماهیانه بدون فشار مالی ابتدای سال تحصیلی.
- **مزیت برای مدرسه:** کل مبلغ شهریه یکجا به حساب مدرسه واریز می‌شود و نقدینگی مدرسه تضمین می‌گردد.
- **تسهیلات مدارس:** مدارس نیز برای خرید تجهیزات هوشمند یا بازسازی تا ۵۰۰ میلیون تومان تسهیلات با تنفس ۳ ماهه دریافت می‌کنند.`;
    } else if (lowerMsg.includes("حقوق") || lowerMsg.includes("پیش از موعد") || lowerMsg.includes("مساعده")) {
      fallbackReply = `🔹 **سرویس پرداخت حقوق پیش از موعد دبیران (Earned Wage Access):**
این سرویس به معلمان عزیز امکان می‌دهد تا سقف ۸۰٪ از حقوق کارکرده خود در طول ماه را قبل از موعد مقرر واریز ماهانه برداشت کنند.
- **کارمزد:** تنها ۲.۵٪ کارمزد خدمات بانکی
- **نحوه تسویه:** در پایان ماه، با واریز حقوق از سوی مدرسه یا آموزش‌وپرورش، این مبلغ به صورت خودکار و بدون جریمه کسر می‌گردد.
- **بدون چک و سفته:** صرفاً بر اساس تایید کارکرد ماهانه توسط پنل مدرسه.`;
    } else if (lowerMsg.includes("پرهام پی") || lowerMsg.includes("خرید اعتباری") || lowerMsg.includes("قسطی") || lowerMsg.includes("کتاب")) {
      fallbackReply = `🔹 **سرویس خرید اعتباری پرهام‌پی (BNPL):**
با پرهام‌پی می‌توانید تمامی نیازهای تحصیلی را الان بخرید و در ۳ الی ۶ قسط پرداخت کنید:
۱. کتاب‌های کمک‌آموزشی و کنکور (گاج، خیلی سبز، قلم‌چی)
۲. ثبت‌نام در آزمون‌های آزمایشی کشوری
۳. هزینه سرویس ایاب و ذهاب دانش‌آموزان
۴. لباس فرم مدرسه و لوازم‌التحریر
۵. ثبت‌نام کلاس‌های فوق‌برنامه، خصوصی و اردوهای علمی-تفریحی.
اعتبار اولیه شما پس از اعتبارسنجی آنلاین بلافاصله فعال می‌شود.`;
    } else if (lowerMsg.includes("بیمه") || lowerMsg.includes("تکمیلی")) {
      fallbackReply = `🔹 **خدمات بیمه تجمیعی پرهام:**
معمولاً شرکت‌های بیمه برای ارائه بیمه تکمیلی با پوشش‌های قوی به تعداد بالایی از پرسنل (مثلاً بالای ۵۰ یا ۱۰۰ نفر) نیاز دارند.
- در پرهام، معلمان حتی در مدارس کوچک ۵ یا ۱۰ نفره از طریق **طرح تجمیع فرهنگیان پرهام** به عنوان یک شبکه بزرگ شناخته شده و از بالاترین سقف پوشش دندانپزشکی، جراحی و ویزیت با حق بیمه تخفیف‌دار بهره‌مند می‌شوند.
- همچنین بیمه حوادث و مسئولیت مدنی دانش‌آموزی برای مدارس با تخفیف گروهی صادر می‌شود.`;
    } else if (lowerMsg.includes("سرمایه") || lowerMsg.includes("طلا") || lowerMsg.includes("قلک") || lowerMsg.includes("نقره")) {
      fallbackReply = `🔹 **سرمایه‌گذاری مدارس و طرح قلک پرهام:**
- **برای مدارس:** رسوب نقدی حاصل از شهریه‌ها در بازه‌های مختلف می‌تواند با خرید طلای آب‌شده استاندارد یا صندوق‌های درآمد ثابت (با سود تضمینی ۳۱٪ سالانه)، از گزند تورم در امان بماند و برای توسعه فیزیکی مدرسه سودآوری کند.
- **طرح قلک پرهام برای دانش‌آموزان:** یک ابزار فوق‌العاده برای آموزش سواد مالی؛ دانش‌آموزان با پس‌اندازهای اندک (حتی از ۵۰ هزار تومان) سوت‌های طلا و نقره خریداری کرده و در نمودار گرافیکی، رشد دارایی خود را مشاهده می‌کنند.`;
    } else {
      fallbackReply = `سلام! من مشاور مالی هوشمند پرهام هستم. 
در سامانه پرهام می‌توانید:
۱. برای پرداخت یا دریافت شهریه، تجهیزات و حقوق پیش از موعد معلمان از **بخش تسهیلات** استفاده کنید.
۲. با **پرهام‌پی** کتاب، آزمون، سرویس و لباس فرم را قسطی بخرید.
۳. از **بیمه تکمیلی تجمیعی معلمان** و بیمه حوادث مدارس بهره‌مند شوید.
۴. در **طلا، نقره و قلک پرهام** سرمایه‌گذاری کنید و دوره‌های سواد مالی را بیاموزید.
مایلید در کدام مورد محاسبات دقیق‌تری برای شما انجام دهم؟`;
    }

    return res.json({ reply: fallbackReply, source: "curated-advisor" });
  });

  // Setup Vite middleware for development or static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
