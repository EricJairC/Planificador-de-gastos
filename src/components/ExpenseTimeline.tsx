import { useBudget } from '@/hooks/useBudget'
import type { Expense } from '@/type'
import ExpenseTimelineDetails from './ExpenseTimelineDetails'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function ExpenseTimeline() {

    const { state } = useBudget()

    const groupedExpenses = state.expenses.reduce((total, expense) => {
        const date = new Date(expense.date!.toString());
        const dateKey = date.toLocaleDateString("sv-SE");
        if (!total[dateKey]) {
            total[dateKey] = [];
        }
        total[dateKey].push(expense);
        return total;
    }, {} as Record<string, Expense[]>,)

    const sortedDates = Object.keys(groupedExpenses).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Timeline de Gastos</CardTitle>
                    <CardDescription>Cronología de todos tus gastos</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 max-h-96 overflow-y-auto">
                        {sortedDates.map((date) => {
                            const dayExpenses = groupedExpenses[date]
                            const dayTotal = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0)

                            return (
                                <div key={date} className="relative">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-900">
                                                {new Date(date).toLocaleDateString("es-ES", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </h3>
                                            <p className="text-sm text-slate-600">Total del día: ${dayTotal.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="ml-6 space-y-2 pb-4">
                                        {dayExpenses.map((expense) => (
                                            <div key={expense.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                                <ExpenseTimelineDetails
                                                    expense={expense}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {date !== sortedDates[sortedDates.length - 1] && (
                                        <div className="absolute left-1.5 top-8 w-0.5 h-full bg-slate-200"></div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
