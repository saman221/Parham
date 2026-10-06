export function formatTomans(amount: number): string {
  if (isNaN(amount)) return '۰ تومان';
  return new Intl.NumberFormat('fa-IR').format(Math.round(amount)) + ' تومان';
}

export function toPersianDigits(n: number | string): string {
  if (n === null || n === undefined) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().replace(/\d/g, (x) => persianDigits[parseInt(x, 10)]);
}

export function calculateLoanInstallment(
  principal: number,
  months: number,
  annualRatePct: number = 23,
  feeRatePct: number = 5
) {
  if (months <= 0) return { monthly: 0, total: 0, interest: 0, fee: 0, totalWithFee: 0, monthlyWithFee: 0 };

  const fee = Math.round((principal * feeRatePct) / 100);

  if (annualRatePct === 0) {
    const monthly = Math.round(principal / months);
    return {
      monthly,
      total: principal,
      interest: 0,
      fee,
      totalWithFee: principal + fee,
      monthlyWithFee: Math.round((principal + fee) / months)
    };
  }

  const r = annualRatePct / 100 / 12;
  const factor = Math.pow(1 + r, months);
  const monthly = Math.round((principal * r * factor) / (factor - 1));
  const total = monthly * months;
  const interest = total - principal;
  const totalWithFee = total + fee;
  const monthlyWithFee = Math.round(totalWithFee / months);

  return {
    monthly,
    total,
    interest,
    fee,
    totalWithFee,
    monthlyWithFee
  };
}

export function calculateEarlyWageDeduction(requestedAmount: number, feePct: number = 2.5) {
  const fee = Math.round((requestedAmount * feePct) / 100);
  const netReceived = requestedAmount - fee;
  return {
    requestedAmount,
    fee,
    netReceived,
    deductedAtMonthEnd: requestedAmount
  };
}
