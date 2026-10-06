import React, { useState } from 'react';
import { MainTab, UserRole, ParhamPayProduct, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { HomeSection } from './components/HomeSection';
import { FinancialChatbot } from './components/FinancialChatbot';
import { OverviewDashboard } from './components/OverviewDashboard';
import { LoansSection } from './components/LoansSection';
import { DigitalAccountingSection } from './components/DigitalAccountingSection';
import { ParhamPaySection } from './components/ParhamPaySection';
import { InsuranceSection } from './components/InsuranceSection';
import { InvestmentsSection } from './components/InvestmentsSection';
import { formatTomans, toPersianDigits } from './utils/formatters';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  FileText, 
  HelpCircle,
  Sparkles,
  Coins,
  CreditCard,
  Building,
  School
} from 'lucide-react';

export default function App() {
  // Current Authenticated User (with roles: teacher, student, school founder, parent)
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    isLoggedIn: true,
    name: 'محمد رضایی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    role: 'teacher',
    schoolName: 'مجتمع آموزشی هوشمند علامه',
    nationalCode: '۰۰۱۲۳۴۵۶۷۸'
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [chatbotOpen, setChatbotOpen] = useState<boolean>(false);
  const currentRole = currentUser.role;

  const [activeTab, setActiveTab] = useState<MainTab>('home');

  // Financial Wallet & Credit state
  const [walletBalance, setWalletBalance] = useState<number>(18500000);
  const [creditLimit, setCreditLimit] = useState<number>(30000000);
  const [creditUsed, setCreditUsed] = useState<number>(3850000);

  // Global Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generic Loan Request Modal
  const [loanModalOpen, setLoanModalOpen] = useState<boolean>(false);
  const [selectedLoanTitle, setSelectedLoanTitle] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<number>(30000000);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantNationalId, setApplicantNationalId] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [loanSubmitting, setLoanSubmitting] = useState<boolean>(false);
  const [loanSuccess, setLoanSuccess] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenLoanModal = (title: string, defaultAmount: number) => {
    setSelectedLoanTitle(title);
    setLoanAmount(defaultAmount);
    setLoanSubmitting(false);
    setLoanSuccess(false);
    setApplicantName('');
    setApplicantNationalId('');
    setApplicantPhone('');
    setLoanModalOpen(true);
  };

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoanSubmitting(true);
    setTimeout(() => {
      setLoanSubmitting(false);
      setLoanSuccess(true);
      showToast(`درخواست ${selectedLoanTitle} به مبلغ ${formatTomans(loanAmount)} با موفقیت ثبت شد.`);
      setTimeout(() => {
        setLoanModalOpen(false);
      }, 2500);
    }, 1200);
  };

  const handleEarlyWageSuccess = (amount: number, fee: number) => {
    setWalletBalance(prev => prev + amount);
    showToast(`مبلغ ${formatTomans(amount)} مساعده حقوق با موفقیت به موجودی شما افزوده شد.`);
  };

  const handleBuyItem = (product: ParhamPayProduct, installments: number) => {
    setCreditUsed(prev => prev + product.price);
    showToast(`سفارش اعتباری ${product.name} در ${toPersianDigits(installments)} قسط ثبت شد.`);
  };

  const handleRequestInsurance = (planTitle: string, premium: number) => {
    showToast(`درخواست صدور بیمه‌نامه ${planTitle} ثبت گردید.`);
  };

  const handleDepositToPiggyBank = (goalId: string, amount: number) => {
    setWalletBalance(prev => Math.max(0, prev - amount));
    showToast(`مبلغ ${formatTomans(amount)} به قلک طلای دانش‌آموز افزوده شد.`);
  };

  const handleBuyTreasuryAsset = (assetName: string, amount: number) => {
    showToast(`مبلغ ${formatTomans(amount)} از رسوب مدرسه به ${assetName} تبدیل گردید.`);
  };

  const getRoleLabelFa = (role: UserRole) => {
    if (role === 'school') return 'موسس و مدیر مدرسه';
    if (role === 'teacher') return 'معلم و کادر آموزشی';
    if (role === 'parent') return 'اولیا و خانواده';
    return 'دانش‌آموز';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-[Vazirmatn,system-ui,sans-serif] selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Navbar: Clean navigation between Parham & Chatbot, with compact Workspace and User buttons */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        walletBalance={walletBalance}
        creditLimit={creditLimit}
        onOpenChatbot={() => setChatbotOpen(true)}
      />

      {/* Login & Registration Modal (Asks: Are you Teacher, Student, School Founder, or Parent?) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`خوش آمدید! ورود به عنوان «${getRoleLabelFa(user.role)}» انجام شد.`);
        }}
        onLogout={() => {
          setCurrentUser({
            isLoggedIn: false,
            name: 'کاربر مهمان',
            phone: '',
            role: 'student'
          });
          showToast('از حساب کاربری خارج شدید.');
        }}
      />

      {/* AI Financial Chatbot Slide-over / Modal */}
      <FinancialChatbot
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
        currentUser={currentUser}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'home' && (
          <HomeSection
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentUser={currentUser}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenChatbot={() => setChatbotOpen(true)}
          />
        )}

        {activeTab === 'overview' && (
          <OverviewDashboard
            currentRole={currentRole}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            walletBalance={walletBalance}
            creditLimit={creditLimit}
            creditUsed={creditUsed}
            onOpenAdvisor={() => setChatbotOpen(true)}
          />
        )}

        {activeTab === 'loans' && (
          <LoansSection
            currentRole={currentRole}
            onRequestLoanModal={handleOpenLoanModal}
            onEarlyWageSuccess={handleEarlyWageSuccess}
          />
        )}

        {activeTab === 'digital_accounting' && (
          <DigitalAccountingSection
            currentRole={currentRole}
            showToast={showToast}
          />
        )}

        {activeTab === 'parham_pay' && (
          <ParhamPaySection
            currentRole={currentRole}
            creditLimit={creditLimit}
            creditUsed={creditUsed}
            onBuyItem={handleBuyItem}
          />
        )}

        {activeTab === 'insurance' && (
          <InsuranceSection
            currentRole={currentRole}
            onRequestInsurance={handleRequestInsurance}
          />
        )}

        {activeTab === 'investments' && (
          <InvestmentsSection
            currentRole={currentRole}
            onDepositToPiggyBank={handleDepositToPiggyBank}
            onBuyAsset={handleBuyTreasuryAsset}
          />
        )}

      </main>

      {/* Universal Loan Request Modal */}
      {loanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-emerald-600 font-bold block mb-1">سامانه اعتبارات پرهام</span>
                <h3 className="text-base font-bold text-slate-900">ثبت آنلاین: {selectedLoanTitle}</h3>
              </div>
              <button
                onClick={() => setLoanModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {loanSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">پرونده تسهیلاتی شما با موفقیت تشکیل شد!</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  مبلغ درخواستی {formatTomans(loanAmount)} پس از تایید آنلاین استعلام بانکی (سامانه سمات) ظرف ۲۴ ساعت آینده به حساب ذینفع واریز می‌گردد.
                </p>
                <div className="text-[11px] text-slate-500">شماره پیگیری تسهیلات: LN-{Date.now().toString().slice(-6)}</div>
              </div>
            ) : (
              <form onSubmit={handleLoanSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">مبلغ وام درخواستی (تومان):</label>
                  <input
                    type="text"
                    readOnly
                    value={formatTomans(loanAmount)}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام‌خانوادگی متقاضی:</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="مثال: پرهام بهشتی"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">کد ملی ۱۰ رقمی:</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={applicantNationalId}
                      onChange={(e) => setApplicantNationalId(e.target.value)}
                      placeholder="۰۰۱۲۳۴۵۶۷۸"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">شماره تلفن همراه:</label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1 border border-slate-200">
                  <div className="flex items-center gap-1 text-slate-700 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>اعتبارسنجی آنلاین بدون ضامن فیزیکی</span>
                  </div>
                  <p>بررسی رتبه اعتباری به صورت الکترونیکی از طریق اتصال به سامانه اعتبارسنجی مرکزی بانک مرکزی انجام خواهد شد.</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setLoanModalOpen(false)}
                    className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    disabled={loanSubmitting}
                    className="flex-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {loanSubmitting ? <span>در حال ثبت در سامانه بانکی...</span> : <span>تایید و ارسال پرونده</span>}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Comprehensive Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 pt-12 pb-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white">
                  پـ
                </div>
                <span className="font-extrabold text-lg">پَرهام</span>
                <span className="bg-emerald-900/60 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-700">
                  فین‌تک مدارس
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                سامانه جامع فین‌تک آموزشی: اعتبارات شهریه، تسهیلات تجهیز مدارس، پرداخت حقوق پیش از موعد معلمان، پرهام‌پی، بیمه تجمیعی، سرمایه‌گذاری طلا و سواد مالی.
              </p>
            </div>

            {/* Pillar 1 & 2 links */}
            <div className="space-y-2">
              <span className="text-white font-bold block mb-3">تسهیلات و پرهام‌پی</span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab('loans')} className="hover:text-white">وام پرداخت شهریه اولیا (۴٪)</button></li>
                <li><button onClick={() => setActiveTab('loans')} className="hover:text-white">سرویس حقوق پیش از موعد دبیران</button></li>
                <li><button onClick={() => setActiveTab('loans')} className="hover:text-white">تسهیلات رهن و تجهیز مدرسه</button></li>
                <li><button onClick={() => setActiveTab('parham_pay')} className="hover:text-white">خرید اقساطی کتاب و آزمون</button></li>
                <li><button onClick={() => setActiveTab('parham_pay')} className="hover:text-white">اقساط سرویس مدارس و لباس فرم</button></li>
              </ul>
            </div>

            {/* Pillar 3 & 4 links */}
            <div className="space-y-2">
              <span className="text-white font-bold block mb-3">بیمه و سرمایه‌گذاری</span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab('insurance')} className="hover:text-white">بیمه تکمیلی تجمیعی معلمان</button></li>
                <li><button onClick={() => setActiveTab('insurance')} className="hover:text-white">بیمه حوادث و مسئولیت مدارس</button></li>
                <li><button onClick={() => setActiveTab('investments')} className="hover:text-white">تبدیل رسوب مدرسه به طلا و نقره</button></li>
                <li><button onClick={() => setActiveTab('investments')} className="hover:text-white">طرح قلک پرهام ویژه دانش‌آموزان</button></li>
                <li><button onClick={() => setActiveTab('literacy_advisor')} className="hover:text-white">مشاور هوش مصنوعی و آکادمی سواد مالی</button></li>
              </ul>
            </div>

            {/* Security & Trust Badges */}
            <div className="space-y-3">
              <span className="text-white font-bold block mb-3">امنیت و استانداردهای بانکی</span>
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>متصل به سوئیچ شاپرک و شتاب</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  کلیه تراکنش‌های اعتباری و بانکی با مجوزهای رسمی و تحت نظارت بانک مرکزی جمهوری اسلامی ایران صورت می‌گیرد.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
            <span>تمامی حقوق مادی و معنوی این پلتفرم متعلق به سامانه فین‌تک آموزشی پرهام است.</span>
            <div className="flex gap-4">
              <span>قوانین و مقررات</span>
              <span>حریم خصوصی</span>
              <span>پشتیبانی ۲۴ ساعته</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
