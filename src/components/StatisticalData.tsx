import { useBudget } from '@/hooks/useBudget'
import { formatCurrency, getDailyChartData, getDailyData } from '@/utils'

export default function StatisticalData() {

    const { state, avaibleBudget } = useBudget()

    const dailyData = getDailyData(state.expenses)
    const dailyChartData = getDailyChartData(dailyData)

    const totalSpent = state.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const averageDaily = totalSpent / Math.max(dailyChartData.length, 1)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(avaibleBudget)}</p>
                <p className="text-sm text-blue-800">Total gastado este mes</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(averageDaily)}</p>
                <p className="text-sm text-green-800">Promedio diario</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{state.expenses.length}</p>
                <p className="text-sm text-purple-800">Total de transacciones</p>
            </div>
        </div>
    )
}
