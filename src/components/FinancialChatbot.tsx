import React, { useState, useRef, useEffect } from 'react';
import { MainTab, UserRole, UserProfile } from '../types';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Coins, 
  Calculator, 
  ShoppingBag, 
  ShieldCheck, 
  TrendingUp, 
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface FinancialChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onNavigateTab: (tab: MainTab) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionTab?: MainTab;
  actionLabel?: string;
  suggestions?: string[];
}

export const FinancialChatbot: React.FC<FinancialChatbotProps> = ({
  isOpen,
  onClose,
  currentUser,
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: `سلام ${currentUser.name} عزیز! من «دستیار هوشمند و چت‌بات پرهام» هستم. می‌توانید درباره دریافت انواع وام، مساعده فوری حقوق، خرید اقساطی پرهام‌پی، اتوماسیون حسابداری مدارس، بیمه‌ها و قلک سرمایه‌گذاری طلا هر سوالی دارید بپرسید.`,
      timestamp: 'هم‌اکنون',
      suggestions: [
        'چگونه وام شهریه یا مساعده معلمان بگیرم؟',
        'خرید اقساطی لپ‌تاپ و تبلت با پرهام‌پی چطور است؟',
        'حسابداری مدرسه و صدور فیش حقوقی چگونه کار می‌کند؟',
        'قلک پرهام و سرمایه‌گذاری طلا چه سودی دارد؟',
        'شرایط بیمه تکمیلی و درمان فرهنگیان چیست؟',
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart AI response matching domain intents
    setTimeout(() => {
      let botResponse: ChatMessage;

      const lower = query.toLowerCase();

      if (lower.includes('وام') || lower.includes('مساعده') || lower.includes('قرض') || lower.includes('شهریه')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `در سامانه پرهام، دو طرح اصلی تسهیلات فعال است:\n\n۱. **وام شهریه مدارس:** تا سقف ۶۰ میلیون تومان با بازپرداخت ۱۲ ماهه و کارمزد ۴٪ بدون نیاز به ضامن بانکی برای اولیا.\n۲. **مساعده زودهنگام حقوق معلمان (EWA):** واریز تا ۷۰٪ حقوق ماهانه کارکرد در کمتر از ۳ دقیقه به حساب فرهنگیان محترم.\n\nمی‌توانید همین حالا فرم درخواست را پر کنید.`,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          actionTab: 'loans',
          actionLabel: 'مشاهده و ثبت نام وام و مساعده',
          suggestions: ['مدارک لازم برای وام چیست؟', 'پرهام‌پی چطور کار می‌کند؟'],
        };
      } else if (lower.includes('پرهام‌پی') || lower.includes('قسط') || lower.includes('لپ‌تاپ') || lower.includes('خرید') || lower.includes('تبلت')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `سرویس **پرهام‌پی (BNPL)** به شما امکان می‌دهد کالاهای موردنیاز (لپ‌تاپ، تبلت، مایحتاج مدرسه و لوازم خانگی) را بدون پیش‌پرداخت و بدون چک دریافت کنید!\n\n• اعتبار اولیه: تا سقف ۸۰ میلیون تومان\n• بازپرداخت: ۳، ۶ یا ۱۲ ماهه\n• بدون وثیقه بانکی و با ضمانت کسر از حقوق/شهریه`,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          actionTab: 'parham_pay',
          actionLabel: 'ورود به فروشگاه اقساطی پرهام‌پی',
          suggestions: ['محاسبه اقساط لپ‌تاپ ایسوس', 'قلک پرهام چیست؟'],
        };
      } else if (lower.includes('حسابداری') || lower.includes('فیش') || lower.includes('مدرسه') || lower.includes('حقوق')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `بخش **حسابداری دیجیتال مدرسه** مخصوص مدیران، موسسان و حسابداران است و امکانات زیر را ارائه می‌دهد:\n\n• محاسبه و صدور آنلاین فیش حقوقی معلمان همراه با محاسبه کسورات بیمه و مالیات\n• سامانه وصول خودکار شهریه دانش‌آموزان با درگاه اینترنتی و پیامک یادآوری هوشمند\n• گزارش جامع تراز مالی و ثبت اسناد دریافت و پرداخت با استاندارد رسمی`,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          actionTab: 'digital_accounting',
          actionLabel: 'مشاهده پنل حسابداری دیجیتال',
          suggestions: ['چگونه شهریه را قسط‌بندی کنم؟', 'وام معلمان چیست؟'],
        };
      } else if (lower.includes('طلا') || lower.includes('قلک') || lower.includes('سرمایه') || lower.includes('پس‌انداز') || lower.includes('جهیزیه')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `در بخش **سرمایه‌گذاری و قلک پرهام**:\n\n• **قلک هوشمند پرهام:** می‌توانید برای هدف خاص (خرید لپ‌تاپ، جهیزیه، مهاجرت تحصیلی) پس‌انداز کنید و هنگام خرید از تخفیف‌های مستقیم فروشگاهی پرهام بهره‌مند شوید!\n• **خرید طلای آب‌شده ضدتورم:** از مبالغ خرد (شروع از ۵۰ هزار تومان) با شمش‌های فیزیکی ۲۴ عیار و پشتوانه رسمی بانکی بدون اجرت ساخت.`,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          actionTab: 'investments',
          actionLabel: 'ورود به قلک پرهام و بازار طلا',
          suggestions: ['خرید مستقیم کالا با قلک چطور است؟', 'بیمه پرهام چیست؟'],
        };
      } else if (lower.includes('بیمه') || lower.includes('درمان') || lower.includes('حوادث') || lower.includes('تکمیلی')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `خدمات **بیمه هوشمند پرهام** شامل موارد زیر است:\n\n• بیمه درمان تکمیلی معلمان و فرهنگیان (پوشش کامل دندانپزشکی، بیمارستانی و ویزیت)\n• بیمه حوادث دانش‌آموزی و مسئولیت مدنی مدیران مدارس در طول ساعات آموزشی و اردوها\n• بیمه عمر و سرمایه‌گذاری آتیه فرزندان با پوشش پرداخت مستمری دانشگاهی`,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          actionTab: 'insurance',
          actionLabel: 'مشاهده طرح‌های بیمه پرهام',
          suggestions: ['استعلام هزینه بیمه تکمیلی', 'ثبت درخواست وام'],
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `سوال شما را دریافت کردم. سامانه پرهام دارای ۵ بخش اصلی است: ۱. وام و مساعده، ۲. حسابداری دیجیتال مدرسه، ۳. پرهام‌پی (خرید اقساطی)، ۴. بیمه هوشمند و ۵. سرمایه‌گذاری و قلک پرهام. تمایل دارید درباره کدام بخش اطلاعات بیشتری در اختیارتان بگذارم؟`,
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
          suggestions: [
            'وام و مساعده فوری حقوق',
            'پرهام‌پی و خرید اقساطی',
            'قلک پرهام و سرمایه‌گذاری طلا',
            'حسابداری دیجیتال مدارس',
          ],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 650);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'bot',
        text: `سلام مجدد! گفتگوی جدید آغاز شد. من چت‌بات پرهام هستم؛ درباره کدام خدمات مالی آموزشی راهنمایی می‌خواهید؟`,
        timestamp: 'هم‌اکنون',
        suggestions: [
          'وام شهریه مدارس و مساعده حقوق',
          'خرید اقساطی با پرهام‌پی',
          'حسابداری مدرسه و فیش حقوقی',
          'قلک پرهام و سرمایه‌گذاری طلا',
        ],
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      
      {/* Chat Container Card */}
      <div className="bg-white w-full sm:max-w-md h-[92vh] sm:h-[680px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm text-white">چت‌بات هوشمند پرهام</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-300">مشاور هوش مصنوعی مالی مدارس</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              title="شروع مجدد گفتگو"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-end gap-2 max-w-[85%]">
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 shadow-xs mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-bl-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-br-none shadow-2xs whitespace-pre-line'
                  }`}
                >
                  {msg.text}

                  {/* Optional CTA Link Button in Bot Message */}
                  {msg.actionTab && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <button
                        onClick={() => {
                          if (msg.actionTab) {
                            onNavigateTab(msg.actionTab);
                            onClose();
                          }
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-all"
                      >
                        <span>{msg.actionLabel || 'مشاهده بخش'}</span>
                        <ArrowLeft className="w-3 h-3 text-emerald-400" />
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xs shrink-0 mb-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-400 px-9">
                {msg.timestamp}
              </span>

              {/* Suggestions chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 pr-9 max-w-full">
                  {msg.suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sug)}
                      className="text-[11px] font-medium bg-white hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors shadow-2xs text-right"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Sparkles className="w-3 h-3 animate-spin" />
              </div>
              <span className="animate-pulse">چت‌بات پرهام در حال نوشتن پاسخ...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="سوال خود را درباره وام، پرهام‌پی، بیمه و... بپرسید..."
              className="flex-1 bg-slate-100 focus:bg-white text-xs text-slate-800 rounded-xl px-3.5 py-3 outline-hidden border border-transparent focus:border-emerald-500 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
          <div className="text-center mt-1.5">
            <span className="text-[10px] text-slate-400">پاسخ‌گویی خودکار توسط هوش مالی پرهام</span>
          </div>
        </div>

      </div>

    </div>
  );
};
