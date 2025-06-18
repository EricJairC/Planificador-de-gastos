import { categories } from "@/data/categories"
import type { Expense } from "@/type"
import { useCategoryInfo } from "@/utils"

type ExpenseTimelineDetailsProps = {
    expense: Expense
}

export default function ExpenseTimelineDetails({expense} : ExpenseTimelineDetailsProps) {

    const categoryInfo = useCategoryInfo(expense, categories);

    return (
        <>
            <div className="flex items-center gap-3">
                <span className="text-lg">{categoryInfo.icon}</span>
                <div>
                    <p className="font-medium text-slate-900">{expense.expenseName}</p>
                    <div className={`${categoryInfo.color} text-sm rounded-xl py-1 px-3 font-semibold`}>{categoryInfo.name}</div>
                </div>
            </div>
            <p className="font-semibold text-slate-900">${expense.amount.toLocaleString()}</p>
        </>
    )
}
