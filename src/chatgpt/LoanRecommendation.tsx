import loanProducts from "../data/example-loans";

export default function LoanRecommendation({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const loan = loanProducts.find((loan) => loan.id === +id);
  if (!loan) {
    return null;
  }
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm">
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-3">{loan.name}</h3>
        <p className="text-sm text-gray-300 mb-4">
          {loan.shortDescription}
        </p>
        <div className="space-y-2.5 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Сумма:</span>
            <span className="text-white font-semibold">{loan.amount.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Ставка:</span>
            <span className="text-emerald-400 font-semibold">{loan.interestRate}% годовых</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Платеж:</span>
            <span className="text-white font-semibold">{loan.monthlyPayment.toLocaleString('ru-RU')} ₽/мес</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Срок:</span>
            <span className="text-white font-semibold">{loan.termMonths} мес</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-blue-500/20">
          <div className="text-xs text-gray-400">
            ⚡ {loan.approvalSpeed}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

