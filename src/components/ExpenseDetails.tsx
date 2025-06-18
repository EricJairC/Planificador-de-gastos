import { PencilIcon, Trash2 } from "lucide-react"
import "react-swipeable-list/dist/styles.css"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import type { Expense } from "../type"
import { formatDate, useCategoryInfo } from "../utils"
import { Button } from "./ui/button"

type ExpenseDetailsProps = {
    expense: Expense
}

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {

    const { dispatch } = useBudget()

    const categoryInfo = useCategoryInfo(expense, categories);

    return (
        <>
            <div className="flex items-center gap-3 flex-1">
                <div className="text-2xl">{categoryInfo.icon}</div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 truncate">{expense.expenseName}</h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-2 mt-1">
                        <div className={`${categoryInfo.color} text-sm rounded-xl py-1 px-3 font-semibold`}>{categoryInfo.name}</div>
                        <span className="text-sm text-slate-500">{formatDate(expense.date!.toString())}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="font-semibold text-slate-900">${expense.amount.toLocaleString()}</p>
                </div>
                <div className=" flex flex-col sm:flex-row items-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch({ type: 'active-expenseId', payload: { id: expense.id } })}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 cursor-pointer"
                    >
                        <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}
