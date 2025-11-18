import { Link, createFileRoute } from "@tanstack/react-router";
import loanProducts from "../../data/example-loans";

export const Route = createFileRoute("/example/loans/")({
  component: LoansIndex,
});

function LoansIndex() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-8 text-center">Кредитные продукты</h1>
      <div className="flex flex-wrap gap-12 justify-center">
        {loanProducts.map((loan) => (
          <div
            key={loan.id}
            className="w-full md:w-[calc(50%-1.5rem)] xl:w-[calc(33.333%-2rem)] relative mb-24"
          >
            <Link
              to="/example/loans/$loanId"
              params={{
                loanId: loan.id.toString(),
              }}
            >
              <div className="relative z-0 w-full aspect-square mb-8">
                <div className="w-full h-full overflow-hidden rounded-2xl border-4 border-blue-500/30 shadow-2xl">
                  <img
                    src={`/${loan.image}`}
                    alt={loan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500/80 text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  Подробнее
                </div>
              </div>

              <div className="absolute bottom-0 right-0 z-10 w-[80%] bg-gray-900/70 backdrop-blur-md rounded-2xl p-5 border border-blue-500/30 shadow-xl transform translate-y-[40%]">
                <h2 className="text-xl font-bold mb-2">{loan.name}</h2>
                <p className="text-gray-300 mb-3 line-clamp-2">
                  {loan.shortDescription}
                </p>
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Сумма:</span>
                    <span className="text-white font-semibold">{loan.amount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Ставка:</span>
                    <span className="text-emerald-400 font-semibold">{loan.interestRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Платеж:</span>
                    <span className="text-white font-semibold">{loan.monthlyPayment.toLocaleString('ru-RU')} ₽/мес</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  ⚡ {loan.approvalSpeed}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
