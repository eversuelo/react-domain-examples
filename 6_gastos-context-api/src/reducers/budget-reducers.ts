import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuid } from 'uuid'
export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } }|
    {type:'get-expense-by-id',payload:{id:Expense['id']}}|
    {type:'reset-app'}|
    {type:'add-filter-category',payload:{id:Category['id']}}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory:Category['id']
}
const initialBudget=():number=>{
    return localStorage.getItem('budget')?parseFloat(localStorage.getItem('budget')!):0;
}
const localStorageExpenses=():Expense[]=>{
    return localStorage.getItem('expenses')?JSON.parse(localStorage.getItem('expenses')!):[]
}
export const initialBudgetState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory:''
}
const createExpense = (expense: DraftExpense): Expense => {
    return {
        ...expense,
        id: uuid()
    }
}
export const budgetReducer = (state: BudgetState, action: BudgetActions): BudgetState => {
    switch (action.type) {
        case 'add-budget':
            return { ...state, budget: action.payload.budget }
        case 'show-modal':
            return { ...state, modal: true }
        case 'hide-modal':
            return { ...state, modal: false,editingId:'' }
        case 'add-expense':
            return { ...state, expenses: [...state.expenses, createExpense(action.payload.expense)], modal: false }
        case 'get-expense-by-id':
            return {...state,editingId:action.payload.id,modal:true}
        case 'remove-expense':
            return { ...state, expenses: state.expenses.filter(expense => expense.id !== action.payload.id) }
        case 'update-expense':
            return { ...state, expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense), modal: false,editingId:'' }
        case 'reset-app':
            return { ...state, budget: 0, expenses: [], modal: false}
        case 'add-filter-category':
            return {...state,currentCategory:action.payload.id}
            default:
            return state
    }

}
