import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
import { Button } from "./ui/button"


export default function BudgetForm() {

    const [budget, setBudget] = useState(0)

    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }

    // Validando el input
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'add-budget', payload: { budget } })
        dispatch({ type: 'close-model-budget' })
    }

    return (
        <form
            className=" space-y-5"
            onSubmit={handleSubmit}
        >
            <div className=" flex flex-col space-y-5">
                <div>
                    <p className=" text-xl font-bold pb-1">Configura presupuesto</p>
                    <p className=" text-slate-500">Define tu presupuesto mensual para controlar tus gastos</p>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="budget"
                        className=" font-semibold"
                    >
                        Monto del presupuesto
                    </label>
                    <input
                        id="budget"
                        type="text"
                        className=" w-full bg-white border border-gray-200 p-2 rounded"
                        placeholder="Define tu presupuesto"
                        name="budget"
                        value={budget}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className=" flex justify-between max-w-full">
                <Button
                    variant="outline"
                    type="button"
                    className=" cursor-pointer w-[49%]"
                    onClick={() => dispatch({ type: 'close-model-budget' })}
                >
                    Cancelar
                </Button>
                <Button
                    disabled={isValid}
                    type="submit"
                    className=" disabled:opacity-75 w-[49%] cursor-pointer"
                >
                    Definir presupuesto
                </Button>
            </div>
        </form>
    )
}
