import { useNavigate } from '@tanstack/react-router'

import { showAIAssistant } from './example-AIAssistant'

import loanProducts from '../data/example-loans'

export default function LoanRecommendation({ id }: { id: string }) {
  const navigate = useNavigate()
  const loan = loanProducts.find((loan) => loan.id === +id)
  if (!loan) {
    return null
  }
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-blue-500/20 bg-gray-800/50">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={loan.image}
          alt={loan.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{loan.name}</h3>
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">
          {loan.shortDescription}
        </p>
        <div className="space-y-2 mb-3">
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
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            ⚡ {loan.approvalSpeed}
          </div>
          <button
            onClick={() => {
              navigate({
                to: '/example/loans/$loanId',
                params: { loanId: loan.id.toString() },
              })
              showAIAssistant.setState(() => false)
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-1.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  )
}
