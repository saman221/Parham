import { 
  StudentAdmission, 
  SchoolOperatingExpense, 
  JournalEntry, 
  SchoolRepresentative, 
  PayrollUploadBatch 
} from '../types';

export const INITIAL_PAYROLL_BATCH: PayrollUploadBatch = {
  fileName: 'payroll_aban_1403_allameh.xlsx',
  uploadDate: '۱۴۰۳/۰۸/۲۴ - ساعت ۱۰:۳۰',
  fileSize: '۴۲۸ کیلوبایت (فرمت استاندارد شتاب/پایا)',
  recordsCount: 6,
  totalGrossSalary: 162000000,
  totalInsurance: 11340000,
  totalNetPay: 113070000,
  accountingApproved: false,
  founderSmsSent: false,
  founderSmsCode: '۸۴۹۲',
  founderApproved: false,
  founderPhone: '۰۹۱۲۳۴۵۶۷۸۹',
  founderName: 'جناب آقای دکتر محمد صادقی (موسس و مدیر مجتمع علامه)'
};

export const INITIAL_STUDENT_ADMISSIONS: StudentAdmission[] = [
  {
    id: 'std-101',
    studentName: 'امیرعلی صادقی',
    grade: 'پایه دهم تجربی',
    nationalCode: '۰۰۲۱۴۵۶۷۸۱',
    parentName: 'دکتر محسن صادقی',
    parentPhone: '۰۹۱۲۱۱۱۴۵۸۲',
    totalTuition: 45000000,
    paidTuition: 45000000,
    remainingTuition: 0,
    paymentPlan: 'cash',
    status: 'settled',
    registrationDate: '۱۴۰۳/۰۴/۱۵'
  },
  {
    id: 'std-102',
    studentName: 'سارینا محمدی',
    grade: 'پایه یازدهم ریاضی و فیزیک',
    nationalCode: '۰۰۳۲۹۱۸۴۷۲',
    parentName: 'مهندس کامران محمدی',
    parentPhone: '۰۹۱۲۳۴۵۸۷۲۱',
    totalTuition: 48000000,
    paidTuition: 32000000,
    remainingTuition: 16000000,
    paymentPlan: 'installments_parham',
    status: 'active',
    registrationDate: '۱۴۰۳/۰۴/۲۰'
  },
  {
    id: 'std-103',
    studentName: 'پارسا کریمی',
    grade: 'پایه دوازدهم علوم انسانی',
    nationalCode: '۰۰۱۸۳۹۲۷۴۸',
    parentName: 'حاج احمد کریمی',
    parentPhone: '۰۹۱۲۸۹۷۲۳۴۱',
    totalTuition: 52000000,
    paidTuition: 26000000,
    remainingTuition: 26000000,
    paymentPlan: 'cheque',
    status: 'overdue',
    registrationDate: '۱۴۰۳/۰۴/۲۲'
  },
  {
    id: 'std-104',
    studentName: 'رکسانا علیزاده',
    grade: 'پایه هفتم دوره اول',
    nationalCode: '۰۰۴۸۱۷۲۹۳۸',
    parentName: 'سرکار خانم دکتر بهرامی',
    parentPhone: '۰۹۱۹۴۷۲۸۱۹۲',
    totalTuition: 38000000,
    paidTuition: 38000000,
    remainingTuition: 0,
    paymentPlan: 'cash',
    status: 'settled',
    registrationDate: '۱۴۰۳/۰۵/۰۲'
  },
  {
    id: 'std-105',
    studentName: 'کیان خسروی',
    grade: 'پایه نهم دوره اول',
    nationalCode: '۰۰۳۷۲۸۱۹۴۷',
    parentName: 'مهندس سعید خسروی',
    parentPhone: '۰۹۱۲۴۷۲۸۳۹۱',
    totalTuition: 40000000,
    paidTuition: 20000000,
    remainingTuition: 20000000,
    paymentPlan: 'installments_parham',
    status: 'active',
    registrationDate: '۱۴۰۳/۰۵/۱۰'
  }
];

