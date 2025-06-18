import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails"

export default function ExpenseList() {

    const { state } = useBudget()

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

    return (
        <>
            <div className="space-y-3 max-h-[24rem] overflow-y-auto py-1">
                {isEmpty ?
                    <div className="text-center py-8 text-slate-500">
                        <p>No hay gastos registrados</p>
                        <p className="text-sm">Agrega tu primer gasto para comenzar</p>
                    </div>
                    :
                    <>
                        {filteredExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
                            >
                                <ExpenseDetails
                                    key={expense.id}
                                    expense={expense}
                                />
                            </div>
                        ))}
                    </>
                }
            </div>
        </>
    )
}
