export type UserRole = 'school' | 'teacher' | 'parent' | 'student';

export interface UserProfile {
  isLoggedIn: boolean;
  name: string;
  phone: string;
  role: UserRole;
  schoolName?: string;
  nationalCode?: string;
}

export type MainTab = 
  | 'home'
  | 'overview' 
  | 'loans' 
  | 'digital_accounting' 
  | 'parham_pay' 
  | 'insurance' 
  | 'investments';

export interface LoanProduct {
  id: string;
  title: string;
  targetRole: UserRole[];
  badge: string;
  maxAmount: number; // in Tomans
  interestRate: number; // percentage (e.g. 23%)
  feeRate?: number; // percentage fee (e.g. 5%)
  maxMonths: number;
  description: string;
  features: string[];
  iconName: string;
}

export interface EarlyWageRequest {
  id?: string;
  teacherName: string;
  teacherRole?: string;
  monthlySalary: number; // e.g. 25,000,000
  requestedAdvance: number; // e.g. 15,000,000
  workedDays: number; // 18 days
  feeRate: number; // 2.5%
  netPayout: number;
  deductionDate: string;
  status: 'pending' | 'approved' | 'transferred' | 'rejected';
}

export interface PayrollRecord {
  id: string;
  teacherName: string;
  role: string;
  iban: string;
  baseSalary: number;
  insuranceDeduction: number; // حق بیمه سهم کارمند و کارفرما
  taxDeduction: number; // مالیات حقوق
  advanceDeduction: number; // کسر مساعده
  netPay: number;
  status: 'pending' | 'approved' | 'paid';
}

export interface SmartAccountingTransaction {
  id: string;
  date: string;
  title: string;
  category: 'tuition' | 'payroll' | 'equipment' | 'catering' | 'printing' | 'tax_insurance' | 'facility';
  type: 'income' | 'expense';
  amount: number;
  status: 'settled' | 'pending' | 'overdue';
  description: string;
}

export interface ParhamPayProduct {
  id: string;
  name: string;
  category: 
    | 'books_exams' 
    | 'uniform' 
    | 'catering' 
    | 'printing' 
    | 'tutoring_institutes' 
    | 'stationery_paper' 
    | 'school_equipment';
  categoryFa: string;
  price: number; // in Tomans
  installmentsCount: number; // 3, 6, 10, 12
  monthlyInstallment: number;
  provider: string;
  rating: number;
  image: string;
  description: string;
  isSchoolGroupPlan?: boolean;
  schoolDiscountPct?: number;
}

export interface InsurancePlan {
  id: string;
  title: string;
  category: 'retirement' | 'supplementary' | 'student_accident' | 'school_accident';
  categoryFa: string;
  planTier: 'school' | 'teacher' | 'student' | 'family';
  targetGroup: string;
  monthlyPremium: number; // in Tomans
  hospitalizationCoverage: string;
  dentalCoverage?: string;
  accidentCoverage: string;
  highlight: string;
  features: string[];
  schoolManagerBonus?: string;
  groupDiscountPct?: number;
}

export interface InvestmentAsset {
  id: string;
  name: string;
  symbol: string;
  pricePerUnit: number;
  unitFa: string;
  change24h: number;
  historicalChart: number[];
  category: 'gold' | 'silver' | 'copper' | 'stocks' | 'fixed_income';
  description: string;
  expectedAnnualYieldPct: number;
}

export interface CharityProject {
  id: string;
  title: string;
  targetAmount: number;
  collectedAmount: number;
  donorsCount: number;
  region: string;
  category: 'scholarship' | 'renovation' | 'stationery_aid' | 'tech_aid';
  image: string;
  description: string;
  isUrgent?: boolean;
}

export interface GoalBasedFund {
  id: string;
  targetKey: 'laptop' | 'dowry' | 'migration';
  title: string;
  subtitle: string;
  targetAmountRange: string;
  defaultTargetAmount: number;
  recommendedHorizonMonths: number;
  goldAllocationPct: number;
  silverAllocationPct: number;
  parentMatchBonusPct: number;
  expectedAnnualYieldPct: number;
  iconName: string;
  badgeLabel: string;
  description: string;
  features: string[];
}

