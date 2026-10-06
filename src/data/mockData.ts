import { 
  LoanProduct, 
  ParhamPayProduct, 
  InsurancePlan, 
  InvestmentAsset, 
  PiggyBankGoal, 
  FinancialCourse,
  EarlyWageRequest,
  PayrollRecord,
  SmartAccountingTransaction,
  LinkedFamilyInvestment,
  AdvisorySubscription,
  GoalBasedFund,
  CharityProject,
  PiggyShopProduct,
  PiggyPurchaseOrder
} from '../types';

// ==========================================
// بخش اول : وام و تسهیلات
// ۱. وام پرداخت شهریه
// ۲. وام ویژه مدارس
// ۳. وام معلمان و کادر اداری و خدمات مساعده
// ==========================================

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'tuition-loan',
    title: 'وام پرداخت شهریه تحصیلی',
    targetRole: ['parent', 'school'],
    badge: 'سود ۲۳٪ + ۵٪ کارمزد اعتباری',
    maxAmount: 500000000, // 500 million tomans
    interestRate: 23,
    feeRate: 5,
    maxMonths: 24,
    description: 'تسهیلات ویژه والدین جهت پرداخت یکجا و تسویه کامل شهریه مدرسه با بازپرداخت ۱۰ تا ۲۴ ماهه، بدون نیاز به ضامن رسمی و تسویه مستقیم با حساب مدرسه.',
    features: [
      'واریز مستقیم و یکجای کل شهریه به حساب مدرسه جهت بهبود نقدینگی آموزشی',
      'بازپرداخت با اقساط ماهانه منظم متناسب با درآمد اولیا (۱۰ تا ۲۴ ماه)',
      'سود مصوب بانکی ۲۳٪ سالیانه با کارمزد خدمات اعتباری ۵٪',
      'اعتبارسنجی آنلاین و هوشمند در کمتر از ۱۰ دقیقه بدون چک و سفته ضامن',
      'پوشش شهریه پایه، سرویس ترابری، فوق‌برنامه‌ها و ناهار دانش‌آموز'
    ],
    iconName: 'GraduationCap'
  },
  {
    id: 'school-equipment',
    title: 'وام ویژه مدارس (تجهیزات، نوسازی، ودیعه اجاره)',
    targetRole: ['school'],
    badge: 'سقف ۲ میلیارد تومان | بازپرداخت ۳ ساله (۳۶ ماهه)',
    maxAmount: 2000000000, // 2 billion tomans
    interestRate: 23,
    feeRate: 5,
    maxMonths: 36,
    description: 'تسهیلات کلان ویژه موسسان و مدیران مدارس جهت خرید تجهیزات هوشمند آموزشی، بهسازی ابنیه و تامین ودیعه اجاره ساختمان مدرسه با بازپرداخت ۳ ساله.',
    features: [
      'سقف اعتبار تا ۲,۰۰۰,۰۰۰,۰۰۰ تومان با بازپرداخت ۳۶ ماهه منعطف',
      'پوشش کامل هزینه‌های هوشمندسازی، آزمایشگاه و اتاق سرور مدرسه',
      'تامین مالی ودیعه اجاره، رهن ساختمان آموزشی و توسعه فضای فیزیکی',
      'دوره تنفس ۳ ماهه بازپرداخت تا زمان سررسید وصول شهریه‌های اولیا',
      'ضمانت آسان با پروانه تاسیس مدرسه و جریان رسوب حساب شهریه'
    ],
    iconName: 'Building2'
  },
  {
    id: 'teacher-welfare',
    title: 'وام معلمان و کادر اداری و خدمات مساعده فوری',
    targetRole: ['teacher', 'school'],
    badge: 'تسهیلات کادر + مساعده حقوق آنی',
    maxAmount: 400000000, // 400 million tomans
    interestRate: 23,
    feeRate: 5,
    maxMonths: 24,
    description: 'بسته جامع اعتباری فرهنگیان شامل تسهیلات رفاهی با کسر از حقوق تا ۴۰۰ میلیون تومان به همراه سامانه درخواست مساعده فوری و پرداخت زودهنگام حقوق.',
    features: [
      'بدون نیاز به چک صیادی یا ضامن کارمند (تضمین از طریق کسر از حقوق مدرسه)',
      'سرویس مساعده فوری (برداشت تا ۸۵٪ حقوق کارکرده ماه پیش از سررسید)',
      'واریز ۳۰ دقیقه‌ای مساعده به شبای بانکی با کارمزد بسیار ناچیز ۲.۵٪',
      'تسهیلات رفاهی بلندمدت با بازپرداخت ۱۲ الی ۲۴ ماهه برای مصارف ضروری',
      'امکان تمدید سالیانه و افزایش سقف بر اساس خوش‌حسابی'
    ],
    iconName: 'UserCheck'
  }
];

export const MOCK_PENDING_WAGE_REQUESTS: EarlyWageRequest[] = [
  {
    id: 'ewr-1',
    teacherName: 'استاد محمد بهرامی',
    teacherRole: 'دبیر فیزیک پایه دوازدهم',
    monthlySalary: 28000000,
    requestedAdvance: 14000000,
    workedDays: 19,
    feeRate: 2.5,
    netPayout: 13650000,
    deductionDate: '۱۴۰۳/۰۸/۳۰',
    status: 'pending'
  },
  {
    id: 'ewr-2',
    teacherName: 'سرکار خانم دکتر صادقی',
    teacherRole: 'مشاور و راهنمای تحصیلی کنکور',
    monthlySalary: 24000000,
    requestedAdvance: 10000000,
    workedDays: 16,
    feeRate: 2.5,
    netPayout: 9750000,
    deductionDate: '۱۴۰۳/۰۸/۳۰',
    status: 'pending'
  },
  {
    id: 'ewr-3',
    teacherName: 'مهندس علیرضا رضایی',
    teacherRole: 'مربی آزمایشگاه و رباتیک',
    monthlySalary: 20000000,
    requestedAdvance: 8000000,
    workedDays: 15,
    feeRate: 2.5,
    netPayout: 7800000,
    deductionDate: '۱۴۰۳/۰۸/۳۰',
    status: 'approved'
  }
];

// ==========================================
// بخش دوم : حسابداری دیجیتال
// ۱. انجام خدمات پرداخت حقوق و دستمزد و بیمه
// ۲. سیستم حسابداری هوشمند مدارس
// ==========================================

