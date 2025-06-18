// Reducer

import type { Categories, Expense } from "../type"

// Definimos las acciones
export type BudgetActions = 
{ type: 'add-budget', payload: { budget: number } } | 
{ type: 'show-modal' } | 
{ type: 'show-modal-budget' } | 
{ type: 'close-model' } |
{ type: 'close-model-budget' } |
{ type: 'add-expense', payload: { expense: Expense }} |
{ type: 'remove-expense', payload: { id: Expense['id']}} |
{ type: 'active-expenseId', payload: { id: Expense['id']}} | 
{ type: 'clean-budget' } | 
{ type: 'add-filter', payload: { id: Categories['id']}}

// Definimos el state
export type BudgetState = {
    budget: number
    modal: boolean
    modalBudget: boolean
    expenses: Expense[]
    activeId: Expense['id']
    currentCategory: Categories['id']
}

// Obtenemos el localStorage
const expensesLocalStorage = () : Expense[] => {
    const expenses = localStorage.getItem('expenses')
    return expenses ? JSON.parse(expenses) : []
}

const budgetLocalStorage = () : number => {
    const budget = localStorage.getItem('budget')
    return budget ? +budget : 0
}

// Instanciamos el state de localStorage
export const initialState : BudgetState = {
    budget: budgetLocalStorage(),
    modal: false,
    modalBudget: false,
    expenses: expensesLocalStorage(),
    activeId: '',
    currentCategory: ''
}

// Reducer
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if(action.type === 'add-budget'){
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    if(action.type === 'show-modal'){
        return {
            ...state,
            modal: true
        }
    } 
    if(action.type === 'show-modal-budget'){
        return {
            ...state,
            modalBudget: true
        }
    } 
    if(action.type === 'close-model'){
        return {
            ...state,
            modal: false,
            activeId: ''
        }
    }
    if(action.type === 'close-model-budget'){
        return {
            ...state,
            modalBudget: false,
            activeId: ''
        }
    }
    if(action.type === 'add-expense'){
        let updatedExpenses : Expense[] = []
            if(state.activeId){
                updatedExpenses = state.expenses.map(expense => expense.id === state.activeId ? action.payload.expense : expense)
            } else{
                updatedExpenses = [...state.expenses, action.payload.expense]
            }
        return {
            ...state,
            expenses: updatedExpenses,
            activeId: ''
        }
    }
    if(action.type === 'remove-expense'){

        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }
    if(action.type === 'active-expenseId'){
        return {
            ...state,
            activeId: action.payload.id,
            modal: true
        }
    }
    if(action.type === 'clean-budget'){
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }
    if(action.type === 'add-filter'){
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }
    return state
}