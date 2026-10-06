import React from 'react';
import { MainTab, UserRole, UserProfile } from '../types';
import { 
  Home,
  LayoutDashboard, 
  Coins, 
  Calculator, 
  ShoppingBag, 
  ShieldCheck, 
  TrendingUp,
  Sparkles, 
  Bot,
  User,
  LogIn,
  ChevronDown,
  School,
  GraduationCap,
  Users
} from 'lucide-react';

interface NavbarProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  walletBalance: number;
  creditLimit: number;
  onOpenChatbot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  onOpenAuth,
  walletBalance,
  creditLimit,
  onOpenChatbot,
}) => {
  // Navigation Tabs: خانه / وام / حسابداری دیجیتال مدرسه / پرهام‌پی / بیمه / سرمایه‌گذاری
  // (کلمه «بخش» به دستور کاربر حذف شد و بین پرهام و مشاوره هوشمند قرار گرفت)
  const navTabs: { 
    id: MainTab; 
    title: string; 
    shortTitle?: string;
    icon: React.ReactNode; 
  }[] = [
    {
      id: 'home',
      title: 'خانه',
      shortTitle: 'خانه',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'loans',
      title: 'وام',
      shortTitle: 'وام',
      icon: <Coins className="w-4 h-4" />,
    },
    {
      id: 'digital_accounting',
      title: 'حسابداری دیجیتال مدرسه',
      shortTitle: 'حسابداری مدرسه',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'parham_pay',
      title: 'پرهام‌پی',
      shortTitle: 'پرهام‌پی',
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: 'insurance',
      title: 'بیمه',
      shortTitle: 'بیمه',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: 'investments',
      title: 'سرمایه‌گذاری',
      shortTitle: 'سرمایه‌گذاری',
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'school':
        return <School className="w-3.5 h-3.5 text-blue-600" />;
      case 'teacher':
        return <User className="w-3.5 h-3.5 text-amber-600" />;
      case 'student':
        return <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />;
      case 'parent':
        return <Users className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <User className="w-3.5 h-3.5" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'school':
        return 'موسس مدرسه';
      case 'teacher':
        return 'معلم';
      case 'student':
        return 'دانش‌آموز';
      case 'parent':
        return 'اولیا';
      default:
        return 'کاربر';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        
        {/* Main Navbar Top Row */}
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* 1. Brand Logo "پَرهام" (Right side in RTL) */}
          <div 
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer group select-none"
            title="سامانه فین‌تک مدارس پرهام - صفحه اصلی"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/25 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl sm:text-2xl tracking-tighter">پـ</span>
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">پَرهام</h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-emerald-200 hidden md:inline-block">
                  فین‌تک مدارس
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden lg:block">خدمات مالی آموزشی</p>
            </div>
          </div>

          {/* 2. THE CLEAN TABS: قرارگیری تمیز دقیقاً بین پرهام و مشاوره هوشمند (چت‌بات) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/80">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`header-nav-tab-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </nav>

          {/* 3. Left Controls: چت‌بات هوشمند + میزکار (کوچک‌تر) + کاربر (کوچک‌تر) */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* 🤖 چت‌بات هوشمند پرهام (Smart AI Chatbot Button) */}
            <button
              id="open-ai-chatbot-header-btn"
              onClick={onOpenChatbot}
              title="چت‌بات و مشاور هوشمند مالی پرهام"
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-2.5 sm:px-3 py-2 rounded-xl transition-all shadow-2xs hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-extrabold hidden sm:inline">چت‌بات هوشمند</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            {/* 📊 دکمه کوچک و جمع‌وجور: میزکار */}
            <button
              id="header-workspace-compact-btn"
              onClick={() => onTabChange('overview')}
              title="ورود به میزکار و داشبورد شخصی"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
              <span>میزکار</span>
            </button>

            {/* 👤 دکمه جمع‌وجور کاربر: محمد رضایی / ورود و ثبت‌نام */}
            {currentUser.isLoggedIn ? (
              <button
                id="header-user-profile-btn"
                onClick={onOpenAuth}
                title="مشاهده پروفایل و تغییر نقش"
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-800 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-102"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {getRoleIcon(currentUser.role)}
                </div>
                <div className="text-right hidden xl:block">
                  <span className="block font-black text-slate-900 text-[11px] leading-tight max-w-[80px] truncate">{currentUser.name}</span>
                  <span className="text-[9px] font-semibold text-emerald-700">{getRoleLabel(currentUser.role)}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            ) : (
              <button
                id="header-login-register-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black px-3 py-2 rounded-xl shadow-xs transition-all hover:scale-102 active:scale-98"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-200" />
                <span className="hidden sm:inline">ورود / ثبت‌نام</span>
                <span className="sm:hidden">ورود</span>
              </button>
            )}

          </div>

        </div>

        {/* Mobile & Tablet: The Single Clean Horizontal Scrollable Navigation */}
        <div className="flex lg:hidden overflow-x-auto pb-3 pt-1 gap-1.5 no-scrollbar border-t border-slate-100">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center whitespace-nowrap gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                  {tab.icon}
                </span>
                <span>{tab.shortTitle || tab.title}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