export const MOCK_PAYROLL_RECORDS: PayrollRecord[] = [
  {
    id: 'pay-1',
    teacherName: 'استاد محمد بهرامی',
    role: 'دبیر فیزیک تیزهوشان',
    iban: 'IR820170000000109283746101',
    baseSalary: 28000000,
    insuranceDeduction: 1960000, // سهم بیمه ۷٪
    taxDeduction: 840000, // مالیات
    advanceDeduction: 14000000, // کسر مساعده
    netPay: 11200000,
    status: 'pending'
  },
  {
    id: 'pay-2',
    teacherName: 'دکتر مریم صادقی',
    role: 'مشاور هدایت تحصیلی',
    iban: 'IR450120000000293847561023',
    baseSalary: 24000000,
    insuranceDeduction: 1680000,
    taxDeduction: 620000,
    advanceDeduction: 10000000,
    netPay: 11700000,
    status: 'pending'
  },
  {
    id: 'pay-3',
    teacherName: 'استاد حمید نادری',
    role: 'دبیر ریاضیات و حسابان',
    iban: 'IR670190000000482910384756',
    baseSalary: 31000000,
    insuranceDeduction: 2170000,
    taxDeduction: 1250000,
    advanceDeduction: 0,
    netPay: 27580000,
    status: 'pending'
  },
  {
    id: 'pay-4',
    teacherName: 'مهندس علیرضا رضایی',
    role: 'مسئول آزمایشگاه و سایت کامپیوتر',
    iban: 'IR120150000000839201948572',
    baseSalary: 20000000,
    insuranceDeduction: 1400000,
    taxDeduction: 380000,
    advanceDeduction: 8000000,
    netPay: 10220000,
    status: 'pending'
  },
  {
    id: 'pay-5',
    teacherName: 'سرکار خانم پریسا زمانی',
    role: 'دبیر زبان انگلیسی پیشرفته',
    iban: 'IR940180000000374829102948',
    baseSalary: 22500000,
    insuranceDeduction: 1575000,
    taxDeduction: 550000,
    advanceDeduction: 0,
    netPay: 20375000,
    status: 'pending'
  },
  {
    id: 'pay-6',
    teacherName: 'حاج جواد کاظمی',
    role: 'سرپرست خدمات و ترابری',
    iban: 'IR320140000000987654321098',
    baseSalary: 16500000,
    insuranceDeduction: 1155000,
    taxDeduction: 150000,
    advanceDeduction: 3000000,
    netPay: 12195000,
    status: 'pending'
  }
];

export const MOCK_ACCOUNTING_TRANSACTIONS: SmartAccountingTransaction[] = [
  {
    id: 'tx-101',
    date: '۱۴۰۳/۰۸/۲۴',
    title: 'وصول اقساط شهریه اولیا (شبکه شتاب پرهام)',
    category: 'tuition',
    type: 'income',
    amount: 142000000,
    status: 'settled',
    description: 'واریز دسته‌ای ۲۴ قسط شهریه از طریق درگاه اعتباری و کارت‌های شتاب'
  },
  {
    id: 'tx-102',
    date: '۱۴۰۳/۰۸/۲۲',
    title: 'پرداخت فاکتور کترینگ ناهار دانش‌آموزی',
    category: 'catering',
    type: 'expense',
    amount: 38500000,
    status: 'settled',
    description: 'تسویه قرارداد غذای گرم ۴۵۰ دانش‌آموز با شرکت مهرگان'
  },
  {
    id: 'tx-103',
    date: '۱۴۰۳/۰۸/۲۰',
    title: 'تسهیلات تجهیزات آزمایشگاه هوش مصنوعی پرهام',
    category: 'equipment',
    type: 'income',
    amount: 350000000,
    status: 'settled',
    description: 'شارژ حساب تسهیلاتی مدرسه از محل وام ویژه نوسازی و فناوری'
  },
  {
    id: 'tx-104',
    date: '۱۴۰۳/۰۸/۱۸',
    title: 'حق بیمه تامین اجتماعی پرسنل و معلمان (لیست مهرماه)',
    category: 'tax_insurance',
    type: 'expense',
    amount: 27800000,
    status: 'settled',
    description: 'تسویه الکترونیکی پورتال تامین اجتماعی شعبه ۲۸ تهران'
  },
  {
    id: 'tx-105',
    date: '۱۴۰۳/۰۸/۱۵',
    title: 'فاکتور چاپ و تکثیر آزمون‌های میان‌ترم',
    category: 'printing',
    type: 'expense',
    amount: 14200000,
    status: 'settled',
    description: 'چاپ سوالات، پاسخ‌برگ تستی و دفترچه‌های امتحانی پایه‌های دهم تا دوازدهم'
  },
  {
    id: 'tx-106',
    date: '۱۴۰۳/۰۸/۱۲',
    title: 'شهریه معوق اقساطی (در انتظار تایید چک صیادی)',
    category: 'tuition',
    type: 'income',
    amount: 54000000,
    status: 'pending',
    description: '۶ فقره چک صیادی ثبت‌شده در سامانه پیچک منتظر سررسید'
  }
];

// ==========================================
// بخش سوم : پرهام پی (خرید قسطی)
// ۱. خرید کتاب کمک آموزشی و آزمون های آزمایشی
// ۲. لباس فرم
// ۳. کترینگ مدارس
// ۴. چاپ و تکثیر
// ۵. کلاس خصوصی و موسسات
// ۶. لوازم تحریر و کاغذ
// ۷. تجهیزات مدارس
// ==========================================

