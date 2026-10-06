import React, { useState } from 'react';
import { LOAN_PRODUCTS, MOCK_PENDING_WAGE_REQUESTS } from '../data/mockData';
import { UserRole, EarlyWageRequest } from '../types';
import { formatTomans, toPersianDigits, calculateLoanInstallment, calculateEarlyWageDeduction } from '../utils/formatters';
import { 
  Coins, 
  GraduationCap, 
  Building2, 
  UserCheck, 
  Clock, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  Percent, 
  Zap, 
  Info, 
  Check, 
  X, 
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';

interface LoansSectionProps {
  currentRole: UserRole;
  onRequestLoanModal: (loanTitle: string, amount: number) => void;
  onEarlyWageSuccess: (amount: number, fee: number) => void;
}

export const LoansSection: React.FC<LoansSectionProps> = ({
  currentRole,
  onRequestLoanModal,
  onEarlyWageSuccess
}) => {
  // Active loan filter: 'all' | 'tuition-loan' | 'school-equipment' | 'teacher-welfare'
  const [selectedLoanFilter, setSelectedLoanFilter] = useState<string>('all');

  // Loan Calculator State
  const [calcPrincipal, setCalcPrincipal] = useState<number>(50000000); // 50 million tomans
  const [calcMonths, setCalcMonths] = useState<number>(12);
  const [calcRate, setCalcRate] = useState<number>(23); // 23% annual interest
  const calcFeeRate = 5; // 5% fee
  const [loanTarget, setLoanTarget] = useState<'tuition' | 'school' | 'teacher'>('tuition');

  // Early Wage Access (خدمات مساعده فوری کادر و معلمان) State
  const [teacherMonthlySalary, setTeacherMonthlySalary] = useState<number>(25000000);
  const [teacherWorkedDays, setTeacherWorkedDays] = useState<number>(18);
  const [teacherAdvanceAmount, setTeacherAdvanceAmount] = useState<number>(12000000);
  const [wageRequestSubmitting, setWageRequestSubmitting] = useState<boolean>(false);
  const [wageSuccessMessage, setWageSuccessMessage] = useState<string | null>(null);

  // Pending Wage Requests
  const [pendingWageRequests, setPendingWageRequests] = useState<EarlyWageRequest[]>(MOCK_PENDING_WAGE_REQUESTS);
  const [schoolApprovalFeedback, setSchoolApprovalFeedback] = useState<string | null>(null);

  // Calculations
  const loanResult = calculateLoanInstallment(calcPrincipal, calcMonths, calcRate, calcFeeRate);
  const earnedSoFar = Math.round((teacherMonthlySalary / 30) * teacherWorkedDays);
  const maxAllowedAdvance = Math.round(earnedSoFar * 0.85);
  const wageDeduction = calculateEarlyWageDeduction(teacherAdvanceAmount, 2.5);

  const handleQuickPreset = (type: 'tuition' | 'school' | 'teacher') => {
    setLoanTarget(type);
    if (type === 'tuition') {
      setCalcPrincipal(80000000);
      setCalcMonths(12);
      setCalcRate(23);
    } else if (type === 'school') {
      setCalcPrincipal(1500000000);
      setCalcMonths(36); // 3-year school loan
      setCalcRate(23);
    } else {
      setCalcPrincipal(120000000);
      setCalcMonths(18);
      setCalcRate(23);
    }
  };

  const handleEarlyWageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWageRequestSubmitting(true);
    setTimeout(() => {
      setWageRequestSubmitting(false);
      setWageSuccessMessage(
        `درخواست مساعده حقوق به مبلغ ${formatTomans(wageDeduction.netReceived)} ثبت گردید و ظرف ۳۰ دقیقه آینده به شبای بانکی شما واریز می‌شود. سر ماه مبلغ ${formatTomans(wageDeduction.requestedAmount)} به صورت خودکار از حقوق کسر خواهد شد.`
      );
      onEarlyWageSuccess(wageDeduction.netReceived, wageDeduction.fee);
    }, 1000);
  };

  const handleApproveTeacherWage = (reqId?: string, teacherName?: string) => {
    setPendingWageRequests(prev => 
      prev.map(r => r.id === reqId ? { ...r, status: 'approved' } : r)
    );
    setSchoolApprovalFeedback(`درخواست مساعده ${teacherName || 'همکار'} تایید شد و دستور واریز آنی پایا صادر گردید.`);
    setTimeout(() => setSchoolApprovalFeedback(null), 4000);
  };

  const handleRejectTeacherWage = (reqId?: string, teacherName?: string) => {
    setPendingWageRequests(prev => 
      prev.map(r => r.id === reqId ? { ...r, status: 'rejected' } : r)
    );
    setSchoolApprovalFeedback(`درخواست ${teacherName || 'همکار'} رد شد.`);
    setTimeout(() => setSchoolApprovalFeedback(null), 4000);
  };

  const filteredLoans = selectedLoanFilter === 'all'
    ? LOAN_PRODUCTS
    : LOAN_PRODUCTS.filter(p => p.id === selectedLoanFilter);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30 mb-4">
            <Coins className="w-3.5 h-3.5" />
            <span>بخش اول: تسهیلات و اعتبارات بانکی پرهام</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
            تسهیلات وام شهریه، وام ویژه مدارس و مساعده فرهنگیان
          </h2>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-6">
            ارائه بسته جامع اعتباری برای ۳ نیاز محوری جامعه آموزشی: <strong className="text-emerald-300 font-bold">وام پرداخت شهریه تحصیلی اولیا</strong> جهت تسویه آنی با مدرسه، <strong className="text-blue-300 font-bold">وام ویژه مدارس</strong> (تا ۲ میلیارد تومان با بازپرداخت ۳ ساله ۳۶ ماهه برای تجهیزات و ودیعه اجاره)، و <strong className="text-amber-300 font-bold">وام و خدمات مساعده فوری معلمان و کادر اداری</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">۱. وام پرداخت شهریه</span>
                <span className="font-extrabold text-emerald-300">تا ۵۰۰ میلیون ت (۲۴ ماهه)</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">۲. وام ویژه مدارس</span>
                <span className="font-extrabold text-blue-300">تا ۲ میلیارد ت (۳۶ ماهه)</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">۳. وام کادر و مساعده</span>
                <span className="font-extrabold text-amber-300">تا ۴۰۰ میلیون + مساعده آنی</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Sub-Item Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'همه تسهیلات', icon: <Layers className="w-4 h-4 text-slate-500" /> },
          { id: 'tuition-loan', label: '۱. وام پرداخت شهریه', icon: <GraduationCap className="w-4 h-4 text-emerald-600" /> },
          { id: 'school-equipment', label: '۲. وام ویژه مدارس (تجهیزات و ودیعه ۳ ساله)', icon: <Building2 className="w-4 h-4 text-blue-600" /> },
          { id: 'teacher-welfare', label: '۳. وام معلمان و کادر اداری و خدمات مساعده', icon: <UserCheck className="w-4 h-4 text-amber-600" /> },
        ].map((tab) => {
          const isActive = selectedLoanFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedLoanFilter(tab.id)}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* LOAN CARDS GRID - 3 REQUESTED LOANS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredLoans.map((loan) => (
          <div 
            key={loan.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {loan.badge}
                </span>
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                  تا {formatTomans(loan.maxAmount)}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">{loan.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{loan.description}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>نرخ سود سالیانه:</span>
                  <span className="font-bold text-slate-900">{toPersianDigits(loan.interestRate)}٪ سالیانه</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>کارمزد خدمات اعتباری:</span>
                  <span className="font-bold text-slate-900">{toPersianDigits(loan.feeRate || 5)}٪ ثابت</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>حداکثر دوره بازپرداخت:</span>
                  <span className="font-bold text-slate-900">{toPersianDigits(loan.maxMonths)} ماهه</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                {loan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onRequestLoanModal(loan.title, Math.min(100000000, loan.maxAmount))}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>ثبت درخواست آنلاین تسهیلات</span>
            </button>
          </div>
        ))}
      </div>

      {/* LOAN CALCULATOR SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base sm:text-lg font-black text-slate-900">محاسبه‌گر پیشرفته اقساط و تسهیلات پرهام</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">محاسبه دقیق مبلغ هر قسط، سود بانکی ۲۳٪ و کارمزد ۵٪ بر مبنای دوره بازپرداخت</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleQuickPreset('tuition')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                loanTarget === 'tuition' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              وام شهریه
            </button>
            <button
              onClick={() => handleQuickPreset('school')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                loanTarget === 'school' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              وام ۳ ساله مدارس
            </button>
            <button
              onClick={() => handleQuickPreset('teacher')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                loanTarget === 'teacher' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              وام کادر اداری
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="font-bold text-slate-700">مبلغ وام درخواستی:</span>
                <span className="text-sm font-extrabold text-slate-900">{formatTomans(calcPrincipal)}</span>
              </div>
              <input
                type="range"
                min={20000000}
                max={2000000000}
                step={10000000}
                value={calcPrincipal}
                onChange={(e) => setCalcPrincipal(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>۲۰ میلیون تومان</span>
                <span>۵۰۰ میلیون</span>
                <span>۲ میلیارد تومان</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="font-bold text-slate-700">مدت زمان بازپرداخت (تعداد اقساط ماهانه):</span>
                <span className="text-sm font-extrabold text-slate-900">{toPersianDigits(calcMonths)} ماهه</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[10, 12, 24, 36].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setCalcMonths(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      calcMonths === m
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {toPersianDigits(m)} ماهه {m === 36 ? '(۳ ساله)' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-md space-y-4">
            <span className="text-xs text-emerald-400 font-bold block">نتیجه محاسبه مصوب بانکی</span>
            
            <div>
              <span className="text-[11px] text-slate-300 block mb-0.5">مبلغ هر قسط ماهانه:</span>
              <div className="text-xl sm:text-2xl font-black text-white">{formatTomans(loanResult.monthlyWithFee)}</div>
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>سود کل دوره (۲۳٪ سالیانه):</span>
                <span className="font-bold text-white">{formatTomans(loanResult.interest)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>کارمزد خدمات اعتباری (۵٪):</span>
                <span className="font-bold text-white">{formatTomans(loanResult.fee)}</span>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-slate-800/80 pt-2 font-bold">
                <span>مجموع بازپرداخت کل:</span>
                <span className="text-emerald-400">{formatTomans(loanResult.totalWithFee)}</span>
              </div>
            </div>

            <button
              onClick={() => onRequestLoanModal(`وام محاسبه‌شده (${formatTomans(calcPrincipal)})`, calcPrincipal)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              تشکیل پرونده و دریافت وام
            </button>
          </div>

        </div>
      </div>

      {/* SPECIAL SUB-MODULE: خدمات مساعده فوری معلمان و کادر آموزشی */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50/50 border border-amber-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <h3 className="text-base sm:text-lg font-black text-slate-900">خدمات مساعده فوری و حقوق پیش از موعد فرهنگیان</h3>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">دریافت تا ۸۵٪ از حقوق روزهای کارکرد ماه قبل از موعد سررسید، بدون نیاز به چک و ضامن</p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-lg">
            کارمزد فقط ۲.۵٪
          </span>
        </div>

        {wageSuccessMessage ? (
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900">{wageSuccessMessage}</h4>
            <button
              onClick={() => setWageSuccessMessage(null)}
              className="text-xs font-bold text-emerald-700 underline pt-1"
            >
              ثبت درخواست مجدد
            </button>
          </div>
        ) : (
          <form onSubmit={handleEarlyWageSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-slate-700">حقوق ماهانه ناخالص همکار:</label>
                  <span className="font-extrabold text-slate-900">{formatTomans(teacherMonthlySalary)}</span>
                </div>
                <input
                  type="range"
                  min={10000000}
                  max={45000000}
                  step={1000000}
                  value={teacherMonthlySalary}
                  onChange={(e) => setTeacherMonthlySalary(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-slate-700">تعداد روزهای کارکرد تا امروز:</label>
                  <span className="font-extrabold text-slate-900">{toPersianDigits(teacherWorkedDays)} روز</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={29}
                  step={1}
                  value={teacherWorkedDays}
                  onChange={(e) => setTeacherWorkedDays(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-slate-700">مبلغ مساعده درخواستی (سقف مجاز {formatTomans(maxAllowedAdvance)}):</label>
                  <span className="font-extrabold text-amber-900">{formatTomans(teacherAdvanceAmount)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={maxAllowedAdvance}
                  step={500000}
                  value={teacherAdvanceAmount}
                  onChange={(e) => setTeacherAdvanceAmount(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-amber-200 space-y-3 text-xs shadow-2xs">
              <span className="font-bold text-slate-800 block">رسید تسویه مساعده:</span>
              
              <div className="flex justify-between text-slate-600">
                <span>مبلغ ناخالص درخواست:</span>
                <span className="font-bold text-slate-900">{formatTomans(wageDeduction.requestedAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>کارمزد خدمات فین‌تک (۲.۵٪):</span>
                <span className="font-bold text-amber-700">-{formatTomans(wageDeduction.fee)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 border-t border-slate-100 pt-2 font-extrabold">
                <span>مبلغ واریزی آنی به شبای همکار:</span>
                <span className="text-sm">{formatTomans(wageDeduction.netReceived)}</span>
              </div>

              <button
                type="submit"
                disabled={wageRequestSubmitting}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-colors shadow-2xs mt-2"
              >
                {wageRequestSubmitting ? 'در حال صدور دستور واریز...' : 'ثبت آنلاین درخواست مساعده فوری'}
              </button>
            </div>

          </form>
        )}
      </div>

    </div>
  );
};