export interface LinkedFamilyInvestment {
  id: string;
  targetKey?: 'laptop' | 'dowry' | 'migration';
  parentName: string;
  studentName: string;
  familyGoalTitle: string;
  parentSavings: number;
  studentSavings: number;
  parentMatchBonusPct: number;
  combinedGoldGrams: number;
  combinedSilverGrams: number;
  totalYieldEstimatedPct: number;
}

export interface AdvisorySubscription {
  id: string;
  title: string;
  targetRole: 'school' | 'teacher' | 'parent';
  durationMonths: number;
  price: number;
  monthlyEquivalent: number;
  features: string[];
  badge: string;
}

export interface PiggyBankGoal {
  id: string;
  targetKey?: 'laptop' | 'dowry' | 'migration' | 'tablet' | 'vehicle' | 'custom';
  studentName: string;
  goalTitle: string;
  category?: string;
  targetAmount: number;
  currentSavings: number;
  goldWeightGrams: number;
  silverWeightGrams: number;
  assetAllocation?: 'gold' | 'silver' | 'combined';
  parentMatchBonusPct: number;
  avatar: string;
  durationMonths?: number;
  createdAt?: string;
}

export interface PiggyShopProduct {
  id: string;
  name: string;
  targetKey: 'laptop' | 'dowry' | 'migration' | 'tablet' | 'vehicle' | 'education';
  categoryFa: string;
  originalPrice: number;
  piggyDiscountPrice: number;
  discountPct: number;
  rating: number;
  warranty: string;
  specs: string[];
  image: string;
  inStock: boolean;
  description: string;
}

export interface PiggyPurchaseOrder {
  id: string;
  orderNumber: string;
  date: string;
  productName: string;
  productCategory: string;
  totalAmount: number;
  piggyPaidAmount: number;
  remainderBnplAmount: number;
  discountSaved: number;
  status: 'confirmed' | 'shipping' | 'delivered';
  trackingCode: string;
}

export interface FinancialCourse {
  id: string;
  title: string;
  targetAudience: string;
  level: 'مقدماتی' | 'متوسط' | 'پیشرفته';
  duration: string;
  lessonsCount: number;
  description: string;
  keyTakeaways: string[];
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface MarketRates {
  gold18kPerGram: number;
  goldChange24h: string;
  silverPerGram: number;
  silverChange24h: string;
  fixedIncomeFundAnnualYield: string;
  parhamPayDefaultCreditLimit: number;
  teacherAdvanceMaxPct: number;
  wageAdvanceFeePct: number;
}

export interface StudentAdmission {
  id: string;
  studentName: string;
  grade: string;
  nationalCode: string;
  parentName: string;
  parentPhone: string;
  totalTuition: number;
  paidTuition: number;
  remainingTuition: number;
  paymentPlan: 'cash' | 'installments_parham' | 'cheque';
  status: 'settled' | 'active' | 'overdue';
  registrationDate: string;
}

export interface SchoolOperatingExpense {
  id: string;
  title: string;
  category: 'utilities' | 'equipment' | 'maintenance' | 'catering' | 'consumables' | 'transport' | 'other';
  categoryFa: string;
  amount: number;
  date: string;
  invoiceNumber: string;
  paidTo: string;
  status: 'paid' | 'pending';
  receiptAttached: boolean;
}

export interface JournalEntry {
  id: string;
  docNumber: number;
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  debitAmount: number;
  creditAmount: number;
  status: 'permanent' | 'temporary';
  registrar: string;
}

export interface SchoolRepresentative {
  fullName: string;
  role: string;
  nationalCode: string;
  phone: string;
  schoolName: string;
  schoolCode: string;
  authorizationLetterTitle: string;
  authorizationIssueDate: string;
  authorizationExpiryDate: string;
  status: 'verified' | 'pending' | 'review';
  verifiedAt: string;
  level: string;
}

export interface PayrollUploadBatch {
  fileName: string;
  uploadDate: string;
  fileSize: string;
  recordsCount: number;
  totalGrossSalary: number;
  totalInsurance: number;
  totalNetPay: number;
  accountingApproved: boolean;
  founderSmsSent: boolean;
  founderSmsCode: string;
  founderApproved: boolean;
  founderPhone: string;
  founderName: string;
}