export const PARHAM_PAY_PRODUCTS: ParhamPayProduct[] = [
  // ۱. خرید کتاب کمک آموزشی و آزمون های آزمایشی
  {
    id: 'pp-books-exams-1',
    name: 'پکیج جامع کتاب‌های کمک‌آموزشی و بانک تست کنکور (خیلی‌سبز، گاج، مبتکران)',
    category: 'books_exams',
    categoryFa: 'کتاب کمک‌آموزشی و آزمون‌ها',
    price: 4200000,
    installmentsCount: 4,
    monthlyInstallment: 1050000,
    provider: 'شبکه سراسری ناشران همکار پرهام',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    description: 'شامل کتاب‌های درسنامه، بانک تست‌های طبقه‌بندی شده و پاسخ‌های تشریحی پایه‌های دهم تا دوازدهم با ارسال رایگان.',
    isSchoolGroupPlan: true,
    schoolDiscountPct: 25
  },
  {
    id: 'pp-books-exams-2',
    name: 'اشتراک سالانه آزمون‌های آزمایشی قلم‌چی، سنجش و ماز (۱۸ مرحله کشوری)',
    category: 'books_exams',
    categoryFa: 'کتاب کمک‌آموزشی و آزمون‌ها',
    price: 6800000,
    installmentsCount: 6,
    monthlyInstallment: 1133000,
    provider: 'عاملیت رسمی آزمون‌های کشوری پرهام',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    description: 'شامل ۱۸ مرحله آزمون استاندارد حضوری/آنلاین با صدور کارنامه تراز، تحلیل کشوری، رفع اشکال تصویری و هوش مصنوعی پیش‌بینی رتبه.'
  },

  // ۲. لباس فرم
  {
    id: 'pp-uniform-1',
    name: 'ست کامل لباس فرم استاندارد دانش‌آموزی (کت، شلوار، پیراهن / مانتو مقنعه)',
    category: 'uniform',
    categoryFa: 'لباس فرم',
    price: 1950000,
    installmentsCount: 3,
    monthlyInstallment: 650000,
    provider: 'تولیدی صنعتی پوشاک ایرانیان مدرسه',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    description: 'پارچه ترگال درجه یک ضدچروک با دوام بالا، رنگ‌بندی مصوب مدرسه، دوخت صنعتی سفارشی و گارانتی تعویض سایز.',
    isSchoolGroupPlan: true,
    schoolDiscountPct: 15
  },
  {
    id: 'pp-uniform-2',
    name: 'پکیج لباس فرم ورزشی و گرمکن تربیت بدنی مدارس',
    category: 'uniform',
    categoryFa: 'لباس فرم',
    price: 1450000,
    installmentsCount: 3,
    monthlyInstallment: 483000,
    provider: 'اسپورت پلاس دانش‌آموزی',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80',
    description: 'گرمکن و شلوار ورزشی تنفس‌پذیر با الیاف نانو، کفش ورزشی سبک و جوراب استاندارد جهت ساعت ورزش مدارس.'
  },

  // ۳. کترینگ مدارس
  {
    id: 'pp-catering-1',
    name: 'اشتراک ماهیانه کترینگ غذای گرم ارگانیک و ناهار دانش‌آموزی',
    category: 'catering',
    categoryFa: 'کترینگ مدارس',
    price: 3800000,
    installmentsCount: 3,
    monthlyInstallment: 1266000,
    provider: 'کترینگ سلامت و تغذیه نیکو مهرگان',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    description: 'طبخ روزانه با مواد اولیه درجه یک تحت نظارت متخصص تغذیه کودک و نوجوان، بسته‌بندی بهداشتی سیلور و گرم در سلف مدرسه.',
    isSchoolGroupPlan: true,
    schoolDiscountPct: 20
  },
  {
    id: 'pp-catering-2',
    name: 'بسته میان‌وعده سالم و بوفه هوشمند دانش‌آموز (آجیل، شیر ارگانیک، میوه خشک)',
    category: 'catering',
    categoryFa: 'کترینگ مدارس',
    price: 1800000,
    installmentsCount: 3,
    monthlyInstallment: 600000,
    provider: 'شبکه بوفه سالم پرهام',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505253758473-96b3d5ebcd96?auto=format&fit=crop&w=600&q=80',
    description: 'بسته‌های اختصاصی انرژی‌بخش روزانه فاقد نگه‌دارنده و قند مصنوعی، تحویل در ساعات زنگ تفریح دانش‌آموزان.'
  },

  // ۴. چاپ و تکثیر
  {
    id: 'pp-printing-1',
    name: 'سرویس اشتراک چاپ و تکثیر سازمانی جزوات، امتحانات و تکالیف مدرسه',
    category: 'printing',
    categoryFa: 'چاپ و تکثیر',
    price: 8500000,
    installmentsCount: 6,
    monthlyInstallment: 1416000,
    provider: 'مرکز چاپ دیجیتال نشر پویان',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80',
    description: 'چاپ ریسوگراف و دیجیتال دورو، صحافی سیمی و منگنه، تحویل فوری ۶ ساعته سوالات محرمانه امتحانی درب مدرسه با تخفیف عمده.',
    isSchoolGroupPlan: true,
    schoolDiscountPct: 30
  },
  {
    id: 'pp-printing-2',
    name: 'چاپ سالنامه و سررسید اختصاصی، دفترچه ثبت انضباطی و کارنامه تحلیلی',
    category: 'printing',
    categoryFa: 'چاپ و تکثیر',
    price: 5200000,
    installmentsCount: 4,
    monthlyInstallment: 1300000,
    provider: 'مجتمع چاپ و صحافی پرهام‌گرافیک',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: 'طراحی گرافیکی مدرن با لوگوی مدرسه، جلد سخت سلفون مات، کاغذ ۸۰ گرمی تحریر و تقویم اختصاصی سال تحصیلی.'
  },

  // ۵. کلاس خصوصی و موسسات
  {
    id: 'pp-tutoring-1',
    name: 'پکیج کلاس خصوصی تقویتی، رفع اشکال و آمادگی نهایی (۱۲ جلسه ۹۰ دقیقه‌ای)',
    category: 'tutoring_institutes',
    categoryFa: 'کلاس خصوصی و موسسات',
    price: 7200000,
    installmentsCount: 6,
    monthlyInstallment: 1200000,
    provider: 'آکادمی اساتید برتر پرهام و موسسات همکار',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    description: 'کلاس‌های تک‌نفره یا ۳ نفره آنلاین و حضوری با دبیران رسمی سمپاد و طراحان سوالات کنکور با گزارش پیشرفت هفتگی.'
  },
  {
    id: 'pp-tutoring-2',
    name: 'اشتراک سالانه دوره‌های تخصصی آموزش زبان، برنامه‌نویسی و المپیاد',
    category: 'tutoring_institutes',
    categoryFa: 'کلاس خصوصی و موسسات',
    price: 9600000,
    installmentsCount: 8,
    monthlyInstallment: 1200000,
    provider: 'موسسه بین‌المللی علوم و زبان پارس',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    description: 'دوره‌های آیلتس جوانان، برنامه‌نویسی پایتون و هوش مصنوعی و حل مسئله المپیاد با اعطای مدرک معتبر بین‌المللی.'
  },

  // ۶. لوازم تحریر و کاغذ
  {
    id: 'pp-stationery-1',
    name: 'پالت کاغذ A4 سل‌پرینت و کپی‌مکس درجه یک ۸۰ گرم (خرید عمده کارتن ۵ تایی)',
    category: 'stationery_paper',
    categoryFa: 'لوازم‌التحریر و کاغذ',
    price: 4900000,
    installmentsCount: 4,
    monthlyInstallment: 1225000,
    provider: 'شرکت بازرگانی توزیع کاغذ آریا',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?auto=format&fit=crop&w=600&q=80',
    description: 'کاغذ بدون پرز، سفیدی ۹۶٪ مناسب دستگاه‌های چاپ سرعت‌بالا و فتوکپی مدرسه، بسته‌بندی ضد رطوبت استاندارد.',
    isSchoolGroupPlan: true,
    schoolDiscountPct: 20
  },
  {
    id: 'pp-stationery-2',
    name: 'پک جامع لوازم‌التحریر ممتاز دانش‌آموزی (دفاتر سیمی، نوشت‌افزار فابرکاستل و کیف)',
    category: 'stationery_paper',
    categoryFa: 'لوازم‌التحریر و کاغذ',
    price: 2400000,
    installmentsCount: 3,
    monthlyInstallment: 800000,
    provider: 'شهر نوشت‌افزار و تحریر پرهام',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    description: 'شامل انواع دفاتر ۱۰۰ برگ خطی و دوخط، روان‌نویس‌های تخصصی، مدادرنگی و ابزار هندسی کامل.'
  },

  // ۷. تجهیزات مدارس
  {
    id: 'pp-equipment-1',
    name: 'نمایشگر لمسی هوشمند ۶۵ اینچ کلاسی (Interactive Smart Board 4K)',
    category: 'school_equipment',
    categoryFa: 'تجهیزات مدارس',
    price: 68000000,
    installmentsCount: 12,
    monthlyInstallment: 5666000,
    provider: 'فناوران داده و هوشمندسازی کلاس درس',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80',
    description: 'پنل لمسی ضد ضربه ۲۰ نقطه‌ای، سیستم‌عامل اندروید ۱۳، اتصال بی‌سیم به لپ‌تاپ و موبایل دانش‌آموزان به همراه قلم مغناطیسی.',
    isSchoolGroupPlan: true,
    schoolDiscountPct: 15
  },
  {
    id: 'pp-equipment-2',
    name: 'پکیج تجهیزات آزمایشگاه علوم و فیزیک مدارس (میکروسکوپ دوچشمی و کیت روباتیک)',
    category: 'school_equipment',
    categoryFa: 'تجهیزات مدارس',
    price: 34000000,
    installmentsCount: 10,
    monthlyInstallment: 3400000,
    provider: 'صنایع آموزشی و آزمایشگاهی دانش‌بنیان',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    description: 'کیت کامل آزمایشگاهی مطابق کتاب‌های درسی نظام جدید، میکروسکوپ نوری دیجیتال با خروجی مانیتور و سنسورهای فیزیک و شیمی.'
  }
];

