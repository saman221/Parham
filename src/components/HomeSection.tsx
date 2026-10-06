import React from 'react';
import { MainTab, UserRole, UserProfile } from '../types';
import { 
  Coins, 
  Calculator, 
  ShoppingBag, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  School, 
  GraduationCap, 
  Users, 
  User, 
  Layers, 
  Zap, 
  HelpCircle,
  MessageSquareText,
  BadgePercent,
  Lock,
  Headphones
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface HomeSectionProps {
  onNavigateTab: (tab: MainTab) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onOpenChatbot: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigateTab,
  currentUser,
  onOpenAuth,
  onOpenChatbot,
}) => {
  const [selectedRolePreview, setSelectedRolePreview] = React.useState<UserRole>(currentUser.role || 'teacher');

  const services = [
    {
      id: 'loans' as MainTab,
      title: 'وام و تسهیلات آموزشی',
      subtitle: 'تسهیلات کم‌بهره شهریه و مساعده آنی حقوق معلمان',
      tag: 'بدون ضامن بانکی',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: <Coins className="w-7 h-7 text-blue-600" />,
      gradient: 'from-blue-500/10 via-sky-500/5 to-transparent',
      borderColor: 'border-blue-100 hover:border-blue-300',
      features: [
        'وام شهریه مدارس تا سقف ۶۰ میلیون تومان با بازپرداخت ۱۲ ماهه',
        'مساعده آنی حقوق معلمان (Early Wage Access) واریز در کمتر از ۳ دقیقه',
        'تسهیلات هوشمندسازی و خرید تجهیزات آزمایشگاهی ویژه موسسان',
      ],
      actionLabel: 'مشاهده طرح‌های وام و ثبت درخواست',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      id: 'digital_accounting' as MainTab,
      title: 'حسابداری دیجیتال مدرسه',
      subtitle: 'اتوماسیون مالی ابری، صدور فیش حقوقی و مدیریت شهریه',
      tag: 'یکپارچه با آموزش و پرورش',
      tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: <Calculator className="w-7 h-7 text-indigo-600" />,
      gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
      borderColor: 'border-indigo-100 hover:border-indigo-300',
      features: [
        'صدور هوشمند فیش حقوقی معلمان و محاسبه خودکار بیمه و مالیات',
        'درگاه پرداخت اختصاصی شهریه با پیگیری پیامکی اقساط معوقه اولیا',
        'داشبورد تراز مالی، صورت سود و زیان و بودجه‌بندی سالانه مدارس',
      ],
      actionLabel: 'ورود به سامانه حسابداری دیجیتال',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    {
      id: 'parham_pay' as MainTab,
      title: 'پرهام‌پی (خرید اقساطی BNPL)',
      subtitle: 'خرید تجهیزات آموزشی، لپ‌تاپ، تبلت و لوازم بدون چک',
      tag: 'الان بخر بعداً بپرداز',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: <ShoppingBag className="w-7 h-7 text-purple-600" />,
      gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
      borderColor: 'border-purple-100 hover:border-purple-300',
      features: [
        'اعتبار خرید تا سقف ۸۰ میلیون تومان بر اساس رتبه اعتباری معلمان و اولیا',
        'تقسیط ۳، ۶ و ۱۲ ماهه بدون کارمزد اضافی با گارانتی اصالت کالا',
        'تامین مستقیم لپ‌تاپ‌های ایسوس، تبلت سامسونگ و بسته‌های تحصیلی',
      ],
      actionLabel: 'مشاهده کالاهای اقساطی پرهام‌پی',
      buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
    {
      id: 'insurance' as MainTab,
      title: 'بیمه هوشمند مدارس',
      subtitle: 'پوشش‌های تخصصی حوادث دانش‌آموزی، درمان تکمیلی و بازنشستگی',
      tag: 'خسارت آنلاین ۲۴ ساعته',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <ShieldCheck className="w-7 h-7 text-amber-600" />,
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      borderColor: 'border-amber-100 hover:border-amber-300',
      features: [
        'بیمه تکمیلی سلامت معلمان و خانواده با بیشترین سقف دندانپزشکی و بیمارستانی',
        'بیمه مسئولیت مدنی جامع مدیران مدارس و حوادث اردوهای دانش‌آموزی',
        'بیمه عمر و آتیه تحصیلی فرزندان با مستمری تضمین‌شده دانشگاهی',
      ],
      actionLabel: 'استعلام قیمت و صدور بیمه‌نامه',
      buttonBg: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
    {
      id: 'investments' as MainTab,
      title: 'سرمایه‌گذاری و قلک پرهام',
      subtitle: 'حفظ ارزش دارایی با طلای آب‌شده، نقره و پس‌انداز هدفمند',
      tag: 'خرید از ۵۰ هزار تومان',
      tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: <TrendingUp className="w-7 h-7 text-rose-600" />,
      gradient: 'from-rose-500/10 via-red-500/5 to-transparent',
      borderColor: 'border-rose-100 hover:border-rose-300',
      features: [
        'قلک هوشمند پرهام: تعیین هدف (لپ‌تاپ، جهیزیه، مهاجرت) و خرید با تخفیف',
        'سرمایه‌گذاری در طلای ۲۴ عیار گواهی‌شده فیزیکی همراه با پشتوانه بانکی',
        'صندوق خیریه بورسیه تحصیلی دانش‌آموزان مستعد مناطق محروم',
      ],
      actionLabel: 'ورود به بازار سرمایه‌گذاری و قلک',
      buttonBg: 'bg-rose-600 hover:bg-rose-700 text-white',
    },
  ];

  const roleBenefits: Record<UserRole, { title: string; desc: string; icon: React.ReactNode; items: string[] }> = {
    school: {
      title: 'بسته خدمات ویژه موسسان و مدیران مدارس',
      desc: 'مدیریت یکپارچه مالی، ارتقای اعتبار مدرسه، کاهش معوقات و تجهیز فناورانه محیط آموزشی',
      icon: <School className="w-6 h-6 text-blue-600" />,
      items: [
        'وصول ۱۰۰٪ آنلاین شهریه‌ها بدون نیاز به چک دستی و پیگیری حضوری',
        'تسهیلات کلان بانکی برای نوسازی مدرسه و تجهیز آزمایشگاه‌ها و سایت کامپیوتر',
        'صدور خودکار قراردادها و فیش‌های حقوقی مطابق قوانین وزارت کار و آموزش و پرورش',
        'بیمه کامل مسئولیت مدنی آموزشگاه در برابر حوادث دانش‌آموزان و معلمان',
      ],
    },
    teacher: {
      title: 'بسته خدمات ویژه معلمان و کادر آموزشی',
      desc: 'پشتیبانی معیشتی، مساعده فوری حقوق، بیمه درمانی تکمیلی و خرید اقساطی بدون وثیقه',
      icon: <User className="w-6 h-6 text-amber-600" />,
      items: [
        'دریافت مساعده آنی حقوق تا ۷۰٪ روزهای کارکرد در هر ساعت از شبانه‌روز',
        'خرید اقساطی لپ‌تاپ، گوشی، تبلت و لوازم منزل با پرهام‌پی بدون پیش‌پرداخت',
        'بیمه تکمیلی فرهنگیان با پرداخت سریع هزینه‌های درمان و دارویی',
        'تسهیلات کم‌بهره ضروری و پس‌انداز خودکار ماهانه در قلک طلای پرهام',
      ],
    },
    student: {
      title: 'بسته خدمات ویژه دانش‌آموزان و نوجوانان',
      desc: 'سواد مالی، قلک دیجیتال شخصی، خرید وسایل کمک‌آموزشی و پس‌انداز برای اهداف بزرگ',
      icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
      items: [
        'قلک هوشمند پس‌انداز برای خرید لپ‌تاپ گیمینگ، تبلت طراحی یا دوچرخه',
        'تخفیف‌های ویژه دانش‌آموزی در فروشگاه لوازم‌التحریر و کتب آموزشی پرهام',
        'آموزش هوشمند مفاهیم بورس، سرمایه‌گذاری طلا و مدیریت دارایی',
        'پوشش بیمه حوادث ورزشی و تحصیلی در طول سال تحصیلی',
      ],
    },
    parent: {
      title: 'بسته خدمات ویژه اولیا و خانواده‌ها',
      desc: 'تقسیط شهریه مدارس بدون سود بانکی، تامین کالاهای دانش‌آموزی و بیمه آتیه فرزندان',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      items: [
        'پرداخت اقساطی شهریه مدرسه طی ۱۰ الی ۱۲ قسط آسان و بدون معطلی',
        'صندوق پس‌انداز آتیه تحصیلی فرزند برای قبولی در دانشگاه و آزمون‌های بین‌المللی',
        'تسهیلات خرید جهیزیه و سبدهای خانوادگی ضدتورمی',
        'مشاهده شفاف کلیه پرداختی‌ها، گزارش‌های مالی و رسیدهای دیجیتال شهریه',
      ],
    },
  };

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-10 lg:p-16 border border-slate-800 shadow-2xl">
        
        {/* Subtle Ambient Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-emerald-400 text-xs font-bold shadow-inner">
            <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
            <span>نخستین و بزرگ‌ترین پلتفرم جامع فین‌تک آموزشی مدارس ایران</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-snug text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            سامانه یکپارچه خدمات مالی و بانکی مدارس پَرهام
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            پرهام زنجیره هوشمند مالی مدارس، معلمان، دانش‌آموزان و اولیا را به یکدیگر متصل می‌کند: از <strong className="text-white">وام‌های ارزان شهریه و مساعده</strong> تا <strong className="text-white">حسابداری تمام‌ابری</strong>، <strong className="text-white">خرید اقساطی بدون ضامن</strong>، <strong className="text-white">بیمه جامع</strong> و <strong className="text-white">قلک سرمایه‌گذاری طلا</strong>.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            
            <button
              onClick={() => onNavigateTab('overview')}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>ورود به میزکار و داشبورد کاربری</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenChatbot}
              className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-bold text-sm px-5 py-3.5 rounded-2xl border border-slate-700 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <MessageSquareText className="w-4 h-4 text-emerald-400" />
              <span>گفتگو با چت‌بات هوشمند پرهام</span>
            </button>

            {!currentUser.isLoggedIn && (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-emerald-300 font-bold text-sm px-4 py-3.5 rounded-2xl border border-emerald-500/30 transition-all"
              >
                <span>انتخاب نقش و ورود سریع</span>
              </button>
            )}

          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 mt-10">
            <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">{toPersianDigits(540)}+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">مدرسه و مرکز آموزشی فعال</div>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-teal-400">{toPersianDigits(28500)}+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">معلم و پرسنل تحت پوشش</div>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">{toPersianDigits(140)} م.ت</div>
              <div className="text-xs text-slate-400 font-medium mt-1">مجموع تسهیلات اعطاشده</div>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{toPersianDigits('۹۹.۴')}٪</div>
              <div className="text-xs text-slate-400 font-medium mt-1">رضایت‌مندی مدارس و اولیا</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 5 CORE FINTECH SERVICES (معرفی ۵ خدمت اصلی پرهام) */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>خدمات جامع سامانه</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ۵ رکن اساسی خدمات مالی پرهام برای اکوسیستم آموزش
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            تمامی خدمات مالی بدون نیاز به مراجعه حضوری به بانک و بدون بوروکراسی اداری، به‌صورت کاملاً آنلاین در اختیار شماست.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border ${srv.borderColor} shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div>
                
                {/* Header Icon + Tag */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform shadow-xs">
                    {srv.icon}
                  </div>
                  <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${srv.tagColor}`}>
                    {srv.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5">
                  {srv.subtitle}
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-2.5 mb-6 border-t border-slate-100 pt-4">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-tight">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => onNavigateTab(srv.id)}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all shadow-xs ${srv.buttonBg} hover:opacity-95 active:scale-95`}
              >
                <span>{srv.actionLabel}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>

      </section>

      {/* 3. TAILORED BENEFITS PER USER ROLE (مدرسه، معلم، دانش‌آموز، اولیا) */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">سفارشی‌سازی برای شما</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              پرهام برای هر عضو خانواده آموزش چه خدماتی دارد؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              نقش خود را انتخاب کنید تا امکانات ویژه آن را در یک نگاه بررسی نمایید.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
            {(['school', 'teacher', 'student', 'parent'] as UserRole[]).map((r) => {
              const isActive = selectedRolePreview === r;
              const labels: Record<UserRole, string> = {
                school: 'موسس مدرسه',
                teacher: 'معلم و کادر',
                student: 'دانش‌آموز',
                parent: 'اولیا و والدین',
              };
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRolePreview(r)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{labels[r]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 shrink-0">
              {roleBenefits[selectedRolePreview].icon}
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-1">
                {roleBenefits[selectedRolePreview].title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {roleBenefits[selectedRolePreview].desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {roleBenefits[selectedRolePreview].items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{it}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              نقش فعال فعلی شما: <strong className="text-slate-900">{currentUser.name} ({selectedRolePreview === currentUser.role ? 'تطبیق کامل' : 'قابل تغییر'})</strong>
            </span>
            <button
              onClick={onOpenAuth}
              className="text-xs font-black text-emerald-700 hover:text-emerald-800 underline decoration-2 underline-offset-4"
            >
              تغییر یا ورود به این نقش &larr;
            </button>
          </div>
        </div>

      </section>

      {/* 4. SECURITY & AI ADVISOR BANNER */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>دستیار هوشمند ۲۴ ساعته پرهام</span>
          </div>
          <h3 className="text-2xl font-black text-white leading-snug">
            نیاز به مشاوره مالی، راهنمایی دریافت وام یا محاسبه اقساط دارید؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            چت‌بات هوشمند پرهام در تمام ساعات شبانه‌روز آماده است تا مناسب‌ترین طرح‌های وام، اقساط پرهام‌پی و استعلام شرایط را برای شما به‌صورت خودکار توضیح دهد.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>رمزنگاری ۲۵۶ بیتی داده‌های مالی</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-teal-400" />
              <span>پشتیبانی کارشناسان بانکی</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenChatbot}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <MessageSquareText className="w-5 h-5 text-white" />
            <span>شروع گفتگو با چت‌بات هوشمند پرهام</span>
          </button>
        </div>
      </section>

    </div>
  );
};
