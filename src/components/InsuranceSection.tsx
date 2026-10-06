import React, { useState } from 'react';
import { INSURANCE_PLANS } from '../data/mockData';
import { InsurancePlan, UserRole } from '../types';
import { formatTomans, toPersianDigits } from '../utils/formatters';
import { 
  ShieldCheck, 
  Users, 
  Hospital, 
  Smile, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  FileCheck,
  Building,
  HeartHandshake,
  Clock,
  Coins,
  GraduationCap,
  Shield,
  FileText,
  Percent
} from 'lucide-react';

interface InsuranceSectionProps {
  currentRole: UserRole;
  onRequestInsurance: (planTitle: string, monthlyPremium: number) => void;
}

export const InsuranceSection: React.FC<InsuranceSectionProps> = ({
  currentRole,
  onRequestInsurance
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [issuedNotification, setIssuedNotification] = useState<string | null>(null);

  // Estimator State
  const [insuredCount, setInsuredCount] = useState<number>(8); // 8 individuals
  const [activePlanForDetails, setActivePlanForDetails] = useState<InsurancePlan | null>(null);

  // 4 Explicit Insurance Categories Requested by User
  const insuranceCategories = [
    { id: 'all', label: 'همه طرح‌های بیمه‌ای', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'retirement', label: 'بیمه بازنشستگی پرهام', icon: <Clock className="w-4 h-4" /> },
    { id: 'supplementary', label: 'بیمه تکمیلی', icon: <Hospital className="w-4 h-4" /> },
    { id: 'student_accident', label: 'بیمه حوادث دانش‌آموزی', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'school_accident', label: 'بیمه حوادث مدرسه', icon: <Building className="w-4 h-4" /> },
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? INSURANCE_PLANS 
    : INSURANCE_PLANS.filter(p => p.category === selectedCategory);

  const handleIssuePolicy = (plan: InsurancePlan) => {
    onRequestInsurance(plan.title, plan.monthlyPremium * (plan.category === 'school_accident' ? 1 : insuredCount));
    setIssuedNotification(`پیش‌فاکتور و بیمه‌نامه "${plan.title}" با موفقیت صادر گردید.`);
    setTimeout(() => {
      setIssuedNotification(null);
    }, 4000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-teal-800 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1.5 rounded-full border border-teal-500/30 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>بخش چهارم: خدمات بیمه‌ای اکوسیستم پرهام</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            پوشش جامع آرامش معلمان، دانش‌آموزان و مدارس
          </h2>
          <p className="text-teal-100/90 text-xs sm:text-base leading-relaxed mb-6">
            ارائه ۴ طرح تخصصی بیمه‌ای بدون نیاز به حدنصاب جمعیتی مدارس بزرگ: <strong className="text-white font-bold">بیمه بازنشستگی ۱۰ ساله پرهام</strong> با مستمری مادام‌العمر، <strong className="text-emerald-300 font-bold">بیمه تکمیلی درمان</strong>، <strong className="text-cyan-300 font-bold">بیمه حوادث ۲۴ ساعته دانش‌آموزی</strong> و <strong className="text-amber-300 font-bold">بیمه حوادث و مسئولیت مدنی مدارس</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-teal-300 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">بازنشستگی پرهام</span>
                <span className="text-[10px] text-teal-200">۱۰ ساله + مستمری</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <Hospital className="w-4 h-4 text-emerald-300 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">بیمه تکمیلی</span>
                <span className="text-[10px] text-emerald-200">بدون سقف پرسنلی</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-cyan-300 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">حوادث دانش‌آموزی</span>
                <span className="text-[10px] text-cyan-200">پوشش ۲۴ ساعته</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-2xl border border-white/10 flex items-center gap-2.5">
              <Building className="w-4 h-4 text-amber-300 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">حوادث مدرسه</span>
                <span className="text-[10px] text-amber-200">مسئولیت و حریق</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {issuedNotification && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 font-bold animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{issuedNotification}</span>
        </div>
      )}

      {/* 4 Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {insuranceCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <span className={isSelected ? 'text-teal-400' : 'text-slate-400'}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
              {cat.id !== 'all' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-slate-800 text-teal-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  {toPersianDigits(INSURANCE_PLANS.filter(p => p.category === cat.id).length)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Insurance Cards Grid - 4 Explicit Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlans.map((plan) => (
          <div 
            key={plan.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-full inline-block mb-2">
                    {plan.categoryFa}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">{plan.title}</h3>
                </div>

                <div className="text-left shrink-0">
                  <span className="text-[11px] text-slate-400 block">حق بیمه ماهانه:</span>
                  <span className="text-base font-black text-slate-900">{formatTomans(plan.monthlyPremium)}</span>
                </div>
              </div>

              {/* Highlight */}
              <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed">
                {plan.highlight}
              </p>

              {/* Coverage Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100/70">
                  <span className="text-[10px] text-teal-700 font-bold block mb-0.5">پوشش درمان و بستری:</span>
                  <span className="font-semibold text-slate-800">{plan.hospitalizationCoverage}</span>
                </div>
                <div className="p-3 bg-cyan-50/50 rounded-xl border border-cyan-100/70">
                  <span className="text-[10px] text-cyan-700 font-bold block mb-0.5">پوشش حوادث و غرامت:</span>
                  <span className="font-semibold text-slate-800">{plan.accidentCoverage}</span>
                </div>
                {plan.dentalCoverage && (
                  <div className="col-span-2 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100/70 flex justify-between items-center">
                    <span className="text-[10px] text-emerald-700 font-bold">پوشش دندانپزشکی تخصصی:</span>
                    <span className="font-semibold text-slate-800 text-[11px]">{plan.dentalCoverage}</span>
                  </div>
                )}
              </div>

              {/* Key Features */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-slate-700 block">مزایای کلیدی بیمه‌نامه:</span>
                {plan.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Footer Action */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              {plan.groupDiscountPct && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                  {toPersianDigits(plan.groupDiscountPct)}٪ تخفیف تجمیعی
                </span>
              )}
              <div className="flex-1 flex justify-end gap-2">
                <button
                  onClick={() => setActivePlanForDetails(plan)}
                  className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-colors"
                >
                  مشاهده شرایط کامل
                </button>
                <button
                  onClick={() => handleIssuePolicy(plan)}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <FileCheck className="w-3.5 h-3.5 text-teal-300" />
                  <span>صدور بیمه‌نامه آنلاین</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Details Modal */}
      {activePlanForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-teal-600 font-bold block">{activePlanForDetails.categoryFa}</span>
                <h3 className="text-base font-bold text-slate-900">{activePlanForDetails.title}</h3>
              </div>
              <button
                onClick={() => setActivePlanForDetails(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium">
                {activePlanForDetails.highlight}
              </p>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">تعهدات و شرایط تفصیلی:</h4>
                <ul className="space-y-2">
                  {activePlanForDetails.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activePlanForDetails.schoolManagerBonus && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>پاداش ویژه مدیر مدرسه: {activePlanForDetails.schoolManagerBonus}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  handleIssuePolicy(activePlanForDetails);
                  setActivePlanForDetails(null);
                }}
                className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                تایید و درخواست صدور
              </button>
              <button
                onClick={() => setActivePlanForDetails(null)}
                className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