// ==========================================
// بخش چهارم : بیمه
// ۱. بیمه بازنشستگی پرهام
// ۲. بیمه تکمیلی
// ۳. بیمه حوادث دانش آموزی
// ۴. بیمه حوادث مدرسه
// ==========================================

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'ins-retirement',
    title: 'بیمه بازنشستگی پرهام (طرح طلایی ۱۰ ساله با مستمری و اندوخته)',
    category: 'retirement',
    categoryFa: 'بیمه بازنشستگی پرهام',
    planTier: 'teacher',
    targetGroup: 'معلمان، اساتید، کارکنان آموزشی و اداری مدارس با امکان بازنشستگی سریع ۱۰ ساله',
    monthlyPremium: 750000,
    hospitalizationCoverage: 'پوشش امراض خاص و نقص عضو تا ۱۸۰ میلیون تومان',
    dentalCoverage: '۱۲ میلیون تومان سالیانه',
    accidentCoverage: 'سرمایه فوت و ازکارافتادگی تا ۱.۵ میلیارد تومان',
    highlight: 'به جای ۳۰ سال انتظار فرسایشی تامین اجتماعی، فقط با ۱۰ سال پرداخت مستمری مادام‌العمر و اندوخته تضمینی میلیاردی دریافت کنید.',
    features: [
      'برقراری حقوق بازنشستگی ماهانه و مستمری مادام‌العمر دقیقاً پس از ۱۰ سال',
      'بازدهی سرمایه‌گذاری مرکب سبد اندوخته معادل ۴۰٪ سالیانه (بسیار بالاتر از تورم)',
      'معافیت کامل از پرداخت حق بیمه در صورت ازکارافتادگی با حفظ تمام حقوق مستمری',
      'امکان دریافت وام بدون بهره و بدون ضامن از محل اندوخته از سال دوم به بعد',
      'انتقال کامل حقوق مستمری و اندوخته به وراث قانونی در صورت فوت'
    ],
    schoolManagerBonus: '۱۵٪ تخفیف گروهی در صورت ثبت‌نام همکاران از طریق مدرسه',
    groupDiscountPct: 15
  },
  {
    id: 'ins-supplementary',
    title: 'بیمه تکمیلی تجمیعی معلمان و پرسنل (طرح بدون نیاز به حدنصاب)',
    category: 'supplementary',
    categoryFa: 'بیمه تکمیلی',
    planTier: 'teacher',
    targetGroup: 'دبیران، معلمان حق‌التدریس و کلیه کادر مدارس (حتی در مدارس زیر ۱۰ نفر)',
    monthlyPremium: 420000,
    hospitalizationCoverage: 'پوشش بستری و جراحی عمومی و تخصصی تا سقف ۱۲۰ میلیون تومان',
    dentalCoverage: '۱۵ میلیون تومان دندانپزشکی جامع (ایمپلنت، ارتودنسی، جراحی)',
    accidentCoverage: 'تا ۹۰ میلیون تومان پوشش حوادث',
    highlight: 'تجمیع سراسری مدارس در سامانه پرهام باعث شده حتی مدارس کوچک ۳ نفره نیز از تخفیف و تعهدات شرکت‌های بزرگ بهره‌مند شوند.',
    features: [
      'حذف کامل شرط حداقل تعداد پرسنل مدرسه برای بستن قرارداد تکمیلی',
      'بدون دوره انتظار برای جراحی‌های ضروری و زایمان',
      'پوشش جامع دارو، ویزیت پزشک، آزمایشگاه و اسکن‌های تخصصی تا ۲۰ میلیون تومان',
      'صدور معرفی‌نامه آنلاین و آنی در کلیه بیمارستان‌ها تنها با ارائه کد ملی',
      'امکان الحاق والدین، همسر و فرزندان تحت تکفل با همان نرخ مصوب سازمانی'
    ],
    schoolManagerBonus: 'امکان پرداخت حق‌بیمه به صورت کسر ماهانه از حقوق',
    groupDiscountPct: 20
  },
  {
    id: 'ins-student-accident',
    title: 'بیمه حوادث دانش‌آموزی ۲۴ ساعته (داخل و خارج از مدرسه)',
    category: 'student_accident',
    categoryFa: 'بیمه حوادث دانش‌آموزی',
    planTier: 'student',
    targetGroup: 'کلیه دانش‌آموزان پایه‌های پیش‌دبستانی تا دوازدهم',
    monthlyPremium: 95000,
    hospitalizationCoverage: 'جبران هزینه‌های پزشکی ناشی از حادثه تا ۳۵ میلیون تومان',
    accidentCoverage: 'پوشش غرامت فوت، نقص عضو دائم و دیه کامل حوادث تا ۸۰۰ میلیون تومان',
    highlight: 'پوشش شبانه‌روزی ۳۶۵ روزه در سراسر کشور حتی در حین مسافرت، اردو، ورزش و مسیر رفت‌وآمد منزل به مدرسه.',
    features: [
      'پوشش ۲۴ ساعته حوادث ورزشی، حوادث رانندگی سرویس و شکستگی‌ها',
      'جبران فوری هزینه‌های دندانپزشکی اورژانسی ناشی از ضربه در زنگ تفریح',
      'پرداخت آنلاین خسارت ظرف ۴۸ ساعت با ارسال صورت‌حساب پزشکی در اپلیکیشن',
      'طرح حمایتی کمک‌هزینه تحصیلی در صورت بروز حوادث برای سرپرست دانش‌آموز',
      'تعرفه بسیار اقتصادی سالیانه با امکان پرداخت اقساطی در کنار شهریه'
    ],
    groupDiscountPct: 25
  },
  {
    id: 'ins-school-accident',
    title: 'بیمه حوادث مدرسه و مسئولیت مدنی جامع مدیران و موسسان',
    category: 'school_accident',
    categoryFa: 'بیمه حوادث مدرسه',
    planTier: 'school',
    targetGroup: 'موسسان، مدیران، ناظمان و کادر اجرایی مدارس و مجتمع‌های آموزشی',
    monthlyPremium: 680000,
    hospitalizationCoverage: 'پوشش مسئولیت پزشکی و بستری مصدومان در محوطه مدرسه تا ۱۵۰ میلیون تومان',
    accidentCoverage: 'پوشش کامل دیه قانونی تا سقف ۲.۵ میلیارد تومان برای هر نفر در هر حادثه',
    highlight: 'سلب کامل بار مسئولیت کیفری و حقوقی از دوش کادر مدرسه در برابر حوادث غیرمترقبه آزمایشگاه، پله، اردوها و حریق.',
    features: [
      'پوشش کامل حوادث آزمایشگاه، کارگاه، پله‌ها، حیاط و استخر مدرسه',
      'پوشش مسئولیت قانونی در اردوهای علمی، تفریحی و ورزشی برون‌شهری',
      'بیمه آتش‌سوزی، صاعقه، انفجار و زلزله ساختمان و تجهیزات مدرسه تا ۵ میلیارد',
      'پوشش حوادث سرویس مدرسه در محدوده ایستگاه‌های سوار و پیاده شدن',
      'پشتیبانی تیم وکلای مجرب دادگستری در دعاوی حقوقی به صورت رایگان'
    ],
    schoolManagerBonus: 'کارت هدیه طلایی ۵ میلیون تومانی + افزایش سقف تسهیلات مدرسه',
    groupDiscountPct: 30
  }
];

// ==========================================
// بخش پنجم : سرمایه‌گذاری
// ۱. صندوق فلزات گران بها ( طلا - نقره - مس )
// ۲. صندوق سهام
// ۳. صندوق درآمد ثابت
// ۴. نیکوکاری
// ۵. مشاوره سرمایه گذاری و سواد مالی
// ==========================================

export const INVESTMENT_ASSETS: InvestmentAsset[] = [
  // طلا
  {
    id: 'gold-melted',
    name: 'صندوق طلای ۱۸ عیار آب‌شده (بدون اجرت و مالیات)',
    symbol: 'GOLD-18K',
    pricePerUnit: 4680000,
    unitFa: 'هر گرم',
    change24h: 1.84,
    historicalChart: [4420000, 4480000, 4510000, 4560000, 4610000, 4640000, 4680000],
    category: 'gold',
    description: 'شمش و طلای آب‌شده استاندارد با عیار ۷۵۰، نگهداری در خزانه امن بانکی با امکان تحویل فیزیکی یا تبدیل آنی به ریال.',
    expectedAnnualYieldPct: 42.5
  },
  // نقره
  {
    id: 'silver-bars',
    name: 'صندوق شمش و ساچمه نقره خالص ۹۹۹',
    symbol: 'SILVER-999',
    pricePerUnit: 88500,
    unitFa: 'هر گرم',
    change24h: 2.38,
    historicalChart: [81000, 82500, 83900, 85200, 86800, 87400, 88500],
    category: 'silver',
    description: 'نقره فیزیکی ساچمه‌ای خالص و شمش سوئیسی با نقدشوندگی بالا، پتانسیل جهش دلاری و تقاضای پرشتاب صنایع الکترونیک و خورشیدی.',
    expectedAnnualYieldPct: 48.0
  },
  // مس
  {
    id: 'copper-cathode',
    name: 'صندوق کاتد مس درجه یک بورس کالا (فلز استراتژیک سبز)',
    symbol: 'COPPER-GRADE-A',
    pricePerUnit: 585000,
    unitFa: 'هر کیلوگرم',
    change24h: 1.15,
    historicalChart: [550000, 558000, 564000, 570000, 576000, 581000, 585000],
    category: 'copper',
    description: 'سرمایه‌گذاری در کاتد مس خلوص ۹۹.۹۹٪ بورس کالای ایران؛ فلز پایه انقلاب انرژی الکتریکی و هوش مصنوعی با رشد باثبات و ضدتورمی.',
    expectedAnnualYieldPct: 36.2
  },
  // سهام
  {
    id: 'stock-index-fund',
    name: 'صندوق سرمایه‌گذاری سهام ممتاز پرهام (ETF سهامی و شاخصی)',
    symbol: 'STOCK-PARHAM',
    pricePerUnit: 14500,
    unitFa: 'هر واحد',
    change24h: 3.12,
    historicalChart: [12800, 13100, 13450, 13900, 14100, 14250, 14500],
    category: 'stocks',
    description: 'ترکیب هوشمند برترین سهام بنیادی شرکت‌های سودآور بورس تهران، پتروشیمی‌ها و فلزات با مدیریت تخصصی تحلیلگران خبره.',
    expectedAnnualYieldPct: 52.0
  },
  // درآمد ثابت
  {
    id: 'fixed-income-fund',
    name: 'صندوق درآمد ثابت طلوع پرهام (ویژه رسوب شهریه و درآمد روزشمار)',
    symbol: 'FIXED-EDU',
    pricePerUnit: 100000,
    unitFa: 'هر واحد',
    change24h: 0.08,
    historicalChart: [97000, 97500, 98100, 98700, 99300, 99600, 100000],
    category: 'fixed_income',
    description: 'سود تضمینی ۳۱.۵٪ سالیانه با محاسبه روزشمار و پرداخت ماهانه، معاف از مالیات با نقدشوندگی ۲۴ ساعته آنی، بهترین جایگزین سپرده بانکی.',
    expectedAnnualYieldPct: 31.5
  }
];

// پروژه‌های نیکوکاری و مسئولیت اجتماعی
export const MOCK_CHARITY_PROJECTS: CharityProject[] = [
  {
    id: 'charity-1',
    title: 'بورسیه تحصیلی دانش‌آموزان مستعد و بی‌بضاعت مناطق محروم',
    targetAmount: 120000000,
    collectedAmount: 84000000,
    donorsCount: 168,
    region: 'استان سیستان و بلوچستان و هرمزگان',
    category: 'scholarship',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    description: 'تامین ۱۰۰ درصدی شهریه مدرسه، کتب درسی و هزینه ایاب و ذهاب دانش‌آموزان تیزهوش فاقد سرپرست موثر.',
    isUrgent: true
  },
  {
    id: 'charity-2',
    title: 'تجهیز کارگاه هوشمند و کامپیوتر مدارس مناطق کم‌برخوردار',
    targetAmount: 200000000,
    collectedAmount: 135000000,
    donorsCount: 215,
    region: 'خراسان جنوبی و لرستان',
    category: 'tech_aid',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80',
    description: 'خرید مانیتورهای لمسی، رایانه‌های آموزشی و اینترنت پرسرعت کلاسی جهت رفع فقر دیجیتال تحصیلی.'
  },
  {
    id: 'charity-3',
    title: 'پویش کوله‌پشتی امید: توزیع لوازم‌التحریر و گرمکن دانش‌آموزی',
    targetAmount: 60000000,
    collectedAmount: 52000000,
    donorsCount: 94,
    region: 'مناطق روستایی ایلام و کهگیلویه',
    category: 'stationery_aid',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    description: 'اهدای ۵۰۰ بسته تحصیلی شامل دفاتر، کوله‌پشتی ضدآب، خودکار، مدادرنگی و لباس گرم زمستانه.'
  }
];

// سبدهای هدفمند پرهام (لپ‌تاپ، جهیزیه، مهاجرت)
export const GOAL_BASED_FUNDS: GoalBasedFund[] = [
  {
    id: 'fund-laptop',
    targetKey: 'laptop',
    title: 'صندوق خرید لپ‌تاپ و تجهیزات تحصیلی',
    subtitle: 'برنامه‌ریزی ۶ الی ۱۲ ماهه جهت تهیه لپ‌تاپ، تبلت گرافیکی و سیستم هوش مصنوعی',
    targetAmountRange: '۳۰ تا ۶۰ میلیون تومان',
    defaultTargetAmount: 45000000,
    recommendedHorizonMonths: 12,
    goldAllocationPct: 60,
    silverAllocationPct: 40,
    parentMatchBonusPct: 20,
    expectedAnnualYieldPct: 38.5,
    iconName: 'Laptop',
    badgeLabel: 'کوتاه‌مدت پربازده',
    description: 'ترکیب بهینه‌ای از طلای ۱۸ عیار و شمش نقره ساچمه‌ای ۹۹۹ با هدف خنثی‌سازی جهش قیمت قطعات دیجیتال، نوسان ارز و ارتقای لپ‌تاپ در دوره یک‌ساله.',
    features: [
      'حفاظت کامل در برابر تورم و جهش نرخ ارز قطعات رایانه‌ای',
      'امکان واریز خرد هفتگی از ۵۰,۰۰۰ تومان',
      '۲۰٪ پاداش هم‌افزایی والدین روی موجودی پس‌انداز فرزند',
      'تخفیف ویژه ۱۰٪ خرید مستقیم از فروشندگان تجهیزات آموزشی پرهام‌پی'
    ]
  },
  {
    id: 'fund-dowry',
    targetKey: 'dowry',
    title: 'صندوق تامین جهیزیه و آتیه استقلال جوانان',
    subtitle: 'برنامه‌ریزی میان‌مدت ۳ تا ۵ ساله برای تامین جهیزیه، مسکن و استقلال فرزندان',
    targetAmountRange: '۱۵۰ تا ۳۵۰ میلیون تومان',
    defaultTargetAmount: 200000000,
    recommendedHorizonMonths: 36,
    goldAllocationPct: 80,
    silverAllocationPct: 20,
    parentMatchBonusPct: 15,
    expectedAnnualYieldPct: 41.2,
    iconName: 'Sparkles',
    badgeLabel: 'میان‌مدت ایمن',
    description: 'پرتفوی ضدتورمی متمرکز بر طلای آب‌شده کارمزد صفر و شمش نقره جهت تضمین قدرت خرید جهیزیه و لوازم اساسی زندگی فرزندان در افق ۳ تا ۵ ساله.',
    features: [
      'تثبیت ۱۰۰٪ قدرت خرید لوازم خانگی، جهیزیه و لوازم سرمایه‌ای',
      'تمرکز ۸۰ درصدی روی طلای آب‌شده با کمترین اسپرد خرید و فروش',
      'امکان دریافت وام تکمیلی کم‌کارمزد در سررسید صندوق',
      '۱۵٪ پاداش هم‌افزایی و هدیه آغاز زندگی پرهام'
    ]
  },
  {
    id: 'fund-migration',
    targetKey: 'migration',
    title: 'صندوق مهاجرت و ادامه تحصیلات بین‌المللی',
    subtitle: 'برنامه‌ریزی ۲ الی ۴ ساله برای پوشش هزینه‌های اپلای، آزمون‌های زبان، ویزا و کالج',
    targetAmountRange: '۳۰۰ تا ۸۰۰ میلیون تومان',
    defaultTargetAmount: 500000000,
    recommendedHorizonMonths: 36,
    goldAllocationPct: 85,
    silverAllocationPct: 15,
    parentMatchBonusPct: 25,
    expectedAnnualYieldPct: 46.0,
    iconName: 'Plane',
    badgeLabel: 'بلندمدت دلاری/ارزی',
    description: 'صندوق همگام با شاخص‌های جهانی طلا و ارزهای بین‌المللی برای خانواده‌هایی که قصد تامین مخارج ویزا، آزمون‌ها، تمکن مالی و شهریه کالج خارجی را دارند.',
    features: [
      'همبستگی مستقیم ارزش دارایی با نرخ اونس جهانی و دلار آزاد',
      'امکان نقدشوندگی ۲۴ ساعته جهت پرداخت هزینه‌های ارزی سفارت و دانشگاه',
      '۲۵٪ بالاترین سقف پاداش تشویقی و هم‌افزایی والدین',
      'مشاوره اختصاصی انتقال امن منابع مالی به صرافی‌های همکار'
    ]
  }
];

