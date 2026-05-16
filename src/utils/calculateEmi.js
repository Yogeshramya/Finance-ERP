export function calculateLoan(
  amount,
  interestRate,
  durationMonths
) {
  const totalInterest =
    (amount * interestRate) / 100;

  const totalRepayment =
    amount + totalInterest;

  const emiAmount =
    totalRepayment /
    durationMonths;

  return {
    emiAmount:
      emiAmount.toFixed(2),

    totalRepayment:
      totalRepayment.toFixed(2),
  };
}