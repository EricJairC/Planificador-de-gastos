import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from '@/utils';
import { TrendingUp } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useBudget } from "../hooks/useBudget";

export default function BudgetTracker() {

    const { state, avaibleBudget, remainingBudget } = useBudget()

    const percentage = +((avaibleBudget / state.budget) * 100).toFixed(2)

    return (
        <>
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2 text-xl font-bold">
                        <div className=" flex flex-row gap-2 items-center">
                            <TrendingUp className="w-5 h-5" />
                            Presupuesto Mensual
                        </div>
                    </CardTitle>
                    <CardDescription className=" flex items-center w-full justify-between">
                        {new Date().toLocaleDateString("es-ES", { month: "long", year: "numeric" })}

                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: percentage === 100 ? '#DC2626' : '#10b981',
                            trailColor: '#F5F5F5',
                            textSize: 8,
                            textColor: percentage === 100 ? '#DC2626' : '#000000',
                        })}
                        text={`${state.budget ? `${percentage}%\n gastado` : `Sin presupuesto aún`}`}
                        className=' max-w-[238px] mx-auto font-semibold'
                    />
                    <div className="text-center">
                        <p className="text-lg font-semibold text-slate-900">{formatCurrency(state.budget)}</p>
                        <p className="text-sm text-slate-600">Presupuesto total</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-600 font-semibold">Disponible</p>
                            <p className="text-lg font-semibold text-green-800">{formatCurrency(remainingBudget)}</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-600 font-semibold">Gastado</p>
                            <p className="text-lg font-semibold text-red-800">{formatCurrency(avaibleBudget)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
