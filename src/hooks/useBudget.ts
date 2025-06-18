import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    // Instanciamos el BudgetContext
    const context = useContext(BudgetContext)
    if(!context){
        throw new Error('Es necesario un BudgetProvider')
    }
    return context
}