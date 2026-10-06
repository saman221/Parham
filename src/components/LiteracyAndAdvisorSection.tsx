import React, { useState } from 'react';
import { FINANCIAL_COURSES, MOCK_ADVISORY_PLANS } from '../data/mockData';
import { FinancialCourse, AdvisorySubscription, UserRole } from '../types';
import { formatTomans, toPersianDigits } from '../utils/formatters';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Calendar, 
  PhoneCall, 
  Award,
  ChevronRight,
  MessageSquareQuote,
  Loader2,
  Check,
  Headphones,
  Compass,
  Star,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface LiteracyAndAdvisorSectionProps {
  currentRole: UserRole;
  userRoleLabel: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const LiteracyAndAdvisorSection: React.FC<LiteracyAndAdvisorSectionProps> = ({
  currentRole,
  userRoleLabel,
}) => {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `سلام و درود! من مشاور هوشمند مالی سامانه «پرهام» هستم. 
می‌توانم در زمینه دریافت وام شهریه اولیا، تسهیلات تجهیز مدرسه، حقوق پیش از موعد دبیران، خرید اعتباری پرهام‌پی، بیمه تکمیلی تجمیعی معلمان و سرمایه‌گذاری در طلا و قلک پرهام به شما مشاوره دهم. چه کمکی از من برمی‌آید؟`,
      timestamp: 'هم‌اکنون'
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Active course & quiz state
  const [selectedCourse, setSelectedCourse] = useState<FinancialCourse>(FINANCIAL_COURSES[0]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Advisory Plans subscription state
  const [selectedPlanForSub, setSelectedPlanForSub] = useState<AdvisorySubscription | null>(null);
  const [activeSubscriptionId, setActiveSubscriptionId] = useState<string | null>(null);
  const [subSuccessMessage, setSubSuccessMessage] = useState<string | null>(null);

  // Booking consultation state
  const [consultationBooked, setConsultationBooked] = useState<boolean>(false);
  const [consultationPhone, setConsultationPhone] = useState<string>('');
  const [consultationTopic, setConsultationTopic] = useState<string>('مدیریت نقدینگی و بودجه مدرسه');

  const presetQuestions = [
    'چگونه برای تامین شهریه وام ۴٪ دریافت کنیم؟',
    'شرایط پرداخت حقوق پیش از موعد دبیران چگونه است؟',
    'چطور مدرسه کوچک ۵ نفره ما بیمه تکمیلی گروهی بگیرد؟',
    'چگونه با قلک پرهام ارزش پول فرزندم را در برابر تورم حفظ کنم؟',
    'نحوه استفاده از پرهام‌پی برای خرید قسطی کتاب و آزمون'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isAiLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          role: userRoleLabel,
        })
      });

      const data = await response.json();
      const assistantReply: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'متاسفانه در حال حاضر پاسخی دریافت نشد. لطفاً مجدداً امتحان کنید.',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantReply]);
    } catch (err) {
      const fallbackReply: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: 'در حال حاضر ارتباط با شبکه دچار اختلال است. کارشناسان پشتیبانی پرهام آماده پاسخگویی هستند.',
        timestamp: 'خطا'
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleActivatePlan = (plan: AdvisorySubscription) => {
    setActiveSubscriptionId(plan.id);
    setSubSuccessMessage(`اشتراک «${plan.title}» به مدت ${toPersianDigits(plan.durationMonths)} ماه با موفقیت برای حساب شما فعال شد. کارشناس ارشد اختصاصی تا دقایقی دیگر از طریق پنل با شما ارتباط خواهد گرفت.`);
    setSelectedPlanForSub(null);
    setTimeout(() => {
      setSubSuccessMessage(null);
    }, 6000);
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationBooked(true);
    setTimeout(() => {
      setConsultationBooked(false);
      setConsultationPhone('');
    }, 4000);
  };

  return (
    <div className="space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-purple-800 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>مشاوره مالی هوشمند و آکادمی سواد مالی پرهام</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            تصمیم‌گیری‌های مالی آگاهانه با هوش مصنوعی و آموزش‌های کاربردی
          </h2>
          <p className="text-purple-100/90 text-xs sm:text-base leading-relaxed">
            مستشار مالی هوش مصنوعی پرهام به طور ۲۴ ساعته پاسخگوی سوالات مالی، محاسبات حقوق پیش از موعد، ارزیابی طرح‌های بیمه و بهینه‌سازی بودجه مدارس است. همچنین دوره‌های کوتاه سواد مالی برای دانش‌آموزان، معلمان و مدیران در دسترس است.
          </p>
        </div>
      </div>

      {/* SECTION 1: مشاور هوشمند پرهام (Interactive AI Advisor) */}
      <div id="ai-advisor-section" className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">مشاور هوشمند مالی پرهام (مبتنی بر هوش مصنوعی)</h3>
              <p className="text-xs text-slate-500">پاسخگویی در لحظه بر اساس نقش شما: <span className="font-bold text-purple-700">{userRoleLabel}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>مدل تحلیلی هوشمند آنلاین</span>
          </div>
        </div>

        {/* Chat History Box */}
        <div className="p-6 max-h-[480px] overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 text-xs shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-purple-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-2xs whitespace-pre-line'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`block text-[10px] mt-2 ${isUser ? 'text-purple-200 text-left' : 'text-slate-400 text-right'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isAiLoading && (
            <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-50 p-3 rounded-2xl max-w-sm">
              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
              <span>مشاور پرهام در حال نگارش تحلیل مالی شماست...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-4 bg-white border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 block mb-2">پرسش‌های پرتکرار پیشنهادی:</span>
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-xs bg-slate-100 hover:bg-purple-50 hover:text-purple-800 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition-all text-right"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="سوال مالی خود را بنویسید (مثلاً: نحوه دریافت وام شهریه یا مساعده حقوق)..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:border-purple-500 focus:bg-white transition-all"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isAiLoading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
          >
            <span>ارسال</span>
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>

      {/* SECTION 2: دوره‌های تعاملی سواد مالی (Financial Literacy Academy) */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-black text-slate-900">دوره‌های آموزشی سواد مالی و هوش اقتصادی</h3>
          <p className="text-xs text-slate-500">مجموعه آموزش‌های کاربردی برای مدیران، معلمان، اولیا و دانش‌آموزان</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Courses Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {FINANCIAL_COURSES.map((course) => {
              const isSelected = selectedCourse.id === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course);
                    setQuizAnswer(null);
                    setQuizSubmitted(false);
                  }}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-50/70 border-purple-300 shadow-xs'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {course.targetAudience}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{course.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
                </div>
              );
            })}
          </div>

          {/* Course Details & Interactive Quiz Viewer */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h4 className="text-lg font-black text-slate-900">{selectedCourse.title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {selectedCourse.description}
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
                <span className="text-xs font-bold text-slate-800 block mb-2">سرفصل‌ها و آموخته‌های کلیدی:</span>
                <ul className="space-y-2">
                  {selectedCourse.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Knowledge Check Quiz */}
            <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-200/80">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-purple-700" />
                <span className="text-xs font-bold text-purple-900">آزمون سنجش آموخته‌های این بخش:</span>
              </div>

              <p className="text-xs font-semibold text-slate-800 mb-4 leading-relaxed">
                {selectedCourse.quizQuestion.question}
              </p>

              <div className="space-y-2 mb-4">
                {selectedCourse.quizQuestion.options.map((opt, idx) => {
                  const isChosen = quizAnswer === idx;
                  const isCorrect = idx === selectedCourse.quizQuestion.correctIndex;

                  let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-purple-300';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isChosen) {
                      btnStyle = 'border-red-500 bg-red-50 text-red-900';
                    }
                  } else if (isChosen) {
                    btnStyle = 'border-purple-600 bg-purple-100 text-purple-900 font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => !quizSubmitted && setQuizAnswer(idx)}
                      className={`w-full p-3 rounded-xl border text-right text-xs transition-all ${btnStyle}`}
                    >
                      <span className="inline-block w-5 h-5 rounded-full border border-slate-300 text-center leading-4 text-[10px] ml-2">
                        {toPersianDigits(idx + 1)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {quizSubmitted ? (
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    {quizAnswer === selectedCourse.quizQuestion.correctIndex ? (
                      <span className="text-emerald-700">آفرین! پاسخ شما کاملاً درست است.</span>
                    ) : (
                      <span className="text-red-700">پاسخ صحیح گزینه {toPersianDigits(selectedCourse.quizQuestion.correctIndex + 1)} بود.</span>
                    )}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {selectedCourse.quizQuestion.explanation}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={quizAnswer === null}
                  onClick={() => setQuizSubmitted(true)}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  ثبت پاسخ و بررسی نتیجه
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 3: بسته‌های اشتراک مشاوره تخصصی مالی و فین‌تک */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-black text-slate-900">بسته‌های اشتراک منتورینگ و مشاوره اختصاصی مالی</h3>
            </div>
            <p className="text-xs text-slate-500">همراهی گام به گام کارشناسان ارشد مالی، اعتبارات و بیمه متناسب با نقش شما در پلتفرم</p>
          </div>

          <div className="flex items-center gap-1.5 bg-purple-50 text-purple-900 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-200 self-start sm:self-auto">
            <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
            <span>پشتیبانی VIP و پاسخگویی اختصاصی</span>
          </div>
        </div>

        {subSuccessMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{subSuccessMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_ADVISORY_PLANS.map((plan) => {
            const isTargetedForUser = plan.targetRole === currentRole;
            const isSubscribed = activeSubscriptionId === plan.id;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between relative ${
                  isTargetedForUser
                    ? 'border-purple-400 ring-2 ring-purple-100 shadow-md'
                    : 'border-slate-200 hover:border-purple-300 shadow-xs'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-3 pt-1">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {plan.targetRole === 'school'
                        ? 'ویژه مدارس'
                        : plan.targetRole === 'teacher'
                        ? 'ویژه معلمان و کادر آموزشی'
                        : 'ویژه اولیا و خانواده'}
                    </span>
                    <span className="text-xs text-slate-400">
                      دوره {toPersianDigits(plan.durationMonths)} ماهه
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 mb-2 leading-snug">{plan.title}</h4>

                  {/* Pricing info */}
                  <div className="my-4 p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs text-slate-500">معادل ماهانه:</span>
                      <span className="text-lg font-black text-purple-950">{formatTomans(plan.monthlyEquivalent)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 pt-1.5 border-t border-purple-200/50">
                      <span>هزینه کل اشتراک ({toPersianDigits(plan.durationMonths)} ماه):</span>
                      <span className="font-bold text-slate-700">{formatTomans(plan.price)}</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold text-slate-800 block">خدمات و دسترسی‌های این طرح:</span>
                    <ul className="space-y-2">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  {isSubscribed ? (
                    <div className="w-full py-2.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>اشتراک فعال است</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedPlanForSub(plan)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                        isTargetedForUser
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>فعال‌سازی این اشتراک مشاوره</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Advisory Plan Activation */}
      {selectedPlanForSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-purple-600 font-bold block mb-1">تایید فعال‌سازی بسته مشاوره</span>
                <h3 className="text-base font-bold text-slate-900">{selectedPlanForSub.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPlanForSub(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>مدت زمان دوره:</span>
                  <span className="font-bold text-slate-900">{toPersianDigits(selectedPlanForSub.durationMonths)} ماه تمام</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>هزینه معادل ماهانه:</span>
                  <span className="font-bold text-slate-900">{formatTomans(selectedPlanForSub.monthlyEquivalent)}</span>
                </div>
                <div className="flex justify-between text-purple-950 font-bold pt-2 border-t border-purple-200">
                  <span>مجموع قابل پرداخت:</span>
                  <span className="text-sm font-black text-purple-900">{formatTomans(selectedPlanForSub.price)}</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                با فعال‌سازی این اشتراک، منتور ارشد بانکی و سرمایه‌گذاری پرهام به حساب کاربری شما متصل شده و نوبت‌های جلسات ماهانه و دسترسی هفتگی پیام‌رسان برای شما فعال می‌گردد.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlanForSub(null)}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={() => handleActivatePlan(selectedPlanForSub)}
                  className="flex-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>تایید و پرداخت اشتراک</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: رزرو جلسه مشاوره تخصصی حضوری یا آنلاین */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
            همراهی کارشناسان بانکی و فین‌تک پرهام
          </span>
          <h3 className="text-xl font-bold text-white">
            درخواست مشاوره اختصاصی برای مدرسه یا خانواده شما
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            اگر مدیر مدرسه هستید و نیاز به تنظیم قرارداد تجهیز، وام ودیعه رهن یا طرح جامع بیمه تجمیعی معلمان دارید، یا به عنوان ولی دانش‌آموز مایل به برنامه‌ریزی شهریه هستید، شماره تماس خود را ثبت کنید تا مشاوران ما با شما تماس بگیرند.
          </p>

          {consultationBooked ? (
            <div className="p-4 bg-emerald-900/40 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>درخواست شما ثبت شد. کارشناس ارشد مالی پرهام حداکثر ظرف ۲ ساعت کاری با شما تماس خواهد گرفت.</span>
            </div>
          ) : (
            <form onSubmit={handleBookConsultation} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="tel"
                required
                value={consultationPhone}
                onChange={(e) => setConsultationPhone(e.target.value)}
                placeholder="شماره موبایل (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)"
                className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-purple-400"
              />
              <select
                value={consultationTopic}
                onChange={(e) => setConsultationTopic(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white focus:outline-hidden focus:border-purple-400"
              >
                <option value="مدیریت نقدینگی و بودجه مدرسه">مدیریت نقدینگی و بودجه مدرسه</option>
                <option value="تسهیلات تجهیز و رهن ساختمان">تسهیلات تجهیز و رهن ساختمان</option>
                <option value="بیمه تکمیلی گروهی معلمان">بیمه تکمیلی گروهی معلمان</option>
                <option value="برنامه‌ریزی وام شهریه اولیا">برنامه‌ریزی وام شهریه اولیا</option>
                <option value="طرح قلک و سرمایه‌گذاری طلا">طرح قلک و سرمایه‌گذاری طلا</option>
              </select>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>ثبت نوبت مشاوره</span>
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};
