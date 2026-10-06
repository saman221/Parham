import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { 
  School, 
  User, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  KeyRound,
  Building,
  UserCheck
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role || 'teacher');
  const [phone, setPhone] = useState<string>(currentUser.phone || '09123456789');
  const [name, setName] = useState<string>(currentUser.name || '');
  const [schoolName, setSchoolName] = useState<string>(currentUser.schoolName || 'مجتمع آموزشی هوشمند علامه');
  const [nationalCode, setNationalCode] = useState<string>(currentUser.nationalCode || '0012345678');
  const [otpCode, setOtpCode] = useState<string>('58214');
  const [step, setStep] = useState<'role' | 'details' | 'otp'>('role');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const roleConfigs: {
    id: UserRole;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    badge: string;
    benefits: string[];
    defaultName: string;
  }[] = [
    {
      id: 'teacher',
      title: 'معلم و کادر آموزشی',
      subtitle: 'دبیران، آموزگاران، معاونین و پرسنل آموزشی مدارس',
      icon: <User className="w-6 h-6 text-amber-600" />,
      color: 'border-amber-400 bg-amber-50/50 hover:bg-amber-50',
      badge: 'مساعده فوری و رفاهیات',
      benefits: ['دریافت حقوق پیش از موعد (مساعده فوری پایا)', 'بیمه تکمیلی گروهی بدون سقف و بدون حدنصاب', 'خرید اقساطی لپ‌تاپ و تجهیزات با پرهام‌پی'],
      defaultName: 'محمد رضایی (دبیر فیزیک)'
    },
    {
      id: 'student',
      title: 'دانش‌آموز',
      subtitle: 'دانش‌آموزان کلیه پایه‌های تحصیلی و هنرجویان',
      icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
      color: 'border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50',
      badge: 'قلک طلا و سواد مالی',
      benefits: ['قلک طلای پرهام جهت هدف‌گذاری (لپ‌تاپ، جهیزیه، مهاجرت)', 'خرید مستقیم کالا با ۱۰ الی ۱۵ درصد تخفیف ویژه', 'آکادمی هوش مالی، بازی‌های مالی و ارتقای سواد اقتصادی'],
      defaultName: 'امیرحسین پارسا (دانش‌آموز)'
    },
    {
      id: 'school',
      title: 'موسس و مدیر مدرسه',
      subtitle: 'موسسین، مدیران اجرایی، معاونین مالی و هیئت امنای مدارس',
      icon: <School className="w-6 h-6 text-blue-600" />,
      color: 'border-blue-400 bg-blue-50/50 hover:bg-blue-50',
      badge: 'تسهیلات و خزانه هوشمند',
      benefits: ['وام ویژه مدارس تا ۲ میلیارد تومان (۳ ساله) جهت تجهیز و رهن', 'تسویه آنی شهریه اولیا با خط اعتباری و رفع کسری نقدینگی', 'سامانه خودکار حقوق و دستمزد، بیمه تامین اجتماعی و مالیات'],
      defaultName: 'دکتر علوی (موسس مجتمع آموزشی)'
    },
    {
      id: 'parent',
      title: 'اولیا و خانواده',
      subtitle: 'پدران، مادران و سرپرستان قانونی دانش‌آموزان',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      color: 'border-purple-400 bg-purple-50/50 hover:bg-purple-50',
      badge: 'وام شهریه و خرید اقساطی',
      benefits: ['وام بدون ضامن پرداخت شهریه تحصیلی به مدرسه', 'خرید اقساطی ملزومات مدرسه، پوشاک و لوازم‌التحریر', 'سرمایه‌گذاری طلای آتیه فرزند و بیمه عمر و مستمری'],
      defaultName: 'مهندس احمد پارسا (ولی دانش‌آموز)'
    }
  ];

  const handleSelectRoleAndProceed = (roleId: UserRole) => {
    setSelectedRole(roleId);
    const target = roleConfigs.find(r => r.id === roleId);
    if (target && !name) {
      setName(target.defaultName);
    }
    setStep('details');
  };

  const handleQuickLoginAs = (roleId: UserRole) => {
    const target = roleConfigs.find(r => r.id === roleId);
    const profile: UserProfile = {
      isLoggedIn: true,
      role: roleId,
      name: target ? target.defaultName : 'کاربر گرامی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      schoolName: roleId === 'parent' ? 'فرزند در مجتمع علامه' : 'مجتمع آموزشی هوشمند علامه',
      nationalCode: '۰۰۱۲۳۴۵۶۷۸'
    };
    onLoginSuccess(profile);
    onClose();
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const target = roleConfigs.find(r => r.id === selectedRole);
      const userProfile: UserProfile = {
        isLoggedIn: true,
        name: name.trim() || (target ? target.defaultName : 'کاربر پرهام'),
        phone: phone.trim() || '۰۹۱۲۳۴۵۶۷۸۹',
        role: selectedRole,
        schoolName: schoolName.trim(),
        nationalCode: nationalCode.trim()
      };
      setTimeout(() => {
        onLoginSuccess(userProfile);
        setSuccess(false);
        onClose();
      }, 1000);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-sm">
              پـ
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {currentUser.isLoggedIn ? 'مدیریت حساب و تغییر نقش کاربری' : 'ورود / ثبت‌نام در سامانه پرهام'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                فین‌تک جامع هوشمند مدارس و جامعه آموزشی کشور
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Currently Logged In Banner if already logged in */}
        {currentUser.isLoggedIn && (
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <UserCheck className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[11px] text-slate-500 block">شما هم‌اکنون وارد شده‌اید با نام:</span>
                <span className="text-xs font-black text-slate-900">{currentUser.name} ({
                  currentUser.role === 'teacher' ? 'معلم' :
                  currentUser.role === 'student' ? 'دانش‌آموز' :
                  currentUser.role === 'school' ? 'موسس/مدیر مدرسه' : 'اولیا'
                })</span>
              </div>
            </div>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors"
            >
              خروج از حساب
            </button>
          </div>
        )}

        {/* STEP 1: نقش شما چیست؟ */}
        {step === 'role' && (
          <div className="space-y-4">
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
              <span className="text-xs font-black text-amber-900 block mb-1">
                ❓ لطفاً جایگاه خود را در جامعه آموزشی مشخص کنید:
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                آیا <strong>معلم</strong> هستید، <strong>دانش‌آموز</strong> هستید، <strong>موسس مدرسه</strong> هستید و یا <strong>اولیا</strong>؟ با انتخاب نقش، کل امکانات و خدمات متناسب با شما پیکربندی خواهد شد.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roleConfigs.map((role) => (
                <div
                  key={role.id}
                  onClick={() => handleSelectRoleAndProceed(role.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group hover:scale-[1.01] ${
                    selectedRole === role.id 
                      ? 'border-emerald-600 bg-emerald-50/40 shadow-xs' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2.5 rounded-xl bg-white shadow-2xs border border-slate-100">
                        {role.icon}
                      </div>
                      <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {role.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {role.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {role.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                    <span>انتخاب و ادامه</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Demo Switcher */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-2 text-center">
                یا ورود مستقیم تستی با یک کلیک:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {roleConfigs.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleQuickLoginAs(r.id)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 transition-colors text-center"
                  >
                    ورود به عنوان {r.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: اطلاعات شماره همراه و مشخصات */}
        {step === 'details' && (
          <form onSubmit={handleSubmitDetails} className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600">نقش انتخابی:</span>
                <span className="font-extrabold text-emerald-700">
                  {roleConfigs.find(r => r.id === selectedRole)?.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep('role')}
                className="text-xs text-amber-700 hover:underline font-bold"
              >
                تغییر نقش
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">شماره تلفن همراه:</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500 pl-10 text-left"
                  dir="ltr"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">کد تایید پیامکی به این شماره ارسال خواهد شد.</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">نام و نام خانوادگی:</label>
              <input
                type="text"
                required
                placeholder="مثال: محمد رضایی"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            {selectedRole === 'school' ? (
              <div>
                <label className="block font-bold text-slate-700 mb-1">نام مدرسه یا شناسه واحد آموزشی:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مجتمع آموزشی هوشمند علامه"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            ) : (
              <div>
                <label className="block font-bold text-slate-700 mb-1">کد ملی ۱۰ رقمی (اختیاری جهت تخصیص خط اعتباری):</label>
                <input
                  type="text"
                  placeholder="۰۰۱۲۳۴۵۶۷۸"
                  value={nationalCode}
                  onChange={(e) => setNationalCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500 text-left"
                  dir="ltr"
                />
              </div>
            )}

            <div className="flex gap-2 pt-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black transition-colors shadow-sm"
              >
                ارسال کد تایید پیامکی
              </button>
              <button
                type="button"
                onClick={() => setStep('role')}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
              >
                بازگشت
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: تایید کد OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div className="text-center space-y-1.5 py-2">
              <KeyRound className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">کد تایید ۵ رقمی را وارد کنید</h4>
              <p className="text-slate-500 text-[11px]">
                کد یکبار مصرف به شماره <strong className="text-slate-800" dir="ltr">{phone}</strong> ارسال گردید.
              </p>
            </div>

            <div>
              <input
                type="text"
                required
                maxLength={5}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full bg-slate-50 border-2 border-emerald-400 rounded-xl py-3 text-center text-xl font-black tracking-widest text-slate-900 focus:outline-hidden focus:border-emerald-600"
                dir="ltr"
              />
              <span className="text-[10px] text-emerald-700 mt-1 block text-center font-bold">
                (کد تستی سامانه: ۵۸۲۱۴)
              </span>
            </div>

            {success ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-emerald-800 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>با موفقیت وارد شدید! در حال انتقال به پنل...</span>
              </div>
            ) : (
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {loading ? 'در حال تایید...' : 'تایید و ورود به پرهام'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                >
                  ویرایش شماره
                </button>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  );
};
