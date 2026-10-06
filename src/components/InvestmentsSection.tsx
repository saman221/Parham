import React, { useState } from 'react';
import { 
  INVESTMENT_ASSETS, 
  MOCK_CHARITY_PROJECTS, 
  MOCK_PIGGY_BANKS, 
  MOCK_LINKED_FAMILY_INVESTMENTS,
  GOAL_BASED_FUNDS,
  MOCK_ADVISORY_PLANS,
  FINANCIAL_COURSES,
  PIGGY_SHOP_PRODUCTS,
  INITIAL_PIGGY_ORDERS
} from '../data/mockData';
import { 
  InvestmentAsset, 
  CharityProject, 
  PiggyBankGoal, 
  LinkedFamilyInvestment, 
  GoalBasedFund,
  AdvisorySubscription,
  FinancialCourse,
  UserRole,
  PiggyShopProduct,
  PiggyPurchaseOrder
} from '../types';
import { formatTomans, toPersianDigits } from '../utils/formatters';
import { 
  TrendingUp, 
  Coins, 
  Sparkles, 
  ArrowUpRight, 
  Plus, 
  ShieldCheck, 
  Award, 
  Wallet, 
  Target, 
  CheckCircle2, 
  Flame,
  ArrowRight,
  BarChart3,
  Users,
  Building,
  HeartHandshake,
  Lock,
  Laptop,
  Plane,
  Calculator,
  SlidersHorizontal,
  Check,
  Heart,
  BookOpenCheck,
  Compass,
  LineChart,
  ShoppingBag,
  Tag,
  Truck,
  Clock,
  Smartphone,
  ChevronRight,
  CreditCard,
  Package,
  Layers,
  Sparkle
} from 'lucide-react';

interface InvestmentsSectionProps {
  currentRole: UserRole;
  onDepositToPiggyBank: (goalId: string, amount: number) => void;
  onBuyAsset: (assetName: string, amount: number) => void;
}

