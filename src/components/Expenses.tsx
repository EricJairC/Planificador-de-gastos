import { Filter } from 'lucide-react'
import ExpenseList from './ExpenseList'
import FilterByCategory from './FilterByCategory'
import { CardContent, CardHeader, CardTitle } from './ui/card'

export default function Expenses() {
    return (
        <>
            <CardHeader>
                <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-start sm:items-center">
                    <CardTitle className="flex w-full md:w-fit items-center gap-5 text-lg font-semibold">
                        <Filter className="w-7 h-7" />
                        Gastos Recientes
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                        <FilterByCategory/>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ExpenseList />
            </CardContent>
        </>
    )
}
