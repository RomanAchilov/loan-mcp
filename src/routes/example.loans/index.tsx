import { Link, createFileRoute } from "@tanstack/react-router";
import loanProducts from "../../data/example-loans";

export const Route = createFileRoute("/example/loans/")({
  component: LoansIndex,
});

function LoansIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-8 text-center">Кредитные продукты</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanProducts.map((loan) => (
          <Link
            key={loan.id}
            to="/example/loans/$loanId"
            params={{
              loanId: loan.id.toString(),
            }}
            className="group"
          >
            <div className="h-full bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl border border-blue-500/30 overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-300 transition-colors">
                  {loan.name}
                </h2>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
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
                <div className="flex items-center justify-between pt-4 border-t border-blue-500/20">
                  <div className="text-xs text-gray-400">
                    ⚡ {loan.approvalSpeed}
                  </div>
                  <div className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    Подробнее →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
