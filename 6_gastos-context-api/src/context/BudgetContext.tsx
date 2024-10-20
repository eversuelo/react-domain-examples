import  {Dispatch,createContext, useReducer,useMemo } from 'react';
import { BudgetActions, budgetReducer,BudgetState,initialBudgetState } from '../reducers/budget-reducers';
type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget:number
};
export	const BudgetContext = createContext<BudgetContextProps>(null!);
type BudgetProviderProps = {
    children: React.ReactNode
};

export function BudgetProvider({ children }:BudgetProviderProps) {
    const [state, dispatch] = useReducer(budgetReducer, initialBudgetState);
    const totalExpenses=useMemo(()=>state.expenses.reduce((total,expense)=>expense.amount+total,0),[state.expenses])
    const remainingBudget=state.budget-totalExpenses; 
    return (
        <BudgetContext.Provider value={{ state, dispatch,totalExpenses,remainingBudget }}>
            {children}
        </BudgetContext.Provider>
    );
}