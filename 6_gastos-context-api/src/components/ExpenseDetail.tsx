import { useMemo } from 'react';
import { LeadingActions,SwipeableList,SwipeableListItem,SwipeAction,TrailingActions } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from '../helpers';
import { Category, Expense } from '../types/index';
import { useBudget } from '../hooks/useBudget';
import AmountDisplay from './AmountDisplay';
import { categories } from '../data';
type ExpenseDetailProps = {
    expense: Expense
}
function ExpenseDetail({ expense }: ExpenseDetailProps) {
    const { dispatch } = useBudget();
    const categoryInfo = useMemo<Category>(() => categories.find(category => category.id === expense.category)!, [expense.category]);
    const leadingActions = ()=>{
        return <LeadingActions>
            <SwipeAction onClick={()=> {
                console.log('edit');
                dispatch({type:'get-expense-by-id',payload:{id:expense.id}})
            }}>Edit</SwipeAction>
        </LeadingActions>
    }
    const trailingActions = ()=>{
        return <TrailingActions>
            <SwipeAction onClick={()=> {
                console.log('delete');
                dispatch({type:'remove-expense',payload:{id:expense.id}})
            }}>Delete</SwipeAction>
        </TrailingActions>
    }
    return (
        <SwipeableList>
            <SwipeableListItem maxSwipe={1}  leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className='flex flex-row justify-around w-full gap-5 p-10 bg-white border-b border-gray-200 shadow-lg'>
            <div>
                <img src={`/icono_${categoryInfo.icon}.svg`} alt={categoryInfo.name} className='w-20' />
            </div>
            <div className='flex-1 space-y-3'>
                <p className='text-sm font-bold uppercase text-slate-500'>{categoryInfo.name}</p>
                <p className='text-xl font-bold'>{expense.expenseName}</p>
                <p className='text-gray-600'>{formatDate(expense.date!.toString())}</p>
            </div>
            <AmountDisplay amount={expense.amount} />
        </div>
        </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetail