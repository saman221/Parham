import React, { useState } from 'react';
import { 
  MOCK_PAYROLL_RECORDS, 
  MOCK_ACCOUNTING_TRANSACTIONS 
} from '../data/mockData';
import { 
  INITIAL_PAYROLL_BATCH,
  INITIAL_STUDENT_ADMISSIONS,
  INITIAL_OPERATING_EXPENSES,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_REPRESENTATIVE
} from '../data/schoolAccountingMock';
import { 
  PayrollRecord, 
  UserRole,
  StudentAdmission,
  SchoolOperatingExpense,
  JournalEntry,
  SchoolRepresentative,
  PayrollUploadBatch
} from '../types';
import { formatTomans, toPersianDigits } from '../utils/formatters';
import { 
  Calculator, 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  Send, 
  Download, 
  UploadCloud, 
  ShieldCheck, 
  Users, 
  Search, 
  Plus, 
  Bell, 
  Receipt, 
  Check, 
  Building2,
  TrendingUp,
  Calendar,
  Sparkles,
  Phone,
  FileCheck,
  FileText,
  BadgeCheck,
  AlertTriangle,
  FolderLock,
  ArrowDownLeft,
  ArrowUpRight,
  BookOpen,
  DollarSign,
  GraduationCap,
  Scale,
  Printer,
  ChevronRight,
  KeyRound,
  FileUp,
  X
} from 'lucide-react';

interface DigitalAccountingSectionProps {
  currentRole: UserRole;
  showToast?: (msg: string) => void;
}

type AccountingSubTab = 
  | 'payroll_upload' 
  | 'student_admissions' 
  | 'operating_expenses' 
  | 'general_journal' 
  | 'balance_sheet' 
  | 'representative_kyc';

export const DigitalAccountingSection: React.FC<DigitalAccountingSectionProps> = ({
  currentRole,
  showToast = (_msg: string) => {}
}) => {
  // Active Tab
  const [activeTab, setActiveTab] = useState<AccountingSubTab>('payroll_upload');

  // 1. Payroll & Batch Upload State
  const [payrollList, setPayrollList] = useState<PayrollRecord[]>(MOCK_PAYROLL_RECORDS);
  const [payrollBatch, setPayrollBatch] = useState<PayrollUploadBatch>(INITIAL_PAYROLL_BATCH);
  const [payrollSearch, setPayrollSearch] = useState<string>('');
  const [smsModalOpen, setSmsModalOpen] = useState<boolean>(false);
  const [enteredSmsCode, setEnteredSmsCode] = useState<string>('');
  const [isProcessingPayroll, setIsProcessingPayroll] = useState<boolean>(false);
  const [payrollDisbursed, setPayrollDisbursed] = useState<boolean>(false);
  const [insuranceFileGenerated, setInsuranceFileGenerated] = useState<boolean>(false);
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  // 2. Student Admissions State
  const [students, setStudents] = useState<StudentAdmission[]>(INITIAL_STUDENT_ADMISSIONS);
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [newStudentModalOpen, setNewStudentModalOpen] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newStudentGrade, setNewStudentGrade] = useState<string>('پایه دهم تجربی');
  const [newStudentNationalCode, setNewStudentNationalCode] = useState<string>('');
  const [newStudentParent, setNewStudentParent] = useState<string>('');
  const [newStudentPhone, setNewStudentPhone] = useState<string>('');
  const [newStudentTuition, setNewStudentTuition] = useState<string>('45000000');
  const [newStudentPlan, setNewStudentPlan] = useState<'cash' | 'installments_parham' | 'cheque'>('installments_parham');
  const [tuitionReminderSending, setTuitionReminderSending] = useState<boolean>(false);

  // 3. Operating Expenses State
  const [expenses, setExpenses] = useState<SchoolOperatingExpense[]>(INITIAL_OPERATING_EXPENSES);
  const [newExpenseModalOpen, setNewExpenseModalOpen] = useState<boolean>(false);
  const [newExpenseTitle, setNewExpenseTitle] = useState<string>('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<SchoolOperatingExpense['category']>('utilities');
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>('12000000');
  const [newExpensePaidTo, setNewExpensePaidTo] = useState<string>('');

  // 4. General Journal State
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);
  const [newJournalModalOpen, setNewJournalModalOpen] = useState<boolean>(false);
  const [newJrnDesc, setNewJrnDesc] = useState<string>('');
  const [newJrnDebitAcc, setNewJrnDebitAcc] = useState<string>('هزینه‌های جاری و اداری (کد ۵۲۰۱)');
  const [newJrnCreditAcc, setNewJrnCreditAcc] = useState<string>('بانک ملت - حساب متمرکز (کد ۱۱۰۱)');
  const [newJrnAmount, setNewJrnAmount] = useState<string>('8500000');

  // 5. School Representative KYC State
  const [repInfo, setRepInfo] = useState<SchoolRepresentative>(INITIAL_REPRESENTATIVE);
  const [repLetterModalOpen, setRepLetterModalOpen] = useState<boolean>(false);

  // Calculations
  const totalBaseSalary = payrollList.reduce((acc, curr) => acc + curr.baseSalary, 0);
  const totalInsuranceDeduction = payrollList.reduce((acc, curr) => acc + curr.insuranceDeduction, 0);
  const totalTaxDeduction = payrollList.reduce((acc, curr) => acc + curr.taxDeduction, 0);
  const totalAdvanceDeduction = payrollList.reduce((acc, curr) => acc + curr.advanceDeduction, 0);
  const totalNetPay = payrollList.reduce((acc, curr) => acc + curr.netPay, 0);

  const totalTuitionApproved = students.reduce((acc, s) => acc + s.totalTuition, 0);
  const totalTuitionCollected = students.reduce((acc, s) => acc + s.paidTuition, 0);
  const totalTuitionRemaining = students.reduce((acc, s) => acc + s.remainingTuition, 0);
  const tuitionCollectionRate = Math.round((totalTuitionCollected / (totalTuitionApproved || 1)) * 100);

  const totalOperatingExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  const totalJournalDebit = journalEntries.reduce((acc, j) => acc + j.debitAmount, 0);
  const totalJournalCredit = journalEntries.reduce((acc, j) => acc + j.creditAmount, 0);

  // Filtering
  const filteredPayroll = payrollList.filter(p => 
    p.teacherName.toLowerCase().includes(payrollSearch.toLowerCase()) || 
    p.role.toLowerCase().includes(payrollSearch.toLowerCase())
  );

  const filteredStudents = students.filter(s =>
    s.studentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.grade.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.parentName.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Actions
  const handleAccountingApproveAndSendSms = () => {
    setPayrollBatch(prev => ({
      ...prev,
      accountingApproved: true,
      founderSmsSent: true
    }));
    setSmsModalOpen(true);
    showToast('تایید حسابداری ثبت شد و پیامک تایید نهایی برای موسس مدرسه ارسال گردید.');
  };

  const handleVerifyFounderSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredSmsCode.trim() === payrollBatch.founderSmsCode || enteredSmsCode.trim() === '8492' || enteredSmsCode.trim().length === 4) {
      setPayrollBatch(prev => ({
        ...prev,
        founderApproved: true
      }));
      setSmsModalOpen(false);
      setEnteredSmsCode('');
      showToast('تایید رسمی موسس با پیامک با موفقیت احراز گردید. دستور پرداخت گروهی فعال شد.');
    } else {
      showToast('کد وارد شده صحیح نیست. لطفاً کد ۸۴۹۲ را وارد نمایید.');
    }
  };

  const handleDisbursePayroll = () => {
    if (!payrollBatch.founderApproved) {
      showToast('خطا: پرداخت گروهی نیازمند تایید رسمی پیامکی موسس است.');
      return;
    }
    setIsProcessingPayroll(true);
    setTimeout(() => {
      setIsProcessingPayroll(false);
      setPayrollDisbursed(true);
      setPayrollList(prev => prev.map(p => ({ ...p, status: 'paid' })));
      showToast('دستور پرداخت گروهی حقوق پایا صادر و به بانک مرکزی ارسال گردید.');
    }, 1500);
  };

  const handleGenerateInsuranceFile = () => {
    setInsuranceFileGenerated(true);
    showToast('دیسکت الکترونیکی بیمه تامین اجتماعی و فایل مالیات حقوق با فرمت استاندارد تولید و بارگذاری گردید.');
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const tuitionNum = parseInt(newStudentTuition.replace(/,/g, ''), 10) || 45000000;
    if (!newStudentName.trim()) return;

    const newStd: StudentAdmission = {
      id: `std-${Date.now()}`,
      studentName: newStudentName,
      grade: newStudentGrade,
      nationalCode: newStudentNationalCode || '۰۰' + Math.floor(10000000 + Math.random() * 90000000),
      parentName: newStudentParent || 'ولی محترم',
      parentPhone: newStudentPhone || '۰۹۱۲' + Math.floor(1000000 + Math.random() * 9000000),
      totalTuition: tuitionNum,
      paidTuition: newStudentPlan === 'cash' ? tuitionNum : Math.round(tuitionNum * 0.4),
      remainingTuition: newStudentPlan === 'cash' ? 0 : Math.round(tuitionNum * 0.6),
      paymentPlan: newStudentPlan,
      status: newStudentPlan === 'cash' ? 'settled' : 'active',
      registrationDate: '۱۴۰۳/۰۸/۲۵'
    };

    setStudents([newStd, ...students]);
    setNewStudentModalOpen(false);
    setNewStudentName('');
    setNewStudentNationalCode('');
    setNewStudentParent('');
    setNewStudentPhone('');
    showToast(`دانش‌آموز «${newStd.studentName}» با موفقیت ثبت‌نام و پرونده مالی ایجاد شد.`);
  };

  const handleSendTuitionReminders = () => {
    setTuitionReminderSending(true);
    setTimeout(() => {
      setTuitionReminderSending(false);
      showToast('پیامک یادآوری هوشمند سررسید اقساط شهریه برای اولیای معوق ارسال شد.');
    }, 1200);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(newExpenseAmount.replace(/,/g, ''), 10) || 5000000;
    if (!newExpenseTitle.trim()) return;

    const categoryMap: Record<SchoolOperatingExpense['category'], string> = {
      utilities: 'قبوض و انرژی',
      equipment: 'تجهیزات و آزمایشگاه',
      maintenance: 'تعمیر و نگهداری',
      catering: 'پذیرایی و کترینگ',
      consumables: 'مصرفی و نرم‌افزار',
      transport: 'سرویس و ترابری',
      other: 'سایر هزینه‌ها'
    };

    const newExp: SchoolOperatingExpense = {
      id: `exp-${Date.now()}`,
      title: newExpenseTitle,
      category: newExpenseCategory,
      categoryFa: categoryMap[newExpenseCategory],
      amount: amountNum,
      date: '۱۴۰۳/۰۸/۲۵',
      invoiceNumber: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
      paidTo: newExpensePaidTo || 'طرف حساب فاکتور',
      status: 'paid',
      receiptAttached: true
    };

    setExpenses([newExp, ...expenses]);
    setNewExpenseModalOpen(false);
    setNewExpenseTitle('');
    setNewExpensePaidTo('');
    showToast('هزینه جاریه جدید ثبت و فاکتور مالی ضمیمه شد.');
  };

  const handleCreateJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(newJrnAmount.replace(/,/g, ''), 10) || 5000000;
    if (!newJrnDesc.trim()) return;

    const newJrn: JournalEntry = {
      id: `jrn-${Date.now()}`,
      docNumber: journalEntries.length + 1042,
      date: '۱۴۰۳/۰۸/۲۵',
      description: newJrnDesc,
      debitAccount: newJrnDebitAcc,
      creditAccount: newJrnCreditAcc,
      debitAmount: amountNum,
      creditAmount: amountNum,
      status: 'permanent',
      registrar: repInfo.fullName
    };

    setJournalEntries([newJrn, ...journalEntries]);
    setNewJournalModalOpen(false);
    setNewJrnDesc('');
    showToast('سند حسابداری با تراز دوبل در دفتر روزنامه ثبت قطعی شد.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-indigo-800 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-400/30">
              <Calculator className="w-3.5 h-3.5" />
              <span>سامانه جامع حسابداری دیجیتال مدارس پرهام</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              سیستم مالی، حسابداری ابری و مدیریت حقوق و شهریه
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              اتوماسیون کامل بارگذاری فایل حقوق، تایید پیامکی موسس، احراز هویت نماینده مدرسه، ثبت‌نام و مدیریت شهریه دانش‌آموزان، کنترل هزینه‌های جاریه، دفتر روزنامه و ترازنامه مالی.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs shrink-0">
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <span className="text-[11px] text-indigo-200 block mb-1">خالص حقوق این ماه</span>
              <span className="text-base font-extrabold text-white">{formatTomans(totalNetPay)}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <span className="text-[11px] text-indigo-200 block mb-1">شهریه وصول شده</span>
              <span className="text-base font-extrabold text-emerald-300">{formatTomans(totalTuitionCollected)}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <span className="text-[11px] text-indigo-200 block mb-1">نماینده رسمی مدرسه</span>
              <span className="text-xs font-extrabold text-teal-300 flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>احراز هویت شده ✓</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modular Sub-Tabs Switcher */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs overflow-x-auto no-scrollbar gap-1.5">
        
        <button
          onClick={() => setActiveTab('payroll_upload')}
          className={`py-3 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'payroll_upload'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-sky-400" />
          <span>۱. بارگذاری حقوق و تایید موسس</span>
          {payrollBatch.founderApproved ? (
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md font-bold">تایید شده ✓</span>
          ) : (
            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-md font-bold">نیاز به تایید</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('student_admissions')}
          className={`py-3 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'student_admissions'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>۲. ورودی و ثبت‌نام دانش‌آموزان و شهریه</span>
          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-bold">
            {toPersianDigits(students.length)} پرونده
          </span>
        </button>

        <button
          onClick={() => setActiveTab('operating_expenses')}
          className={`py-3 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'operating_expenses'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Receipt className="w-4 h-4 text-rose-400" />
          <span>۳. هزینه‌های جاریه مدرسه</span>
        </button>

        <button
          onClick={() => setActiveTab('general_journal')}
          className={`py-3 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'general_journal'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>۴. دفتر روزنامه و اسناد</span>
        </button>

        <button
          onClick={() => setActiveTab('balance_sheet')}
          className={`py-3 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'balance_sheet'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Scale className="w-4 h-4 text-indigo-400" />
          <span>۵. ترازنامه و سود و زیان</span>
        </button>

        <button
          onClick={() => setActiveTab('representative_kyc')}
          className={`py-3 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'representative_kyc'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>۶. احراز هویت نماینده مدرسه</span>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: بارگذاری فایل حقوق، تایید حسابداری و ارسال پیامک تایید موسس */}
      {/* ========================================================================= */}
      {activeTab === 'payroll_upload' && (
        <div className="space-y-6">
          
          {/* Payroll File Upload Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">بارگذاری و پردازش فایل حقوق و دستمزد</h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                    فرمت اکسل / CSV / دیسکت شتاب
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  فایل حقوق را بارگذاری کرده، پس از تایید حسابداری، پیامک احراز به شماره موسس مدرسه ارسال می‌شود و با تایید ایشان دستور پرداخت نهایی صادر می‌گردد.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold transition-all"
                >
                  <FileUp className="w-4 h-4 text-sky-600" />
                  <span>بارگذاری فایل جدید اکسل</span>
                </button>

                <button
                  onClick={() => showToast('نمونه فایل اکسل استاندارد حقوق و دستمزد پرهام دانلود شد.')}
                  className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition-all"
                  title="دانلود قالب اکسل نمونه"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>قالب نمونه</span>
                </button>
              </div>
            </div>

            {/* Current Batch Info & Workflow Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* File Info */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>فایل جاری بارگذاری‌شده</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {payrollBatch.fileSize}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 pt-1">
                  <div className="font-mono font-bold text-slate-900 bg-white p-2 rounded-xl border border-slate-200 text-left dir-ltr">
                    {payrollBatch.fileName}
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>زمان بارگذاری:</span>
                    <span>{payrollBatch.uploadDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>تعداد پرسنل و معلمان:</span>
                    <span className="font-bold text-slate-900">{toPersianDigits(payrollBatch.recordsCount)} نفر</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>مجموع ناخالص:</span>
                    <span className="font-bold text-slate-900">{formatTomans(payrollBatch.totalGrossSalary)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold border-t border-slate-200 pt-1.5">
                    <span>خالص پرداختی پایا:</span>
                    <span>{formatTomans(payrollBatch.totalNetPay)}</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Accounting Approval */}
              <div className={`rounded-2xl p-4 border space-y-3 transition-all ${
                payrollBatch.accountingApproved
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className={`w-4 h-4 ${payrollBatch.accountingApproved ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>گام اول: تایید حسابداری مدرسه</span>
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    payrollBatch.accountingApproved
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {payrollBatch.accountingApproved ? 'تایید شده ✓' : 'در انتظار بررسی'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  تطبیق کارکرد معلمان، محاسبات کسر بیمه و بازپرداخت مساعده‌ها توسط حسابدار رسمی مدرسه بررسی و تایید می‌گردد.
                </p>

                <div className="pt-2">
                  {!payrollBatch.accountingApproved ? (
                    <button
                      onClick={handleAccountingApproveAndSendSms}
                      className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>تایید حسابداری و ارسال پیامک به موسس</span>
                    </button>
                  ) : (
                    <div className="text-[11px] text-emerald-800 font-bold bg-white/80 p-2 rounded-xl border border-emerald-200 text-center">
                      تایید حسابداری ثبت شد و درخواست به موسس ارسال شد ✓
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Founder SMS Verification */}
              <div className={`rounded-2xl p-4 border space-y-3 transition-all ${
                payrollBatch.founderApproved
                  ? 'bg-teal-50 border-teal-200 text-teal-950'
                  : payrollBatch.founderSmsSent
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Phone className={`w-4 h-4 ${payrollBatch.founderApproved ? 'text-teal-600' : 'text-amber-500'}`} />
                    <span>گام دوم: پیامک تایید موسس</span>
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    payrollBatch.founderApproved
                      ? 'bg-teal-200 text-teal-900'
                      : payrollBatch.founderSmsSent
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {payrollBatch.founderApproved ? 'تایید رسمی موسس صادر شد' : payrollBatch.founderSmsSent ? 'پیامک ارسال شد' : 'مرحله بعد'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <div>شماره موسس: <strong className="text-slate-900">{payrollBatch.founderPhone}</strong></div>
                  <div className="text-[10px] text-slate-500">{payrollBatch.founderName}</div>
                </div>

                <div className="pt-2">
                  {!payrollBatch.founderApproved ? (
                    <button
                      disabled={!payrollBatch.founderSmsSent}
                      onClick={() => setSmsModalOpen(true)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                        payrollBatch.founderSmsSent
                          ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>ثبت کد تایید پیامکی موسس ({payrollBatch.founderSmsCode})</span>
                    </button>
                  ) : (
                    <div className="text-[11px] text-teal-800 font-bold bg-white/80 p-2 rounded-xl border border-teal-200 text-center">
                      مجوز رسمی پرداخت توسط موسس تایید گردید ✓
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">مجموع حقوق ناخالص</span>
              <div className="text-lg font-extrabold text-slate-900">{formatTomans(totalBaseSalary)}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">پایه قرارداد کادر و معلمان</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">کسورات حق بیمه تامین اجتماعی</span>
              <div className="text-lg font-extrabold text-sky-600">{formatTomans(totalInsuranceDeduction)}</div>
              <span className="text-[11px] text-sky-600/80 mt-1 block">سهم ۷٪ کارمند + لیست الکترونیک</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">تسویه خودکار مساعده و وام</span>
              <div className="text-lg font-extrabold text-amber-600">{formatTomans(totalAdvanceDeduction)}</div>
              <span className="text-[11px] text-amber-700/80 mt-1 block">کسر اقساط پیش از موعد پرهام</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">خالص قابل پرداخت پایا</span>
              <div className="text-lg font-extrabold text-emerald-600">{formatTomans(totalNetPay)}</div>
              <span className="text-[11px] text-emerald-700/80 mt-1 block">دستور واریز مستقیم به شبای بانکی</span>
            </div>
          </div>

          {/* Action Header & Tools */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                value={payrollSearch}
                onChange={(e) => setPayrollSearch(e.target.value)}
                placeholder="جستجوی نام همکار، عنوان شغلی یا شبا..."
                className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-sky-500 focus:bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleGenerateInsuranceFile}
                className="flex items-center gap-2 px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-sky-600" />
                <span>{insuranceFileGenerated ? 'دیسکت بیمه آماده است ✓' : 'تولید دیسکت بیمه و مالیات'}</span>
              </button>

              <button
                disabled={isProcessingPayroll || payrollDisbursed || !payrollBatch.founderApproved}
                onClick={handleDisbursePayroll}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                  payrollDisbursed
                    ? 'bg-emerald-600 cursor-default'
                    : !payrollBatch.founderApproved
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : isProcessingPayroll
                    ? 'bg-slate-400 cursor-wait'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {payrollDisbursed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>حقوق ماه تسویه و پرداخت شد</span>
                  </>
                ) : isProcessingPayroll ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin text-white" />
                    <span>در حال صدور حواله‌های پایا...</span>
                  </>
                ) : !payrollBatch.founderApproved ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>در انتظار تایید پیامکی موسس</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-sky-300" />
                    <span>پرداخت گروهی حقوق (پایا)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">لیست حقوق و دستمزد ماهانه کادر آموزشی و اجرایی</h3>
                <p className="text-xs text-slate-500 mt-0.5">محاسبه دقیق کسورات قانونی بیمه و مساعده‌ها</p>
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                آبان ماه ۱۴۰۳
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4">نام و سمت همکار</th>
                    <th className="py-3 px-4">شماره شبای بانکی</th>
                    <th className="py-3 px-4">پایه حقوق</th>
                    <th className="py-3 px-4">بیمه تامین اجتماعی</th>
                    <th className="py-3 px-4">مالیات حقوق</th>
                    <th className="py-3 px-4">کسر مساعده</th>
                    <th className="py-3 px-4 text-emerald-700">خالص پرداختی</th>
                    <th className="py-3 px-4 text-center">وضعیت</th>
                    <th className="py-3 px-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredPayroll.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        <div>{item.teacherName}</div>
                        <span className="text-[11px] text-slate-400 font-normal">{item.role}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px] dir-ltr text-right">
                        {item.iban.slice(0, 8)}...{item.iban.slice(-4)}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {formatTomans(item.baseSalary)}
                      </td>
                      <td className="py-3.5 px-4 text-sky-700 font-medium">
                        {formatTomans(item.insuranceDeduction)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {formatTomans(item.taxDeduction)}
                      </td>
                      <td className="py-3.5 px-4 text-amber-700 font-medium">
                        {item.advanceDeduction > 0 ? formatTomans(item.advanceDeduction) : '—'}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700 text-sm">
                        {formatTomans(item.netPay)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.status === 'paid' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full font-bold">
                            <Check className="w-3 h-3" />
                            <span>واریز شد</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-full font-bold">
                            <Clock className="w-3 h-3" />
                            <span>آماده واریز</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedPayslip(item)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>فیش حقوقی</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: ورودی و ثبت‌نام دانش‌آموزان و مدیریت شهریه */}
      {/* ========================================================================= */}
      {activeTab === 'student_admissions' && (
        <div className="space-y-6">
          
          {/* Tuition Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">کل شهریه مصوب ثبت‌نامی</span>
              <div className="text-lg font-extrabold text-slate-900">{formatTomans(totalTuitionApproved)}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">بر اساس {toPersianDigits(students.length)} پرونده ثبت‌نامی</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">شهریه وصول‌شده (نقد و پرهام)</span>
              <div className="text-lg font-extrabold text-emerald-600">{formatTomans(totalTuitionCollected)}</div>
              <span className="text-[11px] text-emerald-700/80 mt-1 block">درصد وصولی: {toPersianDigits(tuitionCollectionRate)}٪</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">مانده معوقه و اقساط در جریان</span>
              <div className="text-lg font-extrabold text-amber-600">{formatTomans(totalTuitionRemaining)}</div>
              <span className="text-[11px] text-amber-700/80 mt-1 block">اقساط آتی اولیا و چک‌های صیادی</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">نرخ وصول و وصول خودکار</span>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${tuitionCollectionRate}%` }} />
                </div>
              </div>
              <button
                onClick={handleSendTuitionReminders}
                disabled={tuitionReminderSending}
                className="mt-3 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                {tuitionReminderSending ? (
                  <>
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>در حال ارسال پیامک...</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ارسال پیامک یادآور به اولیا</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Header */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="جستجوی نام دانش‌آموز، پایه یا شماره والد..."
                className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <button
              onClick={() => setNewStudentModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-all hover:scale-102 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت‌نام و ورودی دانش‌آموز جدید</span>
            </button>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">لیست ثبت‌نامی‌ها و پرونده‌های شهریه دانش‌آموزان</h3>
                <p className="text-xs text-slate-500 mt-0.5">وضعیت پرداخت نقدی، اقساطی پرهام و چک‌های صیادی</p>
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                سال تحصیلی ۱۴۰۴ - ۱۴۰۳
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4">نام دانش‌آموز</th>
                    <th className="py-3 px-4">پایه و رشته</th>
                    <th className="py-3 px-4">نام و شماره تماس ولی</th>
                    <th className="py-3 px-4">شهریه مصوب</th>
                    <th className="py-3 px-4 text-emerald-700">پرداختی تا کنون</th>
                    <th className="py-3 px-4 text-amber-700">مانده بدهی</th>
                    <th className="py-3 px-4">پلن پرداخت</th>
                    <th className="py-3 px-4 text-center">وضعیت تسویه</th>
                    <th className="py-3 px-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div>{std.studentName}</div>
                        <span className="text-[10px] text-slate-400 font-normal">کد ملی: {std.nationalCode}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {std.grade}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{std.parentName}</div>
                        <span className="text-[11px] text-slate-400 font-mono">{std.parentPhone}</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatTomans(std.totalTuition)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700">
                        {formatTomans(std.paidTuition)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-amber-700">
                        {std.remainingTuition > 0 ? formatTomans(std.remainingTuition) : 'تسویه شده ✓'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {std.paymentPlan === 'cash' && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold text-[10px]">نقدی یکجا</span>}
                        {std.paymentPlan === 'installments_parham' && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-bold text-[10px]">اقساطی پرهام</span>}
                        {std.paymentPlan === 'cheque' && <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold text-[10px]">چک صیادی</span>}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {std.status === 'settled' && (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full text-[10px] font-bold inline-block">
                            تسویه ۱۰۰٪
                          </span>
                        )}
                        {std.status === 'active' && (
                          <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2 py-1 rounded-full text-[10px] font-bold inline-block">
                            اقساط منظم
                          </span>
                        )}
                        {std.status === 'overdue' && (
                          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-1 rounded-full text-[10px] font-bold inline-block">
                            معوقه سررسید
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => showToast(`رسید پرداخت و کارت شهریه برای «${std.studentName}» صادر گردید.`)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>رسید شهریه</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: هزینه‌های جاریه مدرسه */}
      {/* ========================================================================= */}
      {activeTab === 'operating_expenses' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">مجموع هزینه‌های جاریه ثبت‌شده</span>
              <div className="text-lg font-extrabold text-rose-600">{formatTomans(totalOperatingExpenses)}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">تعداد فاکتورها: {toPersianDigits(expenses.length)} فقره</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">قبوض و انرژی موتورخانه</span>
              <div className="text-lg font-extrabold text-slate-900">{formatTomans(14800000)}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">گاز، برق، آب و نگهداری تاسیسات</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">تجهیزات آزمایشگاه و IT</span>
              <div className="text-lg font-extrabold text-slate-900">{formatTomans(32500000)}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">رباتیک، هوش مصنوعی و تجهیزات سرور</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">کترینگ، پذیرایی و مصرفی</span>
              <div className="text-lg font-extrabold text-slate-900">{formatTomans(24100000)}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">بوفه سالم، چاپ آزمون‌ها و اینترنت</span>
            </div>
          </div>

          {/* Action Header */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">دفتر ثبت هزینه‌های روزمره و جاریه مدرسه</h3>
              <p className="text-xs text-slate-500 mt-0.5">ثبت کلیه فاکتورها با شماره پیگیری و پیوست اسناد</p>
            </div>

            <button
              onClick={() => setNewExpenseModalOpen(true)}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-all hover:scale-102 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت فاکتور هزینه جاریه جدید</span>
            </button>
          </div>

          {/* Expenses Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4">شرح هزینه جاریه</th>
                    <th className="py-3 px-4">دسته‌بندی</th>
                    <th className="py-3 px-4">شماره فاکتور</th>
                    <th className="py-3 px-4">طرف حساب (دریافت‌کننده)</th>
                    <th className="py-3 px-4">تاریخ ثبت</th>
                    <th className="py-3 px-4 text-rose-700">مبلغ هزینه</th>
                    <th className="py-3 px-4 text-center">وضعیت سند</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {exp.title}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                          {exp.categoryFa}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {exp.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800">
                        {exp.paidTo}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {exp.date}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-rose-700 text-sm">
                        {formatTomans(exp.amount)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                          <Check className="w-3 h-3" />
                          <span>تسویه شده ✓</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: دفتر روزنامه و اسناد حسابداری */}
      {/* ========================================================================= */}
      {activeTab === 'general_journal' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">جمع گردش بدهکار (Debit)</span>
              <div className="text-lg font-extrabold text-slate-900">{formatTomans(totalJournalDebit)}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">تراز دفتر روزنامه</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 block mb-1">جمع گردش بستانکار (Credit)</span>
              <div className="text-lg font-extrabold text-slate-900">{formatTomans(totalJournalCredit)}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">تراز با جمع بدهکار</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">وضعیت تراز دفتر روزنامه</span>
                <span className="text-emerald-700 font-black text-sm flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>کاملاً تراز و منطبق (اختلاف صفر)</span>
                </span>
              </div>
              <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-xs font-bold">
                Balance: 0
              </span>
            </div>
          </div>

          {/* Action Header */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">دفتر روزنامه رسمی آموزشگاه</h3>
              <p className="text-xs text-slate-500 mt-0.5">ثبت دوطرفه کلیه رویدادهای مالی بر اساس استانداردهای حسابداری</p>
            </div>

            <button
              onClick={() => setNewJournalModalOpen(true)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-all hover:scale-102 active:scale-98"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>ثبت سند حسابداری جدید در دفتر روزنامه</span>
            </button>
          </div>

          {/* Journal Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4">شماره سند</th>
                    <th className="py-3 px-4">تاریخ</th>
                    <th className="py-3 px-4">شرح سند حسابداری</th>
                    <th className="py-3 px-4">حساب بدهکار</th>
                    <th className="py-3 px-4">حساب بستانکار</th>
                    <th className="py-3 px-4">مبلغ (تومان)</th>
                    <th className="py-3 px-4">ثبت‌کننده</th>
                    <th className="py-3 px-4 text-center">وضعیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {journalEntries.map((jrn) => (
                    <tr key={jrn.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        #{jrn.docNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {jrn.date}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">
                        {jrn.description}
                      </td>
                      <td className="py-3.5 px-4 text-sky-800 font-medium">
                        {jrn.debitAccount}
                      </td>
                      <td className="py-3.5 px-4 text-amber-800 font-medium">
                        {jrn.creditAccount}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900 text-sm">
                        {formatTomans(jrn.debitAmount)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        {jrn.registrar}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold text-[10px]">
                          سند قطعی ✓
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: ترازنامه و صورت‌های مالی */}
      {/* ========================================================================= */}
      {activeTab === 'balance_sheet' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">ترازنامه مالی رسمی مجتمع آموزشی هوشمند علامه</h3>
                <p className="text-xs text-slate-500 mt-0.5">منتهی به ۲۵ آبان‌ماه ۱۴۰۳ (تنظیم‌شده بر اساس استاندارد حسابداری مدارس غیردولتی)</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('خروجی رسمی ترازنامه جهت ارائه به آموزش و پرورش و اداره مالیاتی چاپ شد.')}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>چاپ رسمی ترازنامه</span>
                </button>
              </div>
            </div>

            {/* Double-column Balance Sheet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Assets Column */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>دارایی‌ها (Assets)</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-700">ارقام به تومان</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="font-bold text-slate-800 text-[11px] text-slate-500">دارایی‌های جاری:</div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>موجودی نقد و حساب‌های جاری بانکی:</span>
                    <span className="font-bold text-slate-900">{formatTomans(285000000)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>اسناد دریافتنی شهریه (چک‌های صیادی معتبر):</span>
                    <span className="font-bold text-slate-900">{formatTomans(232000000)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>مطالبات اقساط شهریه در جریان پرهام:</span>
                    <span className="font-bold text-slate-900">{formatTomans(145000000)}</span>
                  </div>

                  <div className="font-bold text-slate-800 text-[11px] text-slate-500 pt-2">دارایی‌های ثابت و سرمایه‌ای:</div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>تجهیزات هوشمند، آزمایشگاه و اتاق سرور:</span>
                    <span className="font-bold text-slate-900">{formatTomans(450000000)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>ودیعه رهن و اجاره ساختمان آموزشی مجتمع:</span>
                    <span className="font-bold text-slate-900">{formatTomans(800000000)}</span>
                  </div>

                  <div className="border-t-2 border-slate-300 pt-3 flex justify-between text-sm font-black text-emerald-800">
                    <span>جمع کل دارایی‌ها:</span>
                    <span>{formatTomans(1912000000)}</span>
                  </div>
                </div>
              </div>

              {/* Liabilities & Equity Column */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span>بدهی‌ها و سرمایه (Liabilities & Equity)</span>
                  </h4>
                  <span className="text-xs font-bold text-indigo-700">ارقام به تومان</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="font-bold text-slate-800 text-[11px] text-slate-500">بدهی‌های جاری:</div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>حقوق و دستمزد معوق قابل پرداخت به اساتید:</span>
                    <span className="font-bold text-slate-900">{formatTomans(113070000)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>بیمه تامین اجتماعی و مالیات تکلیفی پرداختنی:</span>
                    <span className="font-bold text-slate-900">{formatTomans(27800000)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>پیش‌دریافت شهریه سال تحصیلی جاری:</span>
                    <span className="font-bold text-slate-900">{formatTomans(350000000)}</span>
                  </div>

                  <div className="font-bold text-slate-800 text-[11px] text-slate-500 pt-2">حقوق صاحبان سهام و موسسه:</div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>سرمایه اولیه موسس مجتمع:</span>
                    <span className="font-bold text-slate-900">{formatTomans(1100000000)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-xl border border-slate-100">
                    <span>سود انباشته و مازاد نقدینگی عملیاتی:</span>
                    <span className="font-bold text-emerald-700">+{formatTomans(321130000)}</span>
                  </div>

                  <div className="border-t-2 border-slate-300 pt-3 flex justify-between text-sm font-black text-indigo-900">
                    <span>جمع کل بدهی‌ها و سرمایه:</span>
                    <span>{formatTomans(1912000000)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Income Statement & Article 134 Exemption */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl text-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-black text-sm text-white">معافیت ۱۰۰٪ مالیاتی فعالیت‌های آموزشی (ماده ۱۳۴ قانون مالیات‌های مستقیم)</h4>
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  سازگار با سامانه مودیان و اظهارنامه
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                بر اساس ماده ۱۳۴ قانون مالیات‌های مستقیم، کلیه درآمدهای حاصل از تعلیم و تربیت مدارس غیردولتی معاف از مالیات بر عملکرد می‌باشد. سامانه حسابداری پرهام صورت سود و زیان و ترازنامه را منطبق بر دفاتر قانونی تولید نموده و فایل استاندارد اظهارنامه عملکرد را در اختیار حسابدار قرار می‌دهد.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 6: احراز هویت نماینده مدرسه */}
      {/* ========================================================================= */}
      {activeTab === 'representative_kyc' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">احراز هویت و معرفی‌نامه نماینده رسمی مدرسه</h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    سطح ۳ حقوقی فعال
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  مشخصات نماینده قانونی، معاون مالی یا حسابدار رسمی معرفی‌شده توسط موسس آموزشگاه جهت کلیه عملیات بانکی و حقوق.
                </p>
              </div>

              <button
                onClick={() => setRepLetterModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>مشاهده معرفی‌نامه رسمی موسس</span>
              </button>
            </div>

            {/* Representative Details Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-500/20">
                    {repInfo.fullName.slice(0, 1)}
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900">{repInfo.fullName}</h4>
                    <span className="text-xs text-emerald-700 font-semibold">{repInfo.role}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs pt-2 border-t border-slate-200">
                  <div className="flex justify-between text-slate-600">
                    <span>کد ملی نماینده:</span>
                    <span className="font-mono font-bold text-slate-900">{repInfo.nationalCode}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>شماره تلفن همراه معتبر:</span>
                    <span className="font-mono font-bold text-slate-900">{repInfo.phone}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>نام مجتمع آموزشی:</span>
                    <span className="font-bold text-slate-900">{repInfo.schoolName}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>کد شناسایی مدرسه در آموزش و پرورش:</span>
                    <span className="font-mono font-bold text-slate-900">{repInfo.schoolCode}</span>
                  </div>
                </div>
              </div>

              {/* Verification Badges & Letter Expiry */}
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-200 space-y-4">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                  <span>وضعیت اعتبارسنجی در پرهام: تایید شده رسمی</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-700">
                    <span>نوع معرفی‌نامه:</span>
                    <span className="font-bold text-slate-900">{repInfo.authorizationLetterTitle}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>تاریخ صدور معرفی‌نامه:</span>
                    <span className="font-bold text-slate-900">{repInfo.authorizationIssueDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>تاریخ انقضای اعتبار:</span>
                    <span className="font-bold text-slate-900">{repInfo.authorizationExpiryDate} (معتبر)</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>تاریخ و مرجع احراز:</span>
                    <span className="font-bold text-emerald-800">{repInfo.verifiedAt}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 text-[11px] text-emerald-900 font-semibold leading-relaxed">
                    {repInfo.level}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: شبیه‌ساز پیامک تایید موسس مدرسه */}
      {/* ========================================================================= */}
      {smsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-6">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-amber-600 font-bold block mb-1">سامانه تایید پیامکی پرهام</span>
                <h3 className="text-sm sm:text-base font-black text-slate-900">احراز هویت و صدور تاییدیه پیامکی توسط موسس</h3>
              </div>
              <button
                onClick={() => setSmsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated SMS Message Bubble */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>پیامک دریافتی در گوشی موسس مدرسه ({payrollBatch.founderPhone})</span>
                </span>
                <span className="font-mono">هم‌اکنون</span>
              </div>

              <div className="text-xs leading-relaxed text-slate-200 whitespace-pre-line bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                {`موسس محترم مجتمع علامه؛ جناب آقای دکتر صادقی؛
فایل حقوق و دستمزد آبان ماه با ۶ ردیف و خالص پرداختی ۱۱۳,۰۷۰,۰۰۰ تومان توسط حسابداری بررسی و تایید گردید.
جهت صدور دستور واریز گروهی پایا، کد تایید زیر را ثبت نمایید:

کد تایید: ${payrollBatch.founderSmsCode}
سامانه هوشمند فین‌تک مدارس پرهام`}
              </div>
            </div>

            {/* Code Entry Form */}
            <form onSubmit={handleVerifyFounderSms} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  کد ۴ رقمی ارسال‌شده به تلفن همراه موسس را وارد کنید:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredSmsCode}
                    onChange={(e) => setEnteredSmsCode(e.target.value)}
                    placeholder="کد تایید (مثال: ۸۴۹۲)"
                    className="flex-1 text-center font-mono text-lg font-black tracking-widest py-3 px-4 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-amber-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setEnteredSmsCode(payrollBatch.founderSmsCode)}
                    className="px-3 py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold whitespace-nowrap transition-colors"
                  >
                    درج خودکار کد تست ({payrollBatch.founderSmsCode})
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSmsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
                >
                  تایید نهایی و صدور مجوز پرداخت
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: مشاهده معرفی‌نامه رسمی نماینده مدرسه */}
      {/* ========================================================================= */}
      {repLetterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-teal-600 font-bold block">مستندات احراز هویت پرهام</span>
                <h3 className="text-sm sm:text-base font-black text-slate-900">معرفی‌نامه رسمی نماینده تام‌الاختیار مالی</h3>
              </div>
              <button
                onClick={() => setRepLetterModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Letter Preview */}
            <div className="bg-amber-50/30 p-6 rounded-2xl border border-amber-200/80 space-y-4 text-xs leading-relaxed text-slate-800 font-serif">
              <div className="text-center font-bold text-sm text-slate-900 border-b border-amber-200/60 pb-3">
                مجتمع آموزشی غیردولتی هوشمند علامه
                <div className="text-[10px] text-slate-500 font-normal mt-1">شماره ثبت: ۹۵۰۴۸۲۱۷ | ناحیه ۲ آموزش و پرورش</div>
              </div>

              <p>
                <strong>به:</strong> مدیریت محترم امور اعتبارات و عملیات بانکی سامانه پرهام<br />
                <strong>موضوع:</strong> معرفی نماینده رسمی و امضای مجاز امور مالی و حقوق
              </p>

              <p>
                با سلام و احترام، بدین‌وسیله <strong>سرکار خانم مریم سعادتی</strong> به شماره ملی <strong>۰۰۸۳۹۲۱۴۸۲</strong> به عنوان معاونت مالی و حسابدار رسمی این مجتمع معرفی می‌گردند. کلیه اقدامات نامبرده در زمینه بارگذاری لیست حقوق، صدور اسناد حسابداری، وصول شهریه‌ها و ثبت درخواست‌های اعتباری تا سقف ۵۰۰,۰۰۰,۰۰۰ تومان در روز مورد تایید رسمی این مرکز آموزشی می‌باشد.
              </p>

              <div className="flex justify-between items-end pt-4 border-t border-amber-200/60 text-slate-700">
                <div>
                  تاریخ: ۱۵ فروردین ۱۴۰۳<br />
                  پیوست: حکم کارگزینی
                </div>
                <div className="text-center">
                  <strong>دکتر محمد صادقی</strong><br />
                  <span className="text-[10px] text-slate-500">موسس و مدیر مجتمع آموزشی علامه</span><br />
                  <span className="text-[10px] text-emerald-700 font-bold">[مهر و امضای دیجیتال تایید شد ✓]</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setRepLetterModalOpen(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ثبت‌نام دانش‌آموز جدید */}
      {/* ========================================================================= */}
      {newStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">ثبت‌نام دانش‌آموز جدید و تشکیل پرونده شهریه</h3>
              <button onClick={() => setNewStudentModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">نام و نام‌خانوادگی دانش‌آموز:</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="مثال: آرتین رضایی"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">پایه تحصیلی:</label>
                  <select
                    value={newStudentGrade}
                    onChange={(e) => setNewStudentGrade(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="پایه دهم تجربی">پایه دهم تجربی</option>
                    <option value="پایه یازدهم ریاضی">پایه یازدهم ریاضی</option>
                    <option value="پایه دوازدهم انسانی">پایه دوازدهم انسانی</option>
                    <option value="پایه هفتم دوره اول">پایه هفتم دوره اول</option>
                    <option value="پایه هشتم دوره اول">پایه هشتم دوره اول</option>
                    <option value="پایه نهم دوره اول">پایه نهم دوره اول</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">کد ملی دانش‌آموز:</label>
                  <input
                    type="text"
                    value={newStudentNationalCode}
                    onChange={(e) => setNewStudentNationalCode(e.target.value)}
                    placeholder="۰۰۱۲۳۴۵۶۷۸"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام ولی / سرپرست:</label>
                  <input
                    type="text"
                    value={newStudentParent}
                    onChange={(e) => setNewStudentParent(e.target.value)}
                    placeholder="مثال: دکتر رضایی"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">شماره همراه ولی:</label>
                  <input
                    type="text"
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    placeholder="۰۹۱۲..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">مبلغ کل شهریه مصوب (تومان):</label>
                <input
                  type="text"
                  value={newStudentTuition}
                  onChange={(e) => setNewStudentTuition(e.target.value)}
                  placeholder="۴۵,۰۰۰,۰۰۰"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">روش پرداخت و تسویه:</label>
                <select
                  value={newStudentPlan}
                  onChange={(e) => setNewStudentPlan(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="installments_parham">اقساط ماهانه هوشمند پرهام (BNPL شهریه)</option>
                  <option value="cash">نقدی یکجا با تخفیف ۵٪</option>
                  <option value="cheque">چک‌های صیادی بنفش</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewStudentModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs"
                >
                  ثبت پرونده دانش‌آموز
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: ثبت هزینه جاریه جدید */}
      {/* ========================================================================= */}
      {newExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">ثبت فاکتور هزینه جاریه مدرسه</h3>
              <button onClick={() => setNewExpenseModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">شرح فاکتور و هزینه:</label>
                <input
                  type="text"
                  required
                  value={newExpenseTitle}
                  onChange={(e) => setNewExpenseTitle(e.target.value)}
                  placeholder="مثال: خرید مواد شیمیایی آزمایشگاه و کیت میکروسکوپ"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">دسته‌بندی سرفصل هزینه:</label>
                <select
                  value={newExpenseCategory}
                  onChange={(e) => setNewExpenseCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="utilities">قبوض و انرژی (گاز، برق، آب)</option>
                  <option value="equipment">تجهیزات آموزشی و آزمایشگاهی</option>
                  <option value="maintenance">تعمیر، بهسازی و نگهداری موتورخانه</option>
                  <option value="catering">کترینگ، بوفه و تغذیه دانش‌آموزی</option>
                  <option value="consumables">کاغذ، چاپ امتحانات و نرم‌افزار</option>
                  <option value="transport">سرویس ایاب و ذهاب دانش‌آموزان</option>
                  <option value="other">سایر مصارف عمومی</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">مبلغ فاکتور (تومان):</label>
                <input
                  type="text"
                  required
                  value={newExpenseAmount}
                  onChange={(e) => setNewExpenseAmount(e.target.value)}
                  placeholder="مثال: ۱۲,۵۰۰,۰۰۰"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">طرف حساب (دریافت‌کننده وجه / شرکت):</label>
                <input
                  type="text"
                  value={newExpensePaidTo}
                  onChange={(e) => setNewExpensePaidTo(e.target.value)}
                  placeholder="مثال: شرکت تجهیزات پارس آزما"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewExpenseModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-xs"
                >
                  ثبت قطعی هزینه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: ثبت سند دوبل دفتر روزنامه */}
      {/* ========================================================================= */}
      {newJournalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">ثبت سند حسابداری جدید در دفتر روزنامه</h3>
              <button onClick={() => setNewJournalModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateJournalEntry} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">شرح رویداد مالی / سند:</label>
                <input
                  type="text"
                  required
                  value={newJrnDesc}
                  onChange={(e) => setNewJrnDesc(e.target.value)}
                  placeholder="مثال: وصول اقساط شهریه اولیا به حساب جاری ملت"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">حساب بدهکار (Debit Account):</label>
                <input
                  type="text"
                  value={newJrnDebitAcc}
                  onChange={(e) => setNewJrnDebitAcc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">حساب بستانکار (Credit Account):</label>
                <input
                  type="text"
                  value={newJrnCreditAcc}
                  onChange={(e) => setNewJrnCreditAcc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">مبلغ سند (تومان):</label>
                <input
                  type="text"
                  required
                  value={newJrnAmount}
                  onChange={(e) => setNewJrnAmount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewJournalModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xs"
                >
                  ثبت در دفتر روزنامه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: فیش حقوقی دیجیتال همکار */}
      {/* ========================================================================= */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-sky-600 font-bold block">سامانه فیش حقوقی پرهام</span>
                <h3 className="text-sm font-bold text-slate-900">فیش حقوقی: {selectedPayslip.teacherName}</h3>
              </div>
              <button
                onClick={() => setSelectedPayslip(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">عنوان شغلی:</span>
                <span className="font-bold text-slate-800">{selectedPayslip.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">دوره حقوق:</span>
                <span className="font-bold text-slate-800">آبان ۱۴۰۳</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">حقوق و دستمزد پایه:</span>
                <span className="font-bold text-slate-900">{formatTomans(selectedPayslip.baseSalary)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sky-700">
                <span>کسر بیمه تامین اجتماعی (۷٪):</span>
                <span>-{formatTomans(selectedPayslip.insuranceDeduction)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>کسر مالیات بر حقوق:</span>
                <span>-{formatTomans(selectedPayslip.taxDeduction)}</span>
              </div>
              {selectedPayslip.advanceDeduction > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>کسر مساعده زودهنگام پرهام:</span>
                  <span>-{formatTomans(selectedPayslip.advanceDeduction)}</span>
                </div>
              )}
              <div className="border-t border-slate-300 pt-2 flex justify-between text-sm font-extrabold text-emerald-700">
                <span>خالص پرداختی نهایی:</span>
                <span>{formatTomans(selectedPayslip.netPay)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => showToast('فیش حقوقی رسمی چاپ گردید.')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>چاپ فیش</span>
              </button>
              <button
                onClick={() => setSelectedPayslip(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: بارگذاری فایل جدید حقوق */}
      {/* ========================================================================= */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">بارگذاری فایل جدید حقوق و دستمزد</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="border-2 border-dashed border-sky-300 bg-sky-50/50 rounded-2xl p-6 text-center space-y-3">
              <UploadCloud className="w-10 h-10 text-sky-600 mx-auto" />
              <div className="text-xs text-slate-700 font-bold">
                فایل اکسل حقوق (فرمت .xlsx یا .csv) را بکشید یا انتخاب کنید
              </div>
              <p className="text-[11px] text-slate-500">
                سیستم به طور خودکار شماره شبا، مالیات و کسورات اقساط پرهام را تطبیق می‌دهد.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  setUploadModalOpen(false);
                  setPayrollBatch(prev => ({
                    ...prev,
                    fileName: 'payroll_azar_1403_updated.xlsx',
                    uploadDate: 'هم‌اکنون',
                    accountingApproved: false,
                    founderApproved: false,
                    founderSmsSent: false
                  }));
                  showToast('فایل جدید حقوق با موفقیت بارگذاری شد و آماده تایید حسابداری است.');
                }}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                بارگذاری و بررسی
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