export const INITIAL_OPERATING_EXPENSES: SchoolOperatingExpense[] = [
  {
    id: 'exp-201',
    title: 'قبض گاز و برق موتورخانه و سیستم گرمایشی مدرسه',
    category: 'utilities',
    categoryFa: 'قبوض و انرژی',
    amount: 14800000,
    date: '۱۴۰۳/۰۸/۲۲',
    invoiceNumber: 'INV-48291',
    paidTo: 'شرکت توزیع گاز و برق منطقه',
    status: 'paid',
    receiptAttached: true
  },
  {
    id: 'exp-202',
    title: 'تجهیزات مصرفی آزمایشگاه شیمی، فیزیک و کیت‌های هوش مصنوعی',
    category: 'equipment',
    categoryFa: 'تجهیزات و آزمایشگاه',
    amount: 32500000,
    date: '۱۴۰۳/۰۸/۲۰',
    invoiceNumber: 'INV-90281',
    paidTo: 'شرکت فناوران پویا آزما',
    status: 'paid',
    receiptAttached: true
  },
  {
    id: 'exp-203',
    title: 'سرویس دوره‌ای آسانسور و تجهیزات اطفای حریق',
    category: 'maintenance',
    categoryFa: 'تعمیر و نگهداری',
    amount: 8500000,
    date: '۱۴۰۳/۰۸/۱۸',
    invoiceNumber: 'INV-37482',
    paidTo: 'فنی مهندسی ایمن‌سازان البرز',
    status: 'paid',
    receiptAttached: true
  },
  {
    id: 'exp-204',
    title: 'تغذیه میان‌وعده سالم بوفه و پذیرایی جلسات شورای دبیران',
    category: 'catering',
    categoryFa: 'پذیرایی و کترینگ',
    amount: 9200000,
    date: '۱۴۰۳/۰۸/۱۵',
    invoiceNumber: 'INV-19482',
    paidTo: 'کترینگ مهرگان',
    status: 'paid',
    receiptAttached: true
  },
  {
    id: 'exp-205',
    title: 'شارژ اشتراک اینترنت فیبر نوری اختصاصی و سامانه LMS مدرسه',
    category: 'consumables',
    categoryFa: 'ارتباطات و نرم‌افزار',
    amount: 6400000,
    date: '۱۴۰۳/۰۸/۱۰',
    invoiceNumber: 'INV-67192',
    paidTo: 'ارتباطات زیرساخت شاتل',
    status: 'paid',
    receiptAttached: true
  }
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'jrn-301',
    docNumber: 1042,
    date: '۱۴۰۳/۰۸/۲۴',
    description: 'وصول شهریه دانش‌آموزان از طریق درگاه پرداخت اختصاصی پرهام',
    debitAccount: 'بانک ملت - حساب جاری متمرکز مدرسه (کد ۱۱۰۱)',
    creditAccount: 'پیش‌دریافت شهریه دانش‌آموزان (کد ۴۱۰۱)',
    debitAmount: 142000000,
    creditAmount: 142000000,
    status: 'permanent',
    registrar: 'مریم سعادتی (حسابدار ارشد)'
  },
  {
    id: 'jrn-302',
    docNumber: 1043,
    date: '۱۴۰۳/۰۸/۲۲',
    description: 'پرداخت فاکتور شرکت توزیع گاز و مصارف انرژی موتورخانه',
    debitAccount: 'هزینه‌های انرژی و آب و برق (کد ۵۲۰۴)',
    creditAccount: 'بانک ملت - حساب جاری متمرکز مدرسه (کد ۱۱۰۱)',
    debitAmount: 14800000,
    creditAmount: 14800000,
    status: 'permanent',
    registrar: 'مریم سعادتی (حسابدار ارشد)'
  },
  {
    id: 'jrn-303',
    docNumber: 1044,
    date: '۱۴۰۳/۰۸/۲۰',
    description: 'تامین تجهیزات تخصصی آزمایشگاه هوش مصنوعی و رباتیک',
    debitAccount: 'دارایی‌های ثابت - تجهیزات آموزشی و آزمایشگاهی (کد ۱۲۰۵)',
    creditAccount: 'اسناد پرداختنی و تسهیلات نوسازی پرهام (کد ۴۲۰۲)',
    debitAmount: 32500000,
    creditAmount: 32500000,
    status: 'permanent',
    registrar: 'مریم سعادتی (حسابدار ارشد)'
  },
  {
    id: 'jrn-304',
    docNumber: 1045,
    date: '۱۴۰۳/۰۸/۱۸',
    description: 'ثبت سند ذخیره حق بیمه تامین اجتماعی پرسنل ماه جاری (سهم کارفرما ۲۳٪ و پرسنل ۷٪)',
    debitAccount: 'هزینه حقوق و مزایای کادر آموزشی (کد ۵۱۰۱)',
    creditAccount: 'بیمه تامین اجتماعی پرداختنی (کد ۴۱۰۶)',
    debitAmount: 27800000,
    creditAmount: 27800000,
    status: 'permanent',
    registrar: 'مریم سعادتی (حسابدار ارشد)'
  }
];

export const INITIAL_REPRESENTATIVE: SchoolRepresentative = {
  fullName: 'سرکار خانم مریم سعادتی',
  role: 'معاون مالی و حسابدار رسمی مجتمع آموزشی',
  nationalCode: '۰۰۸۳۹۲۱۴۸۲',
  phone: '۰۹۱۲۸۴۷۵۶۲۹',
  schoolName: 'مجتمع آموزشی هوشمند علامه (پسرانه دوره اول و دوم)',
  schoolCode: '۹۵۰۴۸۲۱۷',
  authorizationLetterTitle: 'معرفی‌نامه رسمی نماینده تام‌الاختیار امور مالی و بانکی',
  authorizationIssueDate: '۱۴۰۳/۰۱/۱۵',
  authorizationExpiryDate: '۱۴۰۴/۰۱/۱۵',
  status: 'verified',
  verifiedAt: '۱۴۰۳/۰۱/۱۸ - توسط مدیریت ریسک و اعتبارات پرهام',
  level: 'سطح ۳ حقوقی (امضای مجاز برداشت و حواله پایا تا سقف روزانه ۵۰۰ میلیون تومان)'
};
