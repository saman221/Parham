import React from 'react';
import { MainTab, UserRole } from '../types';
import { formatTomans, toPersianDigits } from '../utils/formatters';
import { 
  Coins, 
  Calculator, 
  ShoppingBag, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Zap, 
  Users, 
  CreditCard,
  Building,
  GraduationCap,
  Heart
} from 'lucide-react';

interface OverviewDashboardProps {
  currentRole: UserRole;
  onNavigateTab: (tab: MainTab) => void;
  walletBalance: number;
  creditLimit: number;
  creditUsed: number;
  onOpenAdvisor: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  currentRole,
  onNavigateTab,
  walletBalance,
  creditLimit,
  creditUsed,
  onOpenAdvisor,
}) => {
  const roleGreetings: Record<UserRole, { title: string; subtitle: string; icon: React.ReactNode }> = {
    school: {
      title: 'پنل مدیریت مالی، حسابداری و خزانه مدرسه',
      subtitle: 'مدیریت جریان نقدینگی، حسابداری دیجیتال حقوق و بیمه، وام نوسازی ۳ ساله، و رسوب درآمد ثابت',
      icon: <Building className="w-5 h-5 text-emerald-400" />
    },
    teacher: {
      title: 'داشبورد رفاهی، حقوق و تسهیلات همکاران',
      subtitle: 'درخواست آنلاین مساعده فوری حقوق، تسهیلات رفاهی کادر، بیمه بازنشستگی ۱۰ ساله و خرید اقساطی',
      icon: <Zap className="w-5 h-5 text-amber-400" />
    },
    parent: {
      title: 'درگاه خدمات مالی اولیا و خانواده‌ها',
      subtitle: 'وام پرداخت شهریه تحصیلی، خرید اقساطی ملزومات از پرهام‌پی و سبدهای هدفمند آتیه فرزندان',
      icon: <Users className="w-5 h-5 text-blue-400" />
    },
    student: {
      title: 'باشگاه هوش مالی و قلک طلای دانش‌آموز',
      subtitle: 'قلک هدفمند پرهام (لپ‌تاپ، جهیزیه، مهاجرت)، آزمون‌های سواد مالی و خرید اقساطی کتب و آزمون‌ها',
      icon: <GraduationCap className="w-5 h-5 text-purple-400" />
    },
  };

  const currentGreeting = roleGreetings[currentRole];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-white/10 rounded-xl">
                {currentGreeting.icon}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {currentGreeting.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentGreeting.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('loans')}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Coins className="w-4 h-4" />
              <span>تسهیلات و وام‌ها</span>
            </button>
            <button
              onClick={() => onNavigateTab('digital_accounting')}
              className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>حسابداری دیجیتال</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Pillars Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-slate-900">ارکان اصلی سامانه پرهام (۵ بخش تخصصی)</h3>
          <span className="text-xs font-bold text-slate-500">پلتفرم جامع فین‌تک آموزشی</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Pillar 1: وام */}
          <div 
            onClick={() => onNavigateTab('loans')}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:border-emerald-400 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  بخش اول
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">وام و تسهیلات</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                وام پرداخت شهریه اولیا، وام ویژه مدارس (۳ ساله) و مساعده فوری معلمان و کادر اداری.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>مشاهده و محاسبه</span>
              <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2: حسابداری دیجیتال */}
          <div 
            onClick={() => onNavigateTab('digital_accounting')}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:border-sky-400 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                  بخش دوم
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">حسابداری دیجیتال</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                خدمات پرداخت حقوق و بیمه تامین اجتماعی، تراز مالی و سیستم هوشمند وصول شهریه.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
              <span>مدیریت مالی مدرسه</span>
              <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3: پرهام پی */}
          <div 
            onClick={() => onNavigateTab('parham_pay')}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:border-indigo-400 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  بخش سوم
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">پرهام پی (خرید قسطی)</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                خرید اقساطی کتاب، آزمون، لباس فرم، کترینگ، چاپ، کلاس خصوصی، تحریر و تجهیزات.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>۷ دسته ملزومات</span>
              <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 4: بیمه */}
          <div 
            onClick={() => onNavigateTab('insurance')}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:border-teal-400 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                  بخش چهارم
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">خدمات بیمه</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                بیمه بازنشستگی پرهام، بیمه تکمیلی، بیمه حوادث دانش‌آموزی و بیمه حوادث مدرسه.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
              <span>صدور آنلاین بیمه</span>
              <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 5: سرمایه‌گذاری */}
          <div 
            onClick={() => onNavigateTab('investments')}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:border-amber-400 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  بخش پنجم
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">سرمایه‌گذاری</h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                صندوق فلزات (طلا-نقره-مس)، صندوق سهام، درآمد ثابت، نیکوکاری و سبدهای هدفمند.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>ورود به بازار دارایی</span>
              <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Wallet & Credit Status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">اعتبار تخصیص‌یافته پرهام‌پی</span>
            <span className="text-xs font-black text-emerald-600">فعال</span>
          </div>

          <div className="text-2xl font-black text-slate-900">{formatTomans(creditLimit)}</div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, Math.round((creditUsed / creditLimit) * 100))}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-500 pt-1">
            <span>مصرف‌شده: {formatTomans(creditUsed)}</span>
            <span>باقیمانده: {formatTomans(creditLimit - creditUsed)}</span>
          </div>
        </div>

        {/* Treasury & Gold Status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">مظنه زنده بازار دارایی‌ها</span>
            <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-md">بروزرسانی زنده</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">طلای ۱۸ عیار آب‌شده:</span>
              <span className="font-extrabold text-slate-900">{formatTomans(4680000)} / گرم</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">نقره شمش و ساچمه ۹۹۹:</span>
              <span className="font-extrabold text-slate-900">{formatTomans(88500)} / گرم</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">کاتد مس بورس کالا:</span>
              <span className="font-extrabold text-slate-900">{formatTomans(585000)} / کیلو</span>
            </div>
            <div className="flex justify-between items-center text-sky-700 font-bold">
              <span>سود صندوق درآمد ثابت:</span>
              <span>۳۱.۵٪ سالیانه روزشمار</span>
            </div>
          </div>
        </div>

        {/* Charity & Social Impact */}
        <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white p-6 rounded-3xl shadow-2xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2.5 py-1 rounded-full mb-3">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
              <span>پویش‌های نیکوکاری مدارس</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">بورسیه دانش‌آموزان و تجهیز مدارس محروم</h4>
            <p className="text-xs text-rose-100/80 leading-relaxed">
              با اختصاص درصدی از سود یا مشارکت اختیاری، بیش از ۵۰۰ دانش‌آموز مستعد را تحت پوشش بورسیه تحصیلی قرار داده‌ایم.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('investments')}
            className="w-full mt-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-colors"
          >
            مشاهده پروژه‌ها و اهدای نیکوکاری
          </button>
        </div>

      </div>

    </div>
  );
};