export const MOCK_PIGGY_BANKS: PiggyBankGoal[] = [
  {
    id: 'pb-1',
    targetKey: 'laptop',
    studentName: 'امیرحسین پارسا (پایه هشتم)',
    goalTitle: 'صندوق هدفمند: خرید لپ‌تاپ برنامه‌نویسی و سیستم هوش مصنوعی',
    targetAmount: 45000000,
    currentSavings: 24500000,
    goldWeightGrams: 3.4,
    silverWeightGrams: 75.0,
    assetAllocation: 'combined',
    parentMatchBonusPct: 20,
    avatar: '💻'
  },
  {
    id: 'pb-2',
    targetKey: 'dowry',
    studentName: 'سارا محمدی (پایه دهم)',
    goalTitle: 'صندوق هدفمند: پس‌انداز طلایی جهیزیه و آتیه استقلال',
    targetAmount: 180000000,
    currentSavings: 72000000,
    goldWeightGrams: 11.5,
    silverWeightGrams: 115.0,
    assetAllocation: 'gold',
    parentMatchBonusPct: 15,
    avatar: '💍'
  },
  {
    id: 'pb-3',
    targetKey: 'migration',
    studentName: 'علی رضایی (پایه هفتم)',
    goalTitle: 'صندوق هدفمند: مهاجرت تحصیلی و آمادگی آزمون‌های بین‌المللی',
    targetAmount: 350000000,
    currentSavings: 115000000,
    goldWeightGrams: 19.8,
    silverWeightGrams: 210.0,
    assetAllocation: 'combined',
    parentMatchBonusPct: 25,
    avatar: '✈️'
  }
];

