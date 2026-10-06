import React, { useState } from 'react';
import { PARHAM_PAY_PRODUCTS } from '../data/mockData';
import { ParhamPayProduct, UserRole } from '../types';
import { formatTomans, toPersianDigits } from '../utils/formatters';
import { 
  ShoppingBag, 
  CreditCard, 
  BookOpen, 
  Shirt, 
  UtensilsCrossed, 
  Printer, 
  GraduationCap, 
  PenTool, 
  Monitor, 
  Check, 
  Star, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Percent,
  Layers
} from 'lucide-react';

interface ParhamPaySectionProps {
  currentRole: UserRole;
  creditLimit: number;
  creditUsed: number;
  onBuyItem: (product: ParhamPayProduct, installments: number) => void;
}

export const ParhamPaySection: React.FC<ParhamPaySectionProps> = ({
  currentRole,
  creditLimit,
  creditUsed,
  onBuyItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProductForModal, setActiveProductForModal] = useState<ParhamPayProduct | null>(null);
  const [selectedInstallments, setSelectedInstallments] = useState<number>(3);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const availableCredit = creditLimit - creditUsed;

  // 7 Explicit Categories Requested by User
  const categories = [
    { id: 'all', label: 'همه اقلام و خدمات', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'books_exams', label: 'کتاب کمک‌آموزشی و آزمون‌ها', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'uniform', label: 'لباس فرم', icon: <Shirt className="w-4 h-4" /> },
    { id: 'catering', label: 'کترینگ مدارس', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'printing', label: 'چاپ و تکثیر', icon: <Printer className="w-4 h-4" /> },
    { id: 'tutoring_institutes', label: 'کلاس خصوصی و موسسات', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'stationery_paper', label: 'لوازم تحریر و کاغذ', icon: <PenTool className="w-4 h-4" /> },
    { id: 'school_equipment', label: 'تجهیزات مدارس', icon: <Monitor className="w-4 h-4" /> },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PARHAM_PAY_PRODUCTS
    : PARHAM_PAY_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleOpenPurchaseModal = (prod: ParhamPayProduct) => {
    setActiveProductForModal(prod);
    setSelectedInstallments(prod.installmentsCount);
    setPurchaseSuccess(null);
  };

  const handleConfirmPurchase = () => {
    if (!activeProductForModal) return;
    onBuyItem(activeProductForModal, selectedInstallments);
    setPurchaseSuccess(`سفارش اعتباری "${activeProductForModal.name}" در ${toPersianDigits(selectedInstallments)} قسط ماهانه با موفقیت ثبت شد.`);
    setTimeout(() => {
      setActiveProductForModal(null);
      setPurchaseSuccess(null);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Parham Pay BNPL Concept */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-indigo-800 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-400/30 mb-3">
              <CreditCard className="w-3.5 h-3.5" />
              <span>بخش سوم: پرهام‌پی (خرید قسطی و اعتباری BNPL)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              خرید اقساطی کلیه ملزومات مدارس، معلمان و دانش‌آموزان
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm leading-relaxed mb-6">
              الان تحویل بگیرید و هزینه‌اش را در اقساط ۳ تا ۱۲ ماهه بدون سود و ضامن بپردازید: کتاب‌های کمک‌آموزشی، آزمون‌های آزمایشی، لباس فرم، کترینگ گرم، چاپ و تکثیر، کلاس‌های خصوصی و تجهیزات هوشمند مدارس.
            </p>

            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-indigo-100 font-medium">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>اقساط ۳ تا ۱۲ ماهه</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-100 font-medium">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>بدون نیاز به چک و سفته اولیا</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-100 font-medium">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>تخفیف گروهی تا ۳۵٪ ویژه سفارش عمده مدارس</span>
              </div>
            </div>
          </div>

          {/* Credit Limit Summary Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-full lg:w-80 shrink-0">
            <div className="flex items-center justify-between text-xs text-indigo-200 mb-2">
              <span>سقف اعتبار تخصیص‌یافته</span>
              <span className="font-bold text-white">{formatTomans(creditLimit)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-indigo-200 mb-4">
              <span>اعتبار مصرف‌شده</span>
              <span className="font-bold text-amber-300">{formatTomans(creditUsed)}</span>
            </div>

            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mb-4">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, Math.round((creditUsed / creditLimit) * 100))}%` }}
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-white font-semibold">اعتبار در دسترس خرید:</span>
              <span className="text-base font-extrabold text-emerald-300">{formatTomans(availableCredit)}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Category Pills - 7 Requested Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
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
              <span className={isSelected ? 'text-indigo-400' : 'text-slate-400'}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
              {cat.id !== 'all' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  {toPersianDigits(PARHAM_PAY_PRODUCTS.filter(p => p.category === cat.id).length)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const monthlyEst = Math.round(product.price / product.installmentsCount);
          return (
            <div 
              key={product.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              {/* Image & Badge */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                  <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {product.categoryFa}
                  </span>
                  {product.isSchoolGroupPlan && (
                    <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      <span>{toPersianDigits(product.schoolDiscountPct || 20)}٪ تخفیف گروهی مدرسه</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{toPersianDigits(product.rating)}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">تامین‌کننده معتبر:</span>
                    <span className="font-semibold text-slate-700">{product.provider}</span>
                  </div>

                  <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-indigo-700 block">اقساط ماهانه ({toPersianDigits(product.installmentsCount)} ماهه):</span>
                      <span className="text-sm font-extrabold text-indigo-950">{formatTomans(monthlyEst)}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] text-slate-400 block">قیمت کل:</span>
                      <span className="text-xs font-bold text-slate-700">{formatTomans(product.price)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenPurchaseModal(product)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-indigo-300" />
                    <span>خرید اقساطی با پرهام‌پی</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Purchase Modal */}
      {activeProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-indigo-600 font-bold block mb-1">تسویه اعتباری پرهام‌پی</span>
                <h3 className="text-base font-bold text-slate-900">{activeProductForModal.name}</h3>
              </div>
              <button
                onClick={() => setActiveProductForModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {purchaseSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3">
                <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">سفارش اعتباری شما تایید شد!</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {purchaseSuccess}
                </p>
                <div className="text-[11px] text-slate-500">
                  شناسه سفارش: PP-{Date.now().toString().slice(-6)}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                
                {/* Product Summary */}
                <div className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <img 
                    src={activeProductForModal.image} 
                    alt={activeProductForModal.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[11px] text-indigo-600 font-bold">{activeProductForModal.categoryFa}</span>
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">{activeProductForModal.name}</span>
                    <span className="text-xs font-extrabold text-slate-700 mt-1">{formatTomans(activeProductForModal.price)}</span>
                  </div>
                </div>

                {/* Installments Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">تعداد اقساط ماهانه بازپرداخت:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 10, 12].map((inst) => (
                      <button
                        key={inst}
                        type="button"
                        onClick={() => setSelectedInstallments(inst)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedInstallments === inst
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {toPersianDigits(inst)} قسط
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Box */}
                <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200/70 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>مبلغ هر قسط ماهانه:</span>
                    <span className="text-sm font-extrabold text-indigo-950">
                      {formatTomans(Math.round(activeProductForModal.price / selectedInstallments))}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>کارمزد تقسیط پرهام‌پی:</span>
                    <span className="text-emerald-700 font-bold">۰ تومان (کاملاً رایگان)</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>سررسید اولین قسط:</span>
                    <span className="font-medium text-slate-800">۳۰ روز پس از تحویل کالا</span>
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="flex gap-3">
                  <button
                    onClick={handleConfirmPurchase}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>تایید نهایی و صدور فاکتور اقساطی</span>
                  </button>
                  <button
                    onClick={() => setActiveProductForModal(null)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors"
                  >
                    انصراف
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
