import { useReducer, createContext, type Dispatch, type ReactNode, useMemo } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    avaibleBudget: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

// Creamos el context
export const BudgetContext = createContext<BudgetContextProps>(null!)

// Context
export const BudgetProvider = ({children} : BudgetProviderProps) => {

    // Instanciamos el reducer
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    
    const avaibleBudget = useMemo(() => state.expenses.reduce((total, expense) => total + (expense.amount), 0), [state.expenses])
    
    const remainingBudget = state.budget - avaibleBudget

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                avaibleBudget,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}