export const PIGGY_SHOP_PRODUCTS: PiggyShopProduct[] = [
  {
    id: 'psp-1',
    name: 'لپ‌تاپ قدرتمند ASUS TUF Gaming F15 (گیمینگ، مهندسی و برنامه‌نویسی)',
    targetKey: 'laptop',
    categoryFa: 'لپ‌تاپ و تجهیزات دیجیتال',
    originalPrice: 65000000,
    piggyDiscountPrice: 58500000,
    discountPct: 10,
    rating: 4.9,
    warranty: '۲۴ ماه گارانتی رسمی یکپارچه سازگار',
    specs: ['پردازنده Core i7 13620H', 'رم 16GB DDR5 پرسرعت', 'حافظه 1TB NVMe Gen4', 'گرافیک RTX 4050 6GB GDDR6'],
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    description: 'بهترین انتخاب برای دانشجویان و دانش‌آموزان علاقه‌مند به هوش مصنوعی، برنامه‌نویسی و رندرهای مهندسی با تخفیف طلایی قلک پرهام.'
  },
  {
    id: 'psp-2',
    name: 'لپ‌تاپ باریک و سبک Lenovo ThinkBook 15 G4 (اداری، تحصیلی و کدنویسی)',
    targetKey: 'laptop',
    categoryFa: 'لپ‌تاپ و تجهیزات دیجیتال',
    originalPrice: 35000000,
    piggyDiscountPrice: 31500000,
    discountPct: 10,
    rating: 4.8,
    warranty: '۱۸ ماه گارانتی معتبر حامی',
    specs: ['پردازنده Intel Core i5 1235U', 'رم 16GB DDR4', 'حافظه 512GB SSD', 'نمایشگر FHD IPS مات ضدخستگی'],
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    description: 'لپ‌تاپ خوش‌دست، سبک و بادوام ایده‌آل برای تدریس معلمان، پروژه‌های دانش‌آموزی و پژوهش‌های آکادمیک.'
  },
  {
    id: 'psp-3',
    name: 'پکیج جهیزیه کامل لوازم برقی اسنوا (یخچال دوقلو + ماشین لباسشویی ۹ کیلویی)',
    targetKey: 'dowry',
    categoryFa: 'جهیزیه و مسکن',
    originalPrice: 92000000,
    piggyDiscountPrice: 82800000,
    discountPct: 10,
    rating: 4.9,
    warranty: '۳۶ ماه ضمانت طلایی انتخاب سرویس + نصب رایگان',
    specs: ['یخچال فریزر دوقلو ۳۶ فوت نوفراست', 'موتور اینورتر دیجیتال کم‌مصرف A+++', 'لباسشویی ۹ کیلویی گیربکسی بی‌صدا', 'برنامه شستشوی بخار ضدآلرژی'],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    description: 'تامین مایحتاج اصلی جهیزیه مستقیم از کارخانه اسنوا با پاداش حمایتی قلک پرهام و حمل رایگان تا درب منزل.'
  },
  {
    id: 'psp-4',
    name: 'سرویس ۱۲ نفره جهیزیه چینی زرین + سرویس قاشق چنگال آلمانی فلورانس',
    targetKey: 'dowry',
    categoryFa: 'جهیزیه و مسکن',
    originalPrice: 21000000,
    piggyDiscountPrice: 18900000,
    discountPct: 10,
    rating: 4.7,
    warranty: 'ضمانت اصالت و سلامت فیزیکی زرین',
    specs: ['۱۰۲ پارچه کامل درجه عالی', 'طلای ناب روکش‌دار', 'قابلیت شستشو در ماشین ظرفشویی', 'سرویس قاشق چنگال ۱۲۸ پارچه استیل ضدزنگ ۱۸/۱۰'],
    image: 'https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    description: 'انتخابی بی‌نظیر برای تکمیل جهیزیه با نقوش کلاسیک و کیفیت صادراتی.'
  },
  {
    id: 'psp-5',
    name: 'بسته جامع مهاجرت تحصیلی (دوره VIP آیلتس + ترجمه مدارک + اخذ پذیرش دانشگاه)',
    targetKey: 'migration',
    categoryFa: 'مهاجرت تحصیلی و زبان',
    originalPrice: 48000000,
    piggyDiscountPrice: 42000000,
    discountPct: 12,
    rating: 4.9,
    warranty: 'تضمین قرارداد رسمی و بازگشت وجه مشروط',
    specs: ['دوره فشرده آنلاین آمادگی IELTS تا نمره ۷.۵', 'ترجمه رسمی ۳ دست مدارک تحصیلی و ریزنمرات', 'مشاوره و اپلای پرونده برای ۳ دانشگاه معتبر', 'رزومه‌نویسی و نگارش انگیزه‌نامه (SOP) حرفه‌ای'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    description: 'مسیر مطمئن برای خانواده‌ها و جوانان متقاضی تحصیل در مقاطع کارشناسی و ارشد در دانشگاه‌های برتر جهان.'
  },
  {
    id: 'psp-6',
    name: 'تبلت قلم‌دار سامسونگ Galaxy Tab S9 FE ویژه طراحی و یادگیری هوشمند',
    targetKey: 'tablet',
    categoryFa: 'لپ‌تاپ و تجهیزات دیجیتال',
    originalPrice: 28000000,
    piggyDiscountPrice: 25200000,
    discountPct: 10,
    rating: 4.8,
    warranty: '۱۸ ماه گارانتی شرکتی داریا همراه',
    specs: ['نمایشگر ۱۰.۹ اینچ ۹۰ هرتز ضدآب IP68', 'همراه با قلم هوشمند S-Pen در جعبه', 'باتری ۸۰۰۰ میلی‌آمپر با فست‌شارژ ۴۵ وات', 'مناسب جزوه‌نویسی، طراحی دیجیتال و حضور در کلاس‌های آنلاین'],
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    description: 'جایگزین کامل دفتر و کتاب با قلم بدون تاخیر برای مطالعه و تمرین دانش‌آموزان و دانشجویان.'
  },
  {
    id: 'psp-7',
    name: 'موتور برقی پاک شهری یا دوچرخه دنده‌ای جکسون ویژه تردد به مدرسه و دانشگاه',
    targetKey: 'vehicle',
    categoryFa: 'وسایل نقلیه پاک',
    originalPrice: 45000000,
    piggyDiscountPrice: 39500000,
    discountPct: 12,
    rating: 4.7,
    warranty: '۲۴ ماه گارانتی شرکتی باطری و موتور',
    specs: ['سرعت مجاز تا ۵۰ کیلومتر بر ساعت', 'پیمایش ۶۰ کیلومتر با هر بار شارژ', 'ترمز دیسکی دوبل هیدرولیک', 'بدون نیاز به گواهینامه برای دوچرخه برقی'],
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    description: 'تردد پاک، سریع و کم‌هزینه برای دانش‌آموزان و معلمان بدون ترافیک و بدون آلایندگی.'
  },
  {
    id: 'psp-8',
    name: 'پکیج جامع کتاب‌های تیزهوشان، کنکور و آزمون‌های آزمایشی کشوری قلم‌چی و خیلی‌سبز',
    targetKey: 'education',
    categoryFa: 'آموزش و آزمون',
    originalPrice: 10500000,
    piggyDiscountPrice: 8900000,
    discountPct: 15,
    rating: 4.9,
    warranty: 'آخرین ویرایش چاپ سال تحصیلی جاری',
    specs: ['۱۰ مرحله آزمون آزمایشی آنلاین کشوری با تحلیل کارنامه هوشمند', 'پکیج جامع درسنامه‌ها و تست‌های ۴ رنگ', 'همراه با پشتیبان تخصصی و برنامه مطالعاتی هوش مصنوعی پرهام'],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    inStock: true,
    description: 'تامین کامل منابع مطالعاتی و آزمون‌های سال تحصیلی با تخفیف استثنایی قلک دانش‌آموز.'
  }
];

export const INITIAL_PIGGY_ORDERS: PiggyPurchaseOrder[] = [
  {
    id: 'pord-1',
    orderNumber: 'PRH-PG-98214',
    date: '۱۴۰۳/۰۷/۰۲',
    productName: 'لپ‌تاپ باریک Lenovo ThinkBook 15 G4',
    productCategory: 'لپ‌تاپ و تجهیزات دیجیتال',
    totalAmount: 31500000,
    piggyPaidAmount: 31500000,
    remainderBnplAmount: 0,
    discountSaved: 3500000,
    status: 'delivered',
    trackingCode: 'POST-IR-882194821'
  },
  {
    id: 'pord-2',
    orderNumber: 'PRH-PG-74102',
    date: '۱۴۰۳/۰۶/۱۵',
    productName: 'بسته جامع مهاجرت تحصیلی (دوره VIP آیلتس + پذیرش)',
    productCategory: 'مهاجرت تحصیلی و زبان',
    totalAmount: 42000000,
    piggyPaidAmount: 25000000,
    remainderBnplAmount: 17000000,
    discountSaved: 6000000,
    status: 'confirmed',
    trackingCode: 'PRH-APPLY-30129'
  }
];

export const MOCK_LINKED_FAMILY_INVESTMENTS: LinkedFamilyInvestment[] = [
  {
    id: 'lfi-1',
    targetKey: 'laptop',
    parentName: 'استاد علیرضا پارسا (دبیر و ولی دانش‌آموز)',
    studentName: 'امیرحسین پارسا (پایه هشتم)',
    familyGoalTitle: 'سبد هدفمند خانواده: خرید لپ‌تاپ برنامه‌نویسی و سیستم هوش مصنوعی امیر',
    parentSavings: 28000000,
    studentSavings: 14500000,
    parentMatchBonusPct: 20,
    combinedGoldGrams: 6.8,
    combinedSilverGrams: 95.0,
    totalYieldEstimatedPct: 36.4
  },
  {
    id: 'lfi-2',
    targetKey: 'dowry',
    parentName: 'مهندس فاطمه اکبری (مادر سارا)',
    studentName: 'سارا محمدی (پایه دهم)',
    familyGoalTitle: 'سبد هدفمند خانواده: صندوق طلای ۱۸ عیار جهیزیه و استقلال سارا',
    parentSavings: 110000000,
    studentSavings: 38000000,
    parentMatchBonusPct: 15,
    combinedGoldGrams: 24.5,
    combinedSilverGrams: 180.0,
    totalYieldEstimatedPct: 39.2
  },
  {
    id: 'lfi-3',
    targetKey: 'migration',
    parentName: 'دکتر محمدرضا رضایی (ولی دانش‌آموز)',
    studentName: 'علی رضایی (پایه هفتم)',
    familyGoalTitle: 'سبد هدفمند خانواده: صندوق طلا و نقره مهاجرت و تحصیلات بین‌المللی علی',
    parentSavings: 195000000,
    studentSavings: 65000000,
    parentMatchBonusPct: 25,
    combinedGoldGrams: 42.0,
    combinedSilverGrams: 320.0,
    totalYieldEstimatedPct: 44.8
  }
];

// مشاوره سرمایه‌گذاری و سواد مالی
export const MOCK_ADVISORY_PLANS: AdvisorySubscription[] = [
  {
    id: 'adv-school',
    title: 'مشاوره مدیریت نقدینگی، خزانه و رسوب شهریه مدارس',
    targetRole: 'school',
    durationMonths: 6,
    price: 12500000,
    monthlyEquivalent: 2083000,
    features: [
      'جلسه ماهانه اختصاصی با تحلیل‌گر ارشد بازار پول و سرمایه',
      'مدل‌سازی بهینه‌سازی جریان نقدی شهریه و صندوق درآمد ثابت پرهام',
      'مشاوره تخصصی تامین مالی و تسهیلات ۲ میلیاردی بانکی',
      'تنظیم قراردادهای بیمه‌ای و مالیاتی پرسنل جهت کاهش ۳۰ درصدی هزینه‌ها'
    ],
    badge: 'پیشنهاد ویژه مدیران و موسسان'
  },
  {
    id: 'adv-teacher',
    title: 'کوچینگ مالی، ساخت پرتفوی و بازنشستگی ۱۰ ساله همکاران',
    targetRole: 'teacher',
    durationMonths: 12,
    price: 3600000,
    monthlyEquivalent: 300000,
    features: [
      'برنامه‌ریزی دقیق ورود به طرح بازنشستگی طلایی ۱۰ ساله',
      'استراتژی تجمیع پس‌انداز در سبد طلا، نقره و مس با کسر از حقوق',
      'راهنمای دریافت حداکثری وام‌های رفاهی فرهنگیان',
      'پشتیبانی هفتگی در پیام‌رسان با منتور مالی اختصاصی'
    ],
    badge: 'محبوب‌ترین میان معلمان'
  },
  {
    id: 'adv-parent',
    title: 'مشاوره جامع هوش مالی خانواده و سبدهای آتیه فرزندان (لپ‌تاپ، جهیزیه، مهاجرت)',
    targetRole: 'parent',
    durationMonths: 6,
    price: 4200000,
    monthlyEquivalent: 700000,
    features: [
      'تحلیل وضعیت مالی خانواده و طراحی سبد ضدتورمی طلا، نقره و سهام',
      'مشاوره دریافت وام ۵۰۰ میلیونی شهریه با کمترین کارمزد',
      'اتصال قلک هوشمند فرزند با پاداش تشویقی ۲۵٪ والدین',
      'دسترسی رایگان به تمام دوره‌های آکادمی سواد مالی پرهام'
    ],
    badge: 'ویژه اولیای آینده‌نگر'
  }
];

export const FINANCIAL_COURSES: FinancialCourse[] = [
  {
    id: 'course-1',
    title: 'هوش مالی و سرمایه‌گذاری برای دانش‌آموزان و نوجوانان',
    targetAudience: 'دانش‌آموزان و نوجوانان',
    level: 'مقدماتی',
    duration: '۴ ساعت (۸ ویدیوی آموزشی)',
    lessonsCount: 8,
    description: 'چگونه پول توجیبی خود را مدیریت کنیم؟ فرق بین خواسته و نیاز چیست و چرا نباید پول نقد را راکد گذاشت؟',
    keyTakeaways: [
      'فرمول جادویی ۵۰-۳۰-۲۰ در پس‌انداز پول توجیبی',
      'آشنایی با مفهوم تورم و نحوه تبدیل پول به طلا و فلزات گران‌بها',
      'شناخت کلاهبرداری‌های اینترنتی و خریدهای آنلاین ایمن',
      'هنر کارآفرینی کوچک در دوران دانش‌آموزی'
    ],
    quizQuestion: {
      question: 'چرا تبدیل پس‌انداز نقد به طلا یا صندوق‌های سرمایه‌گذاری در قلک پرهام هوشمندانه‌تر از نگهداری اسکناس در خانه است؟',
      options: [
        'زیرا طلا جای کمتری می‌گیرد.',
        'زیرا تورم قدرت خرید پول نقد را کاهش می‌دهد، اما طلا ارزش دارایی را در گذر زمان حفظ می‌کند.',
        'چون بانک‌ها پول نقد را قبول نمی‌کنند.',
        'هیچ فرقی با هم ندارند.'
      ],
      correctIndex: 1,
      explanation: 'طلا و دارایی‌های سرمایه‌گذاری به عنوان سپری مطمئن در برابر تورم عمل کرده و قدرت خرید پس‌انداز دانش‌آموز را حفظ و افزایش می‌دهند.'
    }
  },
  {
    id: 'course-2',
    title: 'مدیریت جریان نقدی و هوشمندسازی بودجه مدارس غیردولتی',
    targetAudience: 'مدیران مدارس و معاونان مالی',
    level: 'پیشرفته',
    duration: '۶ ساعت (۱۲ درس کاربردی)',
    lessonsCount: 12,
    description: 'راهکارهای علمی رفع کسری نقدینگی، پیش‌بینی تعهدات معلمان، سرمایه‌گذاری رسوب شهریه‌ها در صندوق‌های درآمد ثابت و طلا.',
    keyTakeaways: [
      'مدیریت چرخه دریافت شهریه‌ها و تسویه با بیمه و اساتید',
      'استفاده از ابزارهای فین‌تک برای پرداخت حقوق پیش از موعد بدون فشار به خزانه مدرسه',
      'قوانین مالیاتی و بیمه‌ای معلمان و پرسنل قرارداد موقت'
    ],
    quizQuestion: {
      question: 'بهترین استراتژی برای رسوب وجوه شهریه مدرسه در ماه‌های مهر تا دی چیست؟',
      options: [
        'راکد گذاشتن در حساب جاری بدون سود',
        'سرمایه‌گذاری در صندوق‌های درآمد ثابت با سود روزشمار و نقدشوندگی آنی ۲۴ ساعته',
        'خرید املاک مسکونی غیرنقدشونده',
        'توزیع سریع سود میان سهامداران قبل از پایان سال تحصیلی'
      ],
      correctIndex: 1,
      explanation: 'صندوق‌های درآمد ثابت به مدارس امکان می‌دهند تا بدون ریسک و با نقدشوندگی فوری، سود روزشمار تا ۳۱.۵٪ دریافت کرده و هزینه‌های جاری را پوشش دهند.'
    }
  },
  {
    id: 'course-3',
    title: 'سواد مالی برای معلمان: مدیریت بدهی، وام و بازنشستگی',
    targetAudience: 'معلمان و اساتید',
    level: 'متوسط',
    duration: '۳.۵ ساعت',
    lessonsCount: 6,
    description: 'چگونه از تسهیلات کم‌بهره استفاده کنیم؟ زمان مناسب برای درخواست پرداخت حقوق پیش از موعد چیست و چگونه صندوق اضطراری بسازیم؟',
    keyTakeaways: [
      'محاسبه نسبت بازپرداخت اقساط به درآمد ماهانه (DTI)',
      'بهره‌مندی بهینه از بیمه تکمیلی تجمیعی جهت کاهش ۹۰ درصدی هزینه‌های درمانی',
      'طرح‌ریزی پس‌انداز بازنشستگی مستقل از صندوق‌های دولتی'
    ],
    quizQuestion: {
      question: 'حداکثر سهم پیشنهادی اقساط وام از کل درآمد ماهانه چقدر باید باشد تا فرد دچار بحران نشود؟',
      options: [
        'بیش از ۸۰ درصد',
        'بین ۳۰ تا ۴۰ درصد از درآمد خالص ماهانه',
        '۱۰۰ درصد',
        '۱۰ درصد'
      ],
      correctIndex: 1,
      explanation: 'در اصول مالی شخصی، سقف ایمن اقساط ماهانه حداکثر ۳۰ تا ۴۰ درصد درآمد است تا هزینه‌های روزمره با تنش مواجه نگردد.'
    }
  }
];
