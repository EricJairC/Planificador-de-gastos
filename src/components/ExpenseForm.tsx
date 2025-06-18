import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { v4 as uuid } from 'uuid';
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import type { DraftExpense, Value } from "../type";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./ui/button";

export default function ExpenseForm() {

    // Definimos el state inicial
    const initialState = {
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    }

    // Definimos el state
    const [expense, setExpense] = useState<DraftExpense>(initialState)

    const [error, setError] = useState('')

    const [previousAmount, setPreviousAmount] = useState(0)

    const { state, dispatch, remainingBudget } = useBudget()

    // Detectamos cuando el activeId cambie
    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.expenses.filter(expense => expense.id === state.activeId)[0]
            setExpense(selectedActivity)
            setPreviousAmount(selectedActivity.amount)
        }
    }, [state.activeId])

    // Change para fecha
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    // Escribimos en el state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const isNumberField = ['amount'].includes(e.target.id)
        setExpense({
            ...expense,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    // Validamos el formulario
    const isValidExpense = () => {
        const { amount, expenseName, category } = expense
        return expenseName.trim() !== '' && amount > 0 && category !== null
    }

    // Mandamos el formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense).includes('')) {
            setError('Todos los campos son oblilgatorios')
            return
        }

        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('Ese gasto se sale del presupuesto')
            return
        }

        let expenseNew = {
            id: uuid(),
            expenseName: expense.expenseName,
            amount: expense.amount,
            category: expense.category,
            date: expense.date
        }
        dispatch({ type: 'add-expense', payload: { expense: expenseNew } })
        dispatch({ type: 'close-model' })
        setExpense(initialState)
        uuid()
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className=" space-y-5"
            >
                <div>
                    <p className=" text-xl font-bold pb-1">Nuevo gasto</p>
                    <p className=" text-slate-500">Registra un nuevo gasto en tu presupuesto</p>
                </div>
                <div className=" flex flex-col gap-2">
                    <label
                        htmlFor="expenseName"
                        className=" font-semibold"
                    >
                        Nombre del gasto
                    </label>
                    <input
                        type="text"
                        id="expenseName"
                        placeholder="Ej. Ropa, comida, etc."
                        className="p-2 rounded border"
                        name="expenseName"
                        value={expense.expenseName}
                        onChange={handleChange}
                    />
                </div>
                <div className=" flex flex-col gap-2">
                    <label
                        htmlFor="amount"
                        className=" font-semibold"
                    >
                        Cantidad:
                    </label>
                    <input
                        type="text"
                        id="amount"
                        placeholder="Añade la cantidad del gasto ej. 300"
                        className=" p-2 rounded border"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                    />
                </div>
                <div className=" flex flex-col gap-2">
                    <label
                        htmlFor="category"
                        className=" font-semibold"
                    >
                        Categoría:
                    </label>
                    <div className="relative w-full">
                        <select
                            id="category"
                            className=" appearance-none w-full px-4 py-2 border rounded"
                            name="category"
                            value={expense.category}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(category => (
                                <option
                                    className=""
                                    key={category.id}
                                    value={category.id}
                                >{category.icon}{category.name}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col gap-2">
                    <label
                        htmlFor="amount"
                        className=" font-semibold"
                    >
                        Fecha Gasto:
                    </label>
                    <DatePicker
                        className="custom-datepicker "
                        calendarProps={{
                            className: "custom-calendar"
                        }}
                        value={expense.date}
                        onChange={handleChangeDate}
                    />
                </div>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <div className=" flex justify-between max-w-full">
                    <Button
                        variant="outline"
                        type="button"
                        className=" cursor-pointer w-[49%]"
                        onClick={() => dispatch({ type: 'close-model' })}
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={!isValidExpense}
                        type="submit"
                        className=" cursor-pointer disabled:opacity-75 w-[49%]"
                    >
                        {state.activeId ? 'Modificar gasto' : 'Registrar gasto'}
                    </Button>
                </div>
            </form>
        </>
    )
}