export const InvestmentsSection: React.FC<InvestmentsSectionProps> = ({
  currentRole,
  onDepositToPiggyBank,
  onBuyAsset
}) => {
  // Navigation tabs inside Section 5
  // 'all' | 'piggy_bank' (قلک پرهام) | 'metals' (فلزات گران‌بها) | 'stocks' (سهام) | 'fixed_income' (درآمد ثابت) | 'charity' (نیکوکاری) | 'advisory_literacy' (مشاوره و سواد مالی) | 'goal_funds' (سبدهای هدفمند)
  const [activeInvestmentTab, setActiveInvestmentTab] = useState<string>('all');

  // Piggy bank & Goal Funds state
  const [piggyGoals, setPiggyGoals] = useState<PiggyBankGoal[]>(MOCK_PIGGY_BANKS);
  const [piggySubTab, setPiggySubTab] = useState<'goals' | 'shop' | 'orders'>('goals');
  const [piggyShopItems, setPiggyShopItems] = useState<PiggyShopProduct[]>(PIGGY_SHOP_PRODUCTS);
  const [piggyOrders, setPiggyOrders] = useState<PiggyPurchaseOrder[]>(INITIAL_PIGGY_ORDERS);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('all');

  // Piggy Bank Direct Purchase Checkout State
  const [selectedProductForBuy, setSelectedProductForBuy] = useState<PiggyShopProduct | null>(null);
  const [selectedGoalForBuy, setSelectedGoalForBuy] = useState<string>('all');
  const [bnplInstallments, setBnplInstallments] = useState<number>(6);
  const [buyerName, setBuyerName] = useState<string>('امیرحسین پارسا (دانش‌آموز)');
  const [buyerPhone, setBuyerPhone] = useState<string>('۰۹۱۲۳۴۵۶۷۸۹');
  const [buyerAddress, setBuyerAddress] = useState<string>('تهران، خیابان شریعتی، بالاتر از پل رومی، پلاک ۴۲، واحد ۳');
  const [buySubmitting, setBuySubmitting] = useState<boolean>(false);
  const [buySuccessOrder, setBuySuccessOrder] = useState<PiggyPurchaseOrder | null>(null);

  // New Goal Modal State
  const [newGoalModalOpen, setNewGoalModalOpen] = useState<boolean>(false);
  const [newGoalStudentName, setNewGoalStudentName] = useState<string>('امیرحسین پارسا');
  const [newGoalTitle, setNewGoalTitle] = useState<string>('');
  const [newGoalTargetKey, setNewGoalTargetKey] = useState<'laptop' | 'dowry' | 'migration' | 'tablet' | 'vehicle' | 'custom'>('laptop');
  const [newGoalTargetAmount, setNewGoalTargetAmount] = useState<number>(50000000);
  const [newGoalDurationMonths, setNewGoalDurationMonths] = useState<number>(12);
  const [newGoalInitialDeposit, setNewGoalInitialDeposit] = useState<number>(2000000);
  const [newGoalAllocation, setNewGoalAllocation] = useState<'combined' | 'gold' | 'silver'>('combined');
  const [newGoalSuccessMessage, setNewGoalSuccessMessage] = useState<string | null>(null);

  const [familyInvestments, setFamilyInvestments] = useState<LinkedFamilyInvestment[]>(MOCK_LINKED_FAMILY_INVESTMENTS);
  const [selectedGoalForDeposit, setSelectedGoalForDeposit] = useState<PiggyBankGoal | null>(null);
  const [depositAmount, setDepositAmount] = useState<number>(500000);
  const [depositSuccess, setDepositSuccess] = useState<string | null>(null);
  const [depositBasket, setDepositBasket] = useState<'combined' | 'gold' | 'silver'>('combined');

  // Simulator modal
  const [simulatingFund, setSimulatingFund] = useState<GoalBasedFund | null>(null);
  const [simMonthlyDeposit, setSimMonthlyDeposit] = useState<number>(2000000);
  const [simMonths, setSimMonths] = useState<number>(12);
  const [fundJoinedSuccess, setFundJoinedSuccess] = useState<string | null>(null);

  // Asset Purchase Modal (Gold, Silver, Copper, Stocks, Fixed Income)
  const [selectedAsset, setSelectedAsset] = useState<InvestmentAsset | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(5000000);
  const [assetSuccessMessage, setAssetSuccessMessage] = useState<string | null>(null);

  // Charity donation modal
  const [selectedCharity, setSelectedCharity] = useState<CharityProject | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(200000);
  const [charitySuccess, setCharitySuccess] = useState<string | null>(null);

  // Quiz state in financial literacy
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResult, setShowQuizResult] = useState<Record<string, boolean>>({});

  // Reference prices
  const goldPrice = 4680000;
  const silverPrice = 88500;
  const copperPrice = 585000;

  const handleOpenFundSimulator = (fund: GoalBasedFund) => {
    setSimulatingFund(fund);
    setSimMonths(fund.recommendedHorizonMonths);
    if (fund.targetKey === 'laptop') {
      setSimMonthlyDeposit(2500000);
    } else if (fund.targetKey === 'dowry') {
      setSimMonthlyDeposit(4000000);
    } else {
      setSimMonthlyDeposit(8000000);
    }
  };

  const handleJoinSimulatedFund = () => {
    if (!simulatingFund) return;
    const newInvestment: LinkedFamilyInvestment = {
      id: `lfi-${Date.now()}`,
      targetKey: simulatingFund.targetKey,
      parentName: 'پرتفوی جدید خانواده',
      studentName: 'فرزند خانواده',
      familyGoalTitle: `سبد هدفمند جدید: ${simulatingFund.title}`,
      parentSavings: simMonthlyDeposit * simMonths,
      studentSavings: Math.round(simMonthlyDeposit * 0.4 * simMonths),
      parentMatchBonusPct: simulatingFund.parentMatchBonusPct,
      combinedGoldGrams: Number((((simMonthlyDeposit * simMonths) * (simulatingFund.goldAllocationPct / 100)) / goldPrice).toFixed(2)),
      combinedSilverGrams: Number((((simMonthlyDeposit * simMonths) * (simulatingFund.silverAllocationPct / 100)) / silverPrice).toFixed(1)),
      totalYieldEstimatedPct: simulatingFund.expectedAnnualYieldPct
    };

    setFamilyInvestments(prev => [newInvestment, ...prev]);
    setFundJoinedSuccess(`صندوق هدفمند «${simulatingFund.title}» با افق ${toPersianDigits(simMonths)} ماهه و واریز ماهانه ${formatTomans(simMonthlyDeposit)} با موفقیت به پرتفوی شما افزوده شد.`);
    setTimeout(() => {
      setSimulatingFund(null);
      setFundJoinedSuccess(null);
    }, 3500);
  };

  const handleBuyAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;
    onBuyAsset(selectedAsset.name, purchaseAmount);
    setAssetSuccessMessage(`سرمایه‌گذاری به مبلغ ${formatTomans(purchaseAmount)} در «${selectedAsset.name}» با موفقیت انجام شد.`);
    setTimeout(() => {
      setSelectedAsset(null);
      setAssetSuccessMessage(null);
    }, 2500);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCharity) return;
    setCharitySuccess(`مبلغ ${formatTomans(donationAmount)} به عنوان هدیه نیکوکاری در پویش «${selectedCharity.title}» ثبت شد. از همیاری شما صمیمانه سپاسگزاریم.`);
    setTimeout(() => {
      setSelectedCharity(null);
      setCharitySuccess(null);
    }, 3000);
  };

  const handleConfirmDeposit = () => {
    if (!selectedGoalForDeposit) return;
    const bonus = Math.round((depositAmount * selectedGoalForDeposit.parentMatchBonusPct) / 100);
    const totalAdded = depositAmount + bonus;

    let addedGoldGrams = 0;
    let addedSilverGrams = 0;

    if (depositBasket === 'combined') {
      const goldShare = totalAdded * 0.5;
      const silverShare = totalAdded * 0.5;
      addedGoldGrams = Number((goldShare / goldPrice).toFixed(3));
      addedSilverGrams = Number((silverShare / silverPrice).toFixed(2));
    } else if (depositBasket === 'gold') {
      addedGoldGrams = Number((totalAdded / goldPrice).toFixed(3));
    } else {
      addedSilverGrams = Number((totalAdded / silverPrice).toFixed(2));
    }

    setPiggyGoals(prev => prev.map(g => {
      if (g.id === selectedGoalForDeposit.id) {
        return {
          ...g,
          currentSavings: g.currentSavings + totalAdded,
          goldWeightGrams: Number(((g.goldWeightGrams || 0) + addedGoldGrams).toFixed(3)),
          silverWeightGrams: Number(((g.silverWeightGrams || 0) + addedSilverGrams).toFixed(2)),
          assetAllocation: depositBasket
        };
      }
      return g;
    }));

    onDepositToPiggyBank(selectedGoalForDeposit.id, totalAdded);
    setDepositSuccess(`مبلغ ${formatTomans(totalAdded)} (شامل ${formatTomans(bonus)} پاداش والدین) با موفقیت به قلک واریز شد.`);
    setTimeout(() => {
      setSelectedGoalForDeposit(null);
      setDepositSuccess(null);
    }, 2500);
  };

  const handleCreateNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const goldPortion = newGoalAllocation === 'gold' ? newGoalInitialDeposit : newGoalAllocation === 'combined' ? newGoalInitialDeposit * 0.5 : 0;
    const silverPortion = newGoalAllocation === 'silver' ? newGoalInitialDeposit : newGoalAllocation === 'combined' ? newGoalInitialDeposit * 0.5 : 0;

    const newGoal: PiggyBankGoal = {
      id: `pb-${Date.now()}`,
      targetKey: newGoalTargetKey,
      studentName: newGoalStudentName.trim() || 'دانش‌آموز',
      goalTitle: newGoalTitle.trim(),
      category: newGoalTargetKey === 'laptop' ? 'لپ‌تاپ و تجهیزات دیجیتال' : newGoalTargetKey === 'dowry' ? 'جهیزیه و مسکن' : newGoalTargetKey === 'migration' ? 'مهاجرت تحصیلی و زبان' : newGoalTargetKey === 'tablet' ? 'تبلت و طراحی' : newGoalTargetKey === 'vehicle' ? 'وسایل نقلیه پاک' : 'هدف اختصاصی',
      targetAmount: newGoalTargetAmount,
      currentSavings: newGoalInitialDeposit,
      goldWeightGrams: Number((goldPortion / goldPrice).toFixed(3)),
      silverWeightGrams: Number((silverPortion / silverPrice).toFixed(2)),
      assetAllocation: newGoalAllocation,
      parentMatchBonusPct: 20,
      avatar: newGoalTargetKey === 'laptop' ? '💻' : newGoalTargetKey === 'dowry' ? '💍' : newGoalTargetKey === 'migration' ? '✈️' : newGoalTargetKey === 'tablet' ? '📱' : newGoalTargetKey === 'vehicle' ? '🛵' : '🎯',
      durationMonths: newGoalDurationMonths,
      createdAt: 'امروز'
    };

    setPiggyGoals(prev => [newGoal, ...prev]);
    setNewGoalSuccessMessage(`هدف جدید «${newGoal.goalTitle}» با موفقیت در قلک پرهام تعریف شد.`);
    setTimeout(() => {
      setNewGoalModalOpen(false);
      setNewGoalSuccessMessage(null);
      setNewGoalTitle('');
      setNewGoalInitialDeposit(2000000);
    }, 2000);
  };

  const handleOpenBuyModal = (product: PiggyShopProduct, preselectedGoalId?: string) => {
    setSelectedProductForBuy(product);
    setSelectedGoalForBuy(preselectedGoalId || 'all');
    setBuySubmitting(false);
    setBuySuccessOrder(null);
  };

  const handleConfirmPiggyPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForBuy) return;

    setBuySubmitting(true);
    const totalPiggySavings = piggyGoals.reduce((sum, g) => sum + g.currentSavings, 0);
    const availableFromGoal = selectedGoalForBuy === 'all' 
      ? totalPiggySavings 
      : (piggyGoals.find(g => g.id === selectedGoalForBuy)?.currentSavings || 0);

    const priceToPay = selectedProductForBuy.piggyDiscountPrice;
    const piggyPaidAmount = Math.min(availableFromGoal, priceToPay);
    const remainderBnpl = Math.max(0, priceToPay - piggyPaidAmount);

    setTimeout(() => {
      // Deduct from chosen goal(s)
      if (piggyPaidAmount > 0) {
        if (selectedGoalForBuy === 'all') {
          let remainingToDeduct = piggyPaidAmount;
          setPiggyGoals(prev => prev.map(g => {
            if (remainingToDeduct <= 0) return g;
            const deduct = Math.min(g.currentSavings, remainingToDeduct);
            remainingToDeduct -= deduct;
            return {
              ...g,
              currentSavings: g.currentSavings - deduct
            };
          }));
        } else {
          setPiggyGoals(prev => prev.map(g => {
            if (g.id === selectedGoalForBuy) {
              return {
                ...g,
                currentSavings: Math.max(0, g.currentSavings - piggyPaidAmount)
              };
            }
            return g;
          }));
        }
      }

      const newOrder: PiggyPurchaseOrder = {
        id: `pord-${Date.now()}`,
        orderNumber: `PRH-PG-${Math.floor(10000 + Math.random() * 90000)}`,
        date: 'امروز',
        productName: selectedProductForBuy.name,
        productCategory: selectedProductForBuy.categoryFa,
        totalAmount: priceToPay,
        piggyPaidAmount,
        remainderBnplAmount: remainderBnpl,
        discountSaved: selectedProductForBuy.originalPrice - selectedProductForBuy.piggyDiscountPrice,
        status: 'confirmed',
        trackingCode: `POST-IR-${Math.floor(100000000 + Math.random() * 900000000)}`
      };

      setPiggyOrders(prev => [newOrder, ...prev]);
      setBuySuccessOrder(newOrder);
      setBuySubmitting(false);
    }, 1100);
  };

  // Filtered Assets
  const metalAssets = INVESTMENT_ASSETS.filter(a => ['gold', 'silver', 'copper'].includes(a.category));
  const stockAssets = INVESTMENT_ASSETS.filter(a => a.category === 'stocks');
  const fixedIncomeAssets = INVESTMENT_ASSETS.filter(a => a.category === 'fixed_income');

  // Piggy totals
  const totalSavingsAllPiggy = piggyGoals.reduce((sum, g) => sum + g.currentSavings, 0);
  const totalGoldWeightAllPiggy = piggyGoals.reduce((sum, g) => sum + (g.goldWeightGrams || 0), 0);
  const totalTargetAllPiggy = piggyGoals.reduce((sum, g) => sum + g.targetAmount, 0);

  const filteredShopProducts = shopCategoryFilter === 'all'
    ? piggyShopItems
    : piggyShopItems.filter(p => p.targetKey === shopCategoryFilter);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-amber-800 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/30 mb-4">
            <Coins className="w-3.5 h-3.5" />
            <span>بخش پنجم: بازار سرمایه‌گذاری، صندوق‌ها، نیکوکاری و سواد مالی پرهام</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            سرمایه‌گذاری در فلزات گران‌بها، قلک پرهام، سهام و نیکوکاری
          </h2>
          <p className="text-amber-100/90 text-xs sm:text-base leading-relaxed mb-6">
            پرتفوی هوشمند دارایی‌های ضدتورمی: <strong className="text-amber-300 font-bold">«قلک پرهام» جهت هدف‌گذاری و خرید مستقیم کالا</strong>، <strong className="text-yellow-300 font-bold">صندوق فلزات گران‌بها (طلا، نقره، مس)</strong>، <strong className="text-emerald-300 font-bold">صندوق سهام</strong>، <strong className="text-sky-300 font-bold">صندوق درآمد ثابت روزشمار ۳۱.۵٪</strong>، <strong className="text-rose-300 font-bold">پویش‌های نیکوکاری مدارس</strong> و <strong className="text-purple-300 font-bold">سبدهای هدفمند آتیه</strong>.
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>طلای ۱۸ عیار: {formatTomans(goldPrice)}</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span>نقره خالص ۹۹۹: {formatTomans(silverPrice)}</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              <span>مس بورس کالا: {formatTomans(copperPrice)}</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>سود درآمد ثابت: ۳۱.۵٪ سالیانه</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs matching User's Points */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'همه بخش‌های سرمایه‌گذاری', icon: <TrendingUp className="w-4 h-4 text-slate-500" /> },
          { id: 'piggy_bank', label: '🪙 قلک پرهام (هدف‌گذاری و خرید)', icon: <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />, highlight: true },
          { id: 'metals', label: '۱. صندوق فلزات گران‌بها (طلا - نقره - مس)', icon: <Coins className="w-4 h-4 text-amber-500" /> },
          { id: 'stocks', label: '۲. صندوق سهام', icon: <LineChart className="w-4 h-4 text-emerald-500" /> },
          { id: 'fixed_income', label: '۳. صندوق درآمد ثابت', icon: <ShieldCheck className="w-4 h-4 text-sky-500" /> },
          { id: 'charity', label: '۴. نیکوکاری و مسئولیت اجتماعی', icon: <Heart className="w-4 h-4 text-rose-500" /> },
          { id: 'advisory_literacy', label: '۵. مشاوره سرمایه‌گذاری و سواد مالی', icon: <BookOpenCheck className="w-4 h-4 text-purple-500" /> },
          { id: 'goal_funds', label: 'سبدهای هدفمند (لپ‌تاپ، جهیزیه، مهاجرت)', icon: <Target className="w-4 h-4 text-indigo-500" /> },
        ].map((tab) => {
          const isActive = activeInvestmentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveInvestmentTab(tab.id)}
              className={`py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : tab.highlight
                  ? 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.highlight && !isActive && (
                <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black animate-pulse">جدید</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* DEDICATED SECTION: قلک پرهام (هدف‌گذاری هوشمند و خرید کالا) */}
      {/* ======================================================== */}
      {(activeInvestmentTab === 'all' || activeInvestmentTab === 'piggy_bank') && (
        <div className="bg-gradient-to-b from-amber-50/70 via-white to-slate-50 rounded-3xl border-2 border-amber-300/80 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Header & Stats Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-amber-200/70">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 bg-gradient-to-tr from-amber-500 to-yellow-400 text-white rounded-2xl shadow-md shadow-amber-500/20">
                  <Coins className="w-6 h-6" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      «قلک پرهام»
                    </h3>
                    <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-300">
                      هدف‌گذاری هوشمند و خرید کالا
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    پس‌انداز هدفمند ضدتورمی با طلا و نقره + خرید مستقیم کالا با ۱۰ الی ۱۵ درصد تخفیف و امکان پرداخت مابقی با اقساط پرهام‌پی
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action: New Goal */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setNewGoalModalOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>+ تعریف هدف جدید در قلک</span>
              </button>
            </div>
          </div>

          {/* 4 Metric Cards for Piggy Bank */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-bold block mb-1">کل اندوخته قلک‌های شما:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-slate-900">{formatTomans(totalSavingsAllPiggy)}</span>
              </div>
              <span className="text-[10px] text-amber-700 font-bold block mt-1">
                معادل {toPersianDigits(totalGoldWeightAllPiggy.toFixed(2))} گرم طلا و نقره
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-bold block mb-1">بازدهی محافظت از تورم:</span>
              <div className="flex items-baseline gap-1 text-emerald-600">
                <span className="text-lg font-black">+۴۱.۲٪</span>
                <span className="text-xs font-bold">سود ضدتورم</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">ارزش‌افزوده طلا نسبت به ریال</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-bold block mb-1">پاداش و تخفیف خرید کالا:</span>
              <div className="flex items-baseline gap-1 text-sky-700">
                <span className="text-lg font-black">۱۰ الی ۱۵ درصد</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">تخفیف ویژه اختصاصی قلک پرهام</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-bold block mb-1">تعداد اهداف فعال:</span>
              <div className="flex items-baseline gap-1 text-purple-700">
                <span className="text-lg font-black">{toPersianDigits(piggyGoals.length)}</span>
                <span className="text-xs font-bold">هدف پس‌انداز</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">لپ‌تاپ، جهیزیه، مهاجرت و...</span>
            </div>
          </div>

          {/* Sub Navigation inside Piggy Bank: [🎯 هدف‌گذاری و قلک‌ها] [🛍️ فروشگاه و خرید مستقیم با قلک] [📦 خریدهای انجام‌شده] */}
          <div className="flex items-center gap-2 bg-amber-100/60 p-1.5 rounded-2xl border border-amber-200/80 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setPiggySubTab('goals')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 whitespace-nowrap transition-all ${
                piggySubTab === 'goals'
                  ? 'bg-white text-slate-900 shadow-xs border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-4 h-4 text-amber-600" />
              <span>۱. هدف‌گذاری و مدیریت قلک‌ها ({toPersianDigits(piggyGoals.length)})</span>
            </button>

            <button
              onClick={() => setPiggySubTab('shop')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 whitespace-nowrap transition-all ${
                piggySubTab === 'shop'
                  ? 'bg-white text-slate-900 shadow-xs border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>۲. فروشگاه و خرید مستقیم با موجودی قلک</span>
              <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">تخفیف‌دار</span>
            </button>

            <button
              onClick={() => setPiggySubTab('orders')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 whitespace-nowrap transition-all ${
                piggySubTab === 'orders'
                  ? 'bg-white text-slate-900 shadow-xs border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4 text-sky-600" />
              <span>۳. سوابق خریدهای من ({toPersianDigits(piggyOrders.length)})</span>
            </button>
          </div>

          {/* SUB-VIEW 1: هدف‌گذاری و مدیریت قلک‌ها */}
          {piggySubTab === 'goals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">اهداف فعال در قلک پرهام</h4>
                  <p className="text-xs text-slate-500 mt-0.5">پس‌انداز روزانه یا ماهانه در قالب طلای ۱۸ عیار و نقره با همراهی پاداش والدین</p>
                </div>
                <button
                  onClick={() => setNewGoalModalOpen(true)}
                  className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>هدف‌گذاری جدید</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {piggyGoals.map((goal) => {
                  const progressPct = Math.min(100, Math.round((goal.currentSavings / goal.targetAmount) * 100));
                  const remainingTomans = Math.max(0, goal.targetAmount - goal.currentSavings);

                  return (
                    <div 
                      key={goal.id}
                      className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-10 h-10 rounded-2xl bg-amber-100 text-xl flex items-center justify-center border border-amber-200">
                              {goal.avatar}
                            </span>
                            <div>
                              <span className="text-[11px] font-bold text-slate-500 block">{goal.studentName}</span>
                              <h5 className="text-xs font-extrabold text-slate-900 leading-snug">{goal.goalTitle}</h5>
                            </div>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-1.5 my-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">پیشرفت هدف:</span>
                            <span className="font-black text-amber-700">{toPersianDigits(progressPct)}٪</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                            <span>ذخیره: {formatTomans(goal.currentSavings)}</span>
                            <span>هدف: {formatTomans(goal.targetAmount)}</span>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">موجودی طلا و نقره:</span>
                            <span className="font-bold text-amber-950">
                              {toPersianDigits(goal.goldWeightGrams)} گرم طلا + {toPersianDigits(goal.silverWeightGrams)} گرم نقره
                            </span>
                          </div>
                          <div className="flex justify-between text-emerald-700">
                            <span>پاداش تشویقی واریز:</span>
                            <span className="font-extrabold">+{toPersianDigits(goal.parentMatchBonusPct)}٪ پاداش هم‌افزایی</span>
                          </div>
                          <div className="flex justify-between text-slate-500">
                            <span>مبلغ مانده تا تکمیل:</span>
                            <span className="font-bold text-slate-700">{formatTomans(remainingTomans)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions: Deposit / Buy */}
                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedGoalForDeposit(goal);
                            setDepositAmount(1000000);
                          }}
                          className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>واریز و شارژ</span>
                        </button>

                        <button
                          onClick={() => {
                            setPiggySubTab('shop');
                            setSelectedGoalForBuy(goal.id);
                          }}
                          className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                          <span>خرید کالا با قلک</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: فروشگاه و خرید مستقیم با موجودی قلک */}
          {piggySubTab === 'shop' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-emerald-900 to-teal-950 p-4 sm:p-5 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-800 shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-300">
                      <ShoppingBag className="w-4 h-4" />
                    </span>
                    <h4 className="text-sm font-bold text-white">فروشگاه اختصاصی دارندگان قلک پرهام</h4>
                  </div>
                  <p className="text-xs text-emerald-100/80 mt-1">
                    شما می‌توانید با موجودی قلک خود ({formatTomans(totalSavingsAllPiggy)}) کالاهای زیر را با <strong className="text-amber-300">تخفیف ۱۰ الی ۱۵ درصدی</strong> مستقیم خریداری نمایید. در صورت کسری موجودی، مابقی در قالب <strong className="text-sky-300">اقساط پرهام‌پی</strong> تسویه می‌شود.
                  </p>
                </div>

                <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 shrink-0 text-left">
                  <span className="text-[10px] text-emerald-200 block">موجودی در دسترس کل قلک‌ها:</span>
                  <span className="text-sm font-black text-amber-300">{formatTomans(totalSavingsAllPiggy)}</span>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: 'all', label: 'همه کالاها' },
                  { id: 'laptop', label: '💻 لپ‌تاپ و تجهیزات' },
                  { id: 'dowry', label: '💍 جهیزیه و منزل' },
                  { id: 'migration', label: '✈️ مهاجرت تحصیلی' },
                  { id: 'tablet', label: '📱 تبلت قلم‌دار' },
                  { id: 'vehicle', label: '🛵 وسایل نقلیه پاک' },
                  { id: 'education', label: '📚 کتب و آزمون' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setShopCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                      shopCategoryFilter === cat.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredShopProducts.map((prod) => (
                  <div 
                    key={prod.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-4 flex flex-col justify-between space-y-4 group"
                  >
                    <div>
                      {/* Image & Badge */}
                      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                        <img 
                          src={prod.image} 
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md shadow-xs">
                          {toPersianDigits(prod.discountPct)}٪ تخفیف قلک
                        </span>
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
                          {prod.categoryFa}
                        </span>
                      </div>

                      <h5 className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-2 mb-2">
                        {prod.name}
                      </h5>

                      {/* Specs */}
                      <ul className="space-y-1 mb-3 text-[11px] text-slate-500">
                        {prod.specs.slice(0, 2).map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="truncate">{s}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Price Section */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <div className="flex justify-between items-center text-[11px] text-slate-400 line-through">
                          <span>قیمت بازار:</span>
                          <span>{formatTomans(prod.originalPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-emerald-800">قیمت با قلک پرهام:</span>
                          <span className="text-sm font-black text-emerald-700">{formatTomans(prod.piggyDiscountPrice)}</span>
                        </div>
                        <div className="text-[10px] text-amber-700 font-bold text-left pt-0.5">
                          سود شما: {formatTomans(prod.originalPrice - prod.piggyDiscountPrice)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBuyModal(prod)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-2xs hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>خرید مستقیم با موجودی قلک</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: سوابق خریدهای من با قلک */}
          {piggySubTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">سفارش‌ها و خریدهای موفق از طریق قلک پرهام</h4>
                  <p className="text-xs text-slate-500 mt-0.5">رهگیری ارسال پستی، گارانتی و اسناد تسویه خرید با اندوخته قلک و اقساط پرهام‌پی</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {piggyOrders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">سفارش شماره: {ord.orderNumber}</span>
                        <h5 className="font-extrabold text-slate-900 mt-0.5">{ord.productName}</h5>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        ord.status === 'delivered' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}>
                        {ord.status === 'delivered' ? 'تحویل شده ✓' : 'در حال پردازش و ارسال 🚚'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">مبلغ کل فاکتور:</span>
                        <span className="font-black text-slate-800">{formatTomans(ord.totalAmount)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">سهم پرداختی از قلک:</span>
                        <span className="font-black text-amber-700">{formatTomans(ord.piggyPaidAmount)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">مابقی با اقساط پرهام‌پی:</span>
                        <span className="font-bold text-slate-700">
                          {ord.remainderBnplAmount > 0 ? formatTomans(ord.remainderBnplAmount) : 'تسویه ۱۰۰٪ نقدی با قلک'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">سود و تخفیف ویژه:</span>
                        <span className="font-bold text-emerald-700">+{formatTomans(ord.discountSaved)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500 border-t border-slate-100">
                      <span>شناسه رهگیری: <strong className="text-slate-800">{ord.trackingCode}</strong></span>
                      <span>تاریخ ثبت: {ord.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* SECTION 1: صندوق فلزات گران بها (طلا - نقره - مس) */}
      {(activeInvestmentTab === 'all' || activeInvestmentTab === 'metals') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-900">۱. صندوق فلزات گران‌بها (طلا - نقره - مس)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">پرتفوی فلزات گرانبها و استراتژیک با نقدشوندگی آنی و نگهداری در خزانه امن</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
              پوشش ۱۰۰٪ تورم
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {metalAssets.map((metal) => (
              <div 
                key={metal.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {metal.symbol}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
                      <ArrowUpRight className="w-4 h-4" />
                      +{toPersianDigits(metal.change24h)}٪
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">{metal.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{metal.description}</p>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">قیمت مظنه لحظه‌ای:</span>
                    <span className="text-sm font-extrabold text-slate-900">{formatTomans(metal.pricePerUnit)} <span className="text-[10px] text-slate-400 font-normal">/ {metal.unitFa}</span></span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
                    <span>بازدهی برآوردی سالیانه:</span>
                    <span className="font-extrabold text-emerald-600 text-sm">+{toPersianDigits(metal.expectedAnnualYieldPct)}٪</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAsset(metal);
                      setPurchaseAmount(5000000);
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                  >
                    <Plus className="w-4 h-4 text-amber-300" />
                    <span>خرید و تبدیل آنلاین به {metal.name.split(' ')[1]}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: صندوق سهام */}
      {(activeInvestmentTab === 'all' || activeInvestmentTab === 'stocks') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">۲. صندوق سهام ممتاز پرهام (ETF سهامی و شاخصی)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">سبد سهام بنیادی شرکت‌های سودآور با نقدشوندگی بالا و مدیریت حرفه‌ای</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
              بازدهی اهرمی
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stockAssets.map((stock) => (
              <div 
                key={stock.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {stock.symbol}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-0.5">
                      <ArrowUpRight className="w-4 h-4" />
                      +{toPersianDigits(stock.change24h)}٪
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">{stock.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{stock.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-emerald-700 font-bold block mb-1">قیمت هر واحد صدور:</span>
                      <span className="text-sm font-extrabold text-slate-900">{formatTomans(stock.pricePerUnit)}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold block mb-1">پیش‌بینی بازدهی سال:</span>
                      <span className="text-sm font-extrabold text-emerald-600">+{toPersianDigits(stock.expectedAnnualYieldPct)}٪</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedAsset(stock);
                    setPurchaseAmount(10000000);
                  }}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4 text-emerald-200" />
                  <span>صدور آنلاین واحدهای صندوق سهامی</span>
                </button>
              </div>
            ))}

            {/* Stock fund advantages */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-6 text-white shadow-2xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full mb-3 inline-block">
                  مزیت‌های انحصاری صندوق سهامی پرهام
                </span>
                <h4 className="text-sm font-bold text-white mb-2">معاف از مالیات نقل‌وانتقال و نقدشوندگی T+1</h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  مدیریت پویای تیم سرمایه‌گذاری پرهام به مدارس و خانواده‌ها اجازه می‌دهد بدون دغدغه بررسی تابلوی بورس، از رشد شرکت‌های بزرگ صنایع نفت، گاز، معادن و فناوری بهره‌مند شوند.
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-200">حداقل سرمایه‌گذاری:</span>
                <span className="text-white font-bold">از ۱۰۰,۰۰۰ تومان</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: صندوق درآمد ثابت */}
      {(activeInvestmentTab === 'all' || activeInvestmentTab === 'fixed_income') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-extrabold text-slate-900">۳. صندوق درآمد ثابت طلوع پرهام</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">سود قطعی روزشمار تا ۳۱.۵٪ سالیانه، ویژه رسوب شهریه مدارس و سرمایه‌گذاران محتاط</p>
            </div>
            <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg">
              بدون ریسک (Risk-Free)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {fixedIncomeAssets.map((fund) => (
              <div 
                key={fund.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4 md:col-span-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                      {fund.symbol}
                    </span>
                    <span className="text-xs font-extrabold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                      سود روزشمار ۳۱.۵٪ سالیانه
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 mb-1">{fund.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{fund.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2 text-xs">
                    <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                      <span className="text-[10px] text-sky-700 font-bold block mb-1">نحوه پرداخت سود:</span>
                      <span className="font-bold text-slate-900">ماهانه به حساب بانکی</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-bold block mb-1">ضمانت نقدشوندگی:</span>
                      <span className="font-bold text-emerald-700">واریز آنی ۲۴ ساعته</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-bold block mb-1">مالیات عملکرد:</span>
                      <span className="font-bold text-emerald-700">معافیت ۱۰۰٪ قانونی</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedAsset(fund);
                    setPurchaseAmount(20000000);
                  }}
                  className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4 text-sky-200" />
                  <span>سرمایه‌گذاری رسوب وجوه مدرسه در صندوق درآمد ثابت</span>
                </button>
              </div>
            ))}

            {/* Yield Estimator Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-sky-300 block mb-2">محاسبه‌گر بازدهی رسوب شهریه:</span>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  اگر مدرسه‌ای ۱۰۰ میلیون تومان از رسوب شهریه‌ها را به مدت ۳ ماه در این صندوق قرار دهد:
                </p>
                <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>اصل سرمایه رسوبی:</span>
                    <span className="font-bold text-white">{formatTomans(100000000)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300 font-bold">
                    <span>سود خالص دریافتی ۳ ماهه:</span>
                    <span>+{formatTomans(7875000)}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                پرداخت حقوق و اقساط بدون هدررفت سود روزشمار شهریه‌ها.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: نیکوکاری و مسئولیت اجتماعی */}
      {(activeInvestmentTab === 'all' || activeInvestmentTab === 'charity') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-extrabold text-slate-900">۴. نیکوکاری و مسئولیت اجتماعی پرهام</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">بورسیه تحصیلی، توزیع لوازم‌التحریر و هوشمندسازی مدارس مناطق محروم</p>
            </div>
            <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-lg">
              شفافیت ۱۰۰٪ آنلاین
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_CHARITY_PROJECTS.map((project) => {
              const progressPct = Math.min(100, Math.round((project.collectedAmount / project.targetAmount) * 100));
              return (
                <div 
                  key={project.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover" 
                    />
                    {project.isUrgent && (
                      <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                        فوری / ضروری
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      {project.region}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">{project.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div>
                        <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                          <span>مشارکت تاکنون:</span>
                          <span className="font-extrabold text-slate-900">{formatTomans(project.collectedAmount)} ({toPersianDigits(progressPct)}٪)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                          <span>هدف: {formatTomans(project.targetAmount)}</span>
                          <span>{toPersianDigits(project.donorsCount)} نیکوکار</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCharity(project);
                          setDonationAmount(200000);
                        }}
                        className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-200" />
                        <span>مشارکت و پرداخت نیکوکاری</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 5: مشاوره سرمایه‌گذاری و سواد مالی */}
      {(activeInvestmentTab === 'all' || activeInvestmentTab === 'advisory_literacy') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BookOpenCheck className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-extrabold text-slate-900">۵. مشاوره سرمایه‌گذاری و سواد مالی پرهام</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">مشاوره تخصصی مدیریت خزانه، کوچینگ مالی معلمان و آکادمی سواد مالی دانش‌آموزان</p>
            </div>
            <span className="text-xs font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-lg">
              مشاوران خبره بازار سرمایه
            </span>
          </div>

          {/* Advisory Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_ADVISORY_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 inline-block mb-3">
                    {plan.badge}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{plan.title}</h4>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500">هزینه اشتراک ({toPersianDigits(plan.durationMonths)} ماهه):</span>
                    <span className="font-extrabold text-slate-900">{formatTomans(plan.price)}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => alert(`درخواست مشاوره «${plan.title}» ثبت شد. کارشناس ارشد پرهام ظرف ۲۴ ساعت آینده جهت هماهنگی جلسه با شما تماس خواهد گرفت.`)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span>رزرو مشاوره اختصاصی</span>
                </button>
              </div>
            ))}
          </div>

          {/* Financial Courses Interactive Quiz */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">آزمون‌های تعاملی آکادمی سواد مالی</h4>
                <p className="text-xs text-slate-500 mt-0.5">سنجش هوش مالی و دریافت امتیاز اعتباری در پلتفرم پرهام</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                ۳ دوره فعال
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FINANCIAL_COURSES.map((course) => {
                const selected = selectedQuizAnswers[course.id];
                const isSubmitted = showQuizResult[course.id];
                const isCorrect = selected === course.quizQuestion.correctIndex;

                return (
                  <div key={course.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mb-1">
                        {course.targetAudience} • سطح {course.level}
                      </span>
                      <h5 className="font-bold text-slate-900 leading-snug">{course.title}</h5>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-2">
                      <span className="font-bold text-slate-700 block">سوال کوییز: {course.quizQuestion.question}</span>
                      
                      <div className="space-y-1.5 pt-1">
                        {course.quizQuestion.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedQuizAnswers(prev => ({ ...prev, [course.id]: i }));
                              setShowQuizResult(prev => ({ ...prev, [course.id]: true }));
                            }}
                            className={`w-full text-right p-2 rounded-lg text-[11px] font-medium transition-all border ${
                              isSubmitted
                                ? i === course.quizQuestion.correctIndex
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                                  : selected === i
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : 'bg-slate-50 text-slate-500 border-slate-200'
                                : selected === i
                                ? 'bg-indigo-50 text-indigo-900 border-indigo-300'
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {isSubmitted && (
                        <div className={`p-2 rounded-lg text-[11px] leading-relaxed mt-2 ${
                          isCorrect ? 'bg-emerald-100 text-emerald-900 font-bold' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {isCorrect ? 'آفرین! پاسخ کاملاً صحیح است ✓' : 'پاسخ نادرست بود.'}
                          <p className="font-normal mt-0.5">{course.quizQuestion.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SPECIAL SECTION: سبدهای هدفمند خانوادگی (لپ‌تاپ، جهیزیه، مهاجرت) */}
      {(activeInvestmentTab === 'all' || activeInvestmentTab === 'goal_funds') && (
        <div className="space-y-6 pt-4 border-t border-slate-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">سبدهای هدفمند پرهام (لپ‌تاپ، جهیزیه، مهاجرت)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">سرمایه‌گذاری طلایی متصل والدین و دانش‌آموزان به همراه پاداش تشویقی خانواده</p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
              پاداش تشویقی تا ۲۵٪
            </span>
          </div>

          {/* Goal-Based Fund Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOAL_BASED_FUNDS.map((fund) => (
              <div 
                key={fund.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                      {fund.badgeLabel}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600">
                      +{toPersianDigits(fund.expectedAnnualYieldPct)}٪ بازدهی
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 mb-1 leading-snug">{fund.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{fund.subtitle}</p>

                  <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">تارگت پیشنهادی:</span>
                      <span className="font-bold text-slate-900">{fund.targetAmountRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ترکیب سبد:</span>
                      <span className="font-bold text-amber-700">{toPersianDigits(fund.goldAllocationPct)}٪ طلا + {toPersianDigits(fund.silverAllocationPct)}٪ نقره</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>پاداش تشویقی والدین:</span>
                      <span className="font-extrabold">+{toPersianDigits(fund.parentMatchBonusPct)}٪ روی هر واریز</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenFundSimulator(fund)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-200" />
                  <span>شبیه‌ساز و افتتاح صندوق</span>
                </button>
              </div>
            ))}
          </div>

          {/* Active Family Investments List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>پرتفوی سبدهای مشترک خانواده‌های فعال در پرهام</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {familyInvestments.map((fi) => (
                <div key={fi.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-xs">{fi.familyGoalTitle}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{fi.parentName} و {fi.studentName}</div>

                  <div className="pt-2 border-t border-slate-200/60 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">پس‌انداز تجمیعی:</span>
                      <span className="font-bold text-slate-800">{formatTomans(fi.parentSavings + fi.studentSavings)}</span>
                    </div>
                    <div className="flex justify-between text-amber-700">
                      <span>موجودی طلا و نقره:</span>
                      <span className="font-bold">{toPersianDigits(fi.combinedGoldGrams)} گرم طلا + {toPersianDigits(fi.combinedSilverGrams)} گرم نقره</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ASSET PURCHASE MODAL (Gold, Silver, Copper, Stocks, Fixed Income) */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-amber-600 font-bold block">بازار دارایی‌های پرهام</span>
                <h3 className="text-base font-bold text-slate-900">سرمایه‌گذاری در {selectedAsset.name}</h3>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {assetSuccessMessage ? (
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">{assetSuccessMessage}</h4>
              </div>
            ) : (
              <form onSubmit={handleBuyAssetSubmit} className="space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">قیمت هر واحد:</span>
                    <span className="font-bold text-slate-900">{formatTomans(selectedAsset.pricePerUnit)} / {selectedAsset.unitFa}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>بازدهی پیش‌بینی سالیانه:</span>
                    <span className="font-bold">+{toPersianDigits(selectedAsset.expectedAnnualYieldPct)}٪</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">مبلغ سرمایه‌گذاری (تومان):</label>
                  <input
                    type="number"
                    required
                    min={100000}
                    step={100000}
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                  />
                  <div className="flex gap-2 mt-2">
                    {[1000000, 5000000, 10000000, 50000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setPurchaseAmount(amt)}
                        className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-semibold text-slate-700"
                      >
                        {formatTomans(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/70 flex justify-between items-center text-xs">
                  <span className="text-amber-900 font-bold">معادل دارایی دریافتی:</span>
                  <span className="font-extrabold text-amber-950">
                    {toPersianDigits((purchaseAmount / selectedAsset.pricePerUnit).toFixed(3))} {selectedAsset.unitFa}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors shadow-sm"
                  >
                    تایید و پرداخت آنلاین
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAsset(null)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CHARITY MODAL */}
      {selectedCharity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-rose-600 font-bold block">پویش نیکوکاری مدارس</span>
                <h3 className="text-base font-bold text-slate-900">{selectedCharity.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCharity(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {charitySuccess ? (
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
                <Heart className="w-10 h-10 text-rose-600 mx-auto fill-rose-600" />
                <h4 className="text-sm font-bold text-emerald-900">{charitySuccess}</h4>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-4 text-xs">
                <p className="text-slate-600 leading-relaxed">{selectedCharity.description}</p>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">مبلغ هدیه نیکوکاری (تومان):</label>
                  <input
                    type="number"
                    required
                    min={50000}
                    step={50000}
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-rose-500"
                  />
                  <div className="flex gap-2 mt-2">
                    {[100000, 200000, 500000, 1000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDonationAmount(amt)}
                        className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-semibold text-slate-700"
                      >
                        {formatTomans(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>پرداخت نیت نیکوکاری</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCharity(null)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* GOAL-BASED FUND SIMULATOR MODAL */}
      {simulatingFund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-indigo-600 font-bold block mb-1">شبیه‌ساز و افتتاح سبد هدفمند</span>
                <h3 className="text-base font-bold text-slate-900">{simulatingFund.title}</h3>
              </div>
              <button
                onClick={() => setSimulatingFund(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {fundJoinedSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">صندوق هدفمند با موفقیت فعال شد!</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">{fundJoinedSuccess}</p>
              </div>
            ) : (
              <div className="space-y-5 text-xs">
                
                {/* Monthly Deposit Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-bold text-slate-700">مبلغ واریز ماهانه شما:</label>
                    <span className="text-sm font-extrabold text-indigo-950">{formatTomans(simMonthlyDeposit)}</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={20000000}
                    step={500000}
                    value={simMonthlyDeposit}
                    onChange={(e) => setSimMonthlyDeposit(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                {/* Horizon Selector */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">مدت زمان سرمایه‌گذاری (افق هدف):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[12, 24, 36].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSimMonths(m)}
                        className={`py-2 rounded-xl font-bold border transition-all ${
                          simMonths === m
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {toPersianDigits(m)} ماهه
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulation Live Calculations */}
                <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200/70 space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>کل پس‌انداز واریزی شما:</span>
                    <span className="font-bold text-slate-900">{formatTomans(simMonthlyDeposit * simMonths)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>پاداش هم‌افزایی والدین ({toPersianDigits(simulatingFund.parentMatchBonusPct)}٪):</span>
                    <span className="font-extrabold">+{formatTomans(Math.round((simMonthlyDeposit * simMonths * simulatingFund.parentMatchBonusPct) / 100))}</span>
                  </div>
                  <div className="flex justify-between text-indigo-950 font-bold border-t border-indigo-200/80 pt-2">
                    <span>ارزش تخمینی دارایی در سررسید:</span>
                    <span className="text-sm font-black text-indigo-900">
                      {formatTomans(Math.round((simMonthlyDeposit * simMonths) * (1 + (simulatingFund.parentMatchBonusPct / 100)) * (1 + (simulatingFund.expectedAnnualYieldPct / 100) * (simMonths / 12))))}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleJoinSimulatedFund}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors shadow-sm"
                  >
                    تایید و ایجاد صندوق هدفمند
                  </button>
                  <button
                    onClick={() => setSimulatingFund(null)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: تعریف هدف جدید در قلک پرهام */}
      {/* ======================================================== */}
      {newGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-amber-600 font-bold block mb-1">قلک پرهام</span>
                <h3 className="text-base font-bold text-slate-900">تعریف و راه‌اندازی هدف جدید پس‌انداز</h3>
              </div>
              <button
                onClick={() => setNewGoalModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {newGoalSuccessMessage ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">{newGoalSuccessMessage}</h4>
                <p className="text-xs text-emerald-700">هدف با موفقیت ذخیره شد و در لیست قلک‌های پرهام در دسترس است.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateNewGoal} className="space-y-4 text-xs">
                
                {/* Student / Target Person */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام دارنده قلک (دانش‌آموز یا فرزند):</label>
                  <input
                    type="text"
                    required
                    value={newGoalStudentName}
                    onChange={(e) => setNewGoalStudentName(e.target.value)}
                    placeholder="مثال: امیرحسین پارسا (پایه هشتم)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                {/* Target Category Preset */}
                <div>
                  <label className="block font-bold text-slate-700 mb-2">دسته‌بندی هدف:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'laptop', label: 'لپ‌تاپ و دیجیتال', icon: '💻', defaultTitle: 'خرید لپ‌تاپ برنامه‌نویسی و مهندسی', defaultAmt: 60000000 },
                      { key: 'dowry', label: 'جهیزیه و آینده', icon: '💍', defaultTitle: 'پس‌انداز طلایی جهیزیه و شروع زندگی', defaultAmt: 150000000 },
                      { key: 'migration', label: 'مهاجرت و زبان', icon: '✈️', defaultTitle: 'مهاجرت تحصیلی و آمادگی آیلتس', defaultAmt: 80000000 },
                      { key: 'tablet', label: 'تبلت و طراحی', icon: '📱', defaultTitle: 'تبلت قلم‌دار ویژه طراحی و یادگیری', defaultAmt: 30000000 },
                      { key: 'vehicle', label: 'وسیله نقلیه پاک', icon: '🛵', defaultTitle: 'دوچرخه شهری یا موتور برقی', defaultAmt: 45000000 },
                      { key: 'custom', label: 'هدف سفارشی', icon: '🎯', defaultTitle: 'هدف پس‌انداز اختصاصی من', defaultAmt: 40000000 }
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          setNewGoalTargetKey(item.key as any);
                          setNewGoalTitle(item.defaultTitle);
                          setNewGoalTargetAmount(item.defaultAmt);
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                          newGoalTargetKey === item.key
                            ? 'bg-amber-50 border-amber-400 text-amber-950 font-black shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-[11px] leading-tight">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal Title */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">عنوان دقیق هدف:</label>
                  <input
                    type="text"
                    required
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="مثال: خرید لپ‌تاپ ایسوس TUF با گرافیک RTX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                {/* Target Amount */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-700">مبلغ نهایی هدف (تومان):</label>
                    <span className="text-amber-800 font-extrabold">{formatTomans(newGoalTargetAmount)}</span>
                  </div>
                  <input
                    type="number"
                    required
                    min={5000000}
                    step={1000000}
                    value={newGoalTargetAmount}
                    onChange={(e) => setNewGoalTargetAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                  />
                  <div className="flex gap-1.5 mt-2">
                    {[30000000, 60000000, 100000000, 200000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setNewGoalTargetAmount(amt)}
                        className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-600"
                      >
                        {formatTomans(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">مدت زمان پس‌انداز (افق هدف):</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[6, 12, 24, 36].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setNewGoalDurationMonths(m)}
                        className={`py-2 rounded-xl text-center font-bold border transition-all ${
                          newGoalDurationMonths === m
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {toPersianDigits(m)} ماهه
                      </button>
                    ))}
                  </div>
                </div>

                {/* Asset Allocation */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">سبد ذخیره دارایی ضدتورمی در قلک:</label>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    {[
                      { id: 'combined', label: 'ترکیبی (طلا + نقره)', desc: 'بیشترین سود ضدتورمی' },
                      { id: 'gold', label: 'طلای ۱۸ عیار ۱۰۰٪', desc: 'حفظ ارزش ریالی' },
                      { id: 'silver', label: 'نقره ساچمه ۹۹۹', desc: 'پتانسیل رشد صنعتی' }
                    ].map((alloc) => (
                      <button
                        key={alloc.id}
                        type="button"
                        onClick={() => setNewGoalAllocation(alloc.id as any)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          newGoalAllocation === alloc.id
                            ? 'bg-amber-100/70 border-amber-400 text-amber-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="block font-bold">{alloc.label}</span>
                        <span className="text-[9px] text-slate-400">{alloc.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Initial Deposit */}
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-700">واریز اولیه به قلک برای شروع:</span>
                    <span className="font-black text-amber-900">{formatTomans(newGoalInitialDeposit)}</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={20000000}
                    step={500000}
                    value={newGoalInitialDeposit}
                    onChange={(e) => setNewGoalInitialDeposit(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>طلای معادل خریداری شده:</span>
                    <span className="font-bold text-amber-900">{toPersianDigits(((newGoalInitialDeposit * 0.6) / goldPrice).toFixed(3))} گرم طلا</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black transition-colors shadow-sm"
                  >
                    تایید و ایجاد هدف در قلک پرهام
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGoalModalOpen(false)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                  >
                    انصراف
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: خرید مستقیم کالا با موجودی قلک پرهام */}
      {/* ======================================================== */}
      {selectedProductForBuy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-emerald-600 font-bold block mb-1">تسویه و خرید با قلک پرهام</span>
                <h3 className="text-base font-bold text-slate-900">{selectedProductForBuy.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProductForBuy(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {buySuccessOrder ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <div>
                  <h4 className="text-base font-black text-emerald-950">سفارش خرید با موفقیت ثبت شد!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    کالای انتخابی شما با موفقیت از محل اندوخته قلک پرهام تسویه گردید.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2 text-xs text-right">
                  <div className="flex justify-between">
                    <span className="text-slate-500">شماره سفارش:</span>
                    <span className="font-black text-slate-900">{buySuccessOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">مبلغ کسر شده از قلک:</span>
                    <span className="font-bold text-amber-700">{formatTomans(buySuccessOrder.piggyPaidAmount)}</span>
                  </div>
                  {buySuccessOrder.remainderBnplAmount > 0 && (
                    <div className="flex justify-between text-sky-700 font-bold">
                      <span>مابقی اقساط پرهام‌پی:</span>
                      <span>{formatTomans(buySuccessOrder.remainderBnplAmount)} (در {toPersianDigits(bnplInstallments)} قسط)</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>سود تخفیف قلک پرهام:</span>
                    <span>+{formatTomans(buySuccessOrder.discountSaved)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="text-slate-500">کد رهگیری ارسال پستی:</span>
                    <span className="font-bold text-slate-800">{buySuccessOrder.trackingCode}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProductForBuy(null)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  بستن و بازگشت به داشبورد
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmPiggyPurchase} className="space-y-4 text-xs">
                
                {/* Product Summary Card */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500 font-bold">قیمت رسمی در بازار:</span>
                    <span className="text-slate-400 line-through font-bold">{formatTomans(selectedProductForBuy.originalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-start text-emerald-800 font-bold">
                    <span>تخفیف ویژه قلک پرهام ({toPersianDigits(selectedProductForBuy.discountPct)}٪):</span>
                    <span className="text-emerald-700">-{formatTomans(selectedProductForBuy.originalPrice - selectedProductForBuy.piggyDiscountPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-slate-900 font-extrabold text-sm">
                    <span>مبلغ خالص فاکتور خرید:</span>
                    <span className="text-emerald-700 font-black">{formatTomans(selectedProductForBuy.piggyDiscountPrice)}</span>
                  </div>
                </div>

                {/* Choose Which Piggy Bank to Pay From */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">انتخاب قلک پرهام برای پرداخت:</label>
                  <select
                    value={selectedGoalForBuy}
                    onChange={(e) => setSelectedGoalForBuy(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="all">تجمیع کل قلک‌های پرهام (موجودی در دسترس: {formatTomans(totalSavingsAllPiggy)})</option>
                    {piggyGoals.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.avatar} {g.goalTitle} (موجودی: {formatTomans(g.currentSavings)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Available Balance Comparison & BNPL Option */}
                {(() => {
                  const available = selectedGoalForBuy === 'all'
                    ? totalSavingsAllPiggy
                    : (piggyGoals.find(g => g.id === selectedGoalForBuy)?.currentSavings || 0);
                  const price = selectedProductForBuy.piggyDiscountPrice;
                  const isEnough = available >= price;
                  const shortage = Math.max(0, price - available);

                  return (
                    <div className="space-y-3">
                      {isEnough ? (
                        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-1">
                          <div className="flex items-center gap-1.5 font-black text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>موجودی قلک شما برای تسویه ۱۰۰٪ این کالا کافی است!</span>
                          </div>
                          <p className="text-[11px] text-emerald-700">
                            کل مبلغ کالا ({formatTomans(price)}) از اندوخته قلک شما کسر خواهد شد و هیچ وجه نقدی نیاز نیست.
                          </p>
                        </div>
                      ) : (
                        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-slate-800">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-700">موجودی کسر شونده از قلک:</span>
                            <span className="font-black text-amber-800">{formatTomans(available)}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-1 border-t border-amber-200/60">
                            <span className="font-bold text-rose-700">مابقی کسری وجه کالا:</span>
                            <span className="font-black text-rose-800">{formatTomans(shortage)}</span>
                          </div>

                          <div className="pt-2">
                            <span className="block font-bold text-indigo-900 text-xs mb-1.5">
                              ✨ تبدیل مابقی کسری ({formatTomans(shortage)}) به اقساط پرهام‌پی (BNPL):
                            </span>
                            <div className="grid grid-cols-3 gap-2">
                              {[3, 6, 12].map((inst) => (
                                <button
                                  key={inst}
                                  type="button"
                                  onClick={() => setBnplInstallments(inst)}
                                  className={`p-2 rounded-xl border text-center transition-all ${
                                    bnplInstallments === inst
                                      ? 'bg-slate-900 text-white border-slate-900 font-black'
                                      : 'bg-white text-slate-700 border-slate-200'
                                  }`}
                                >
                                  <span className="block font-bold text-xs">{toPersianDigits(inst)} قسطه</span>
                                  <span className="text-[10px] block opacity-80">
                                    ماهی {formatTomans(Math.round((shortage * 1.1) / inst))}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Delivery Information */}
                <div className="space-y-3 pt-2">
                  <span className="block font-bold text-slate-800">مشخصات ارسال و تحویل کالا:</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">نام تحویل‌گیرنده:</label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">شماره تماس اضطراری:</label>
                      <input
                        type="text"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">آدرس کامل تحویل کالا (پستی):</label>
                    <textarea
                      required
                      rows={2}
                      value={buyerAddress}
                      onChange={(e) => setBuyerAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={buySubmitting}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {buySubmitting ? (
                      <span>در حال ثبت سفارش و تسویه با قلک...</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>تایید نهایی و ثبت سفارش خرید کالا</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProductForBuy(null)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                  >
                    انصراف
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
