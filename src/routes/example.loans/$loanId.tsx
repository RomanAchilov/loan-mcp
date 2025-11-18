import { Link, createFileRoute } from "@tanstack/react-router";
import loanProducts from "../../data/example-loans";

export const Route = createFileRoute("/example/loans/$loanId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const loan = loanProducts.find((loan) => loan.id === +params.loanId);
    if (!loan) {
      throw new Error("Loan product not found");
    }
    return loan;
  },
});

function RouteComponent() {
  const loan = Route.useLoaderData();

  return (
    <div className="relative min-h-[100vh] flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-5">
      <div className="relative z-10 w-[60%] bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 shadow-xl">
        <Link
          to="/example/loans"
          className="inline-block mb-4 text-blue-400 hover:text-blue-300"
        >
          &larr; Назад к кредитам
        </Link>
        <h1 className="text-3xl font-bold mb-4">{loan.name}</h1>
        <p className="text-gray-300 mb-6">{loan.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-800/40 rounded-lg">
          <div>
            <div className="text-sm text-gray-400 mb-1">Сумма кредита</div>
            <div className="text-2xl font-bold text-white">{loan.amount.toLocaleString('ru-RU')} ₽</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Процентная ставка</div>
            <div className="text-2xl font-bold text-emerald-400">{loan.interestRate}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Срок кредита</div>
            <div className="text-xl font-semibold text-white">{loan.termMonths} мес.</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Ежемесячный платеж</div>
            <div className="text-xl font-semibold text-white">{loan.monthlyPayment.toLocaleString('ru-RU')} ₽</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            ⚡ Одобрение за {loan.approvalSpeed}
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 rounded-lg transition-all font-semibold shadow-lg">
            Оформить кредит
          </button>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[55%] h-full z-0">
        <div className="w-full h-full overflow-hidden rounded-2xl border-4 border-blue-500/30 shadow-2xl">
          <img
            src={`/${loan.image}`}
            alt={loan.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
