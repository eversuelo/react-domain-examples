import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import 'react-circular-progressbar/dist/styles.css';

function BudgetTracker() {
  const {state,totalExpenses,remainingBudget,dispatch}=useBudget();
  const percentage=+(totalExpenses/state.budget*100).toFixed(2);
  return (
    <div
      className='grid grid-cols-1 gap-5 md:grid-cols-2'
    >
      <div className='flex justify-center'>
      <CircularProgressbar 
        value={percentage}
        styles={buildStyles({
          pathColor: percentage==100?'#DC2626':'#3B82F6',
          textColor: '#3B82F6',
          trailColor: '#F5F5F5',
          textSize: 8,
        })}
        text={`${percentage}% Gastado`}
      />
      </div>
      <div className='flex flex-col items-center justify-center gap-8'>
        <button
          type='button'
          onClick={()=>{
            console.log('reset')
            dispatch({type:'reset-app'})
          }}
          className='w-full py-2 font-bold text-white bg-pink-600 rounded-lg'
        >
          Resetear App
        </button>
        <AmountDisplay amount={state.budget}
          label='Inicial'
          />
        <AmountDisplay amount={remainingBudget}
          label='Restante'
        />
        <AmountDisplay amount={totalExpenses}
          label='Gastos'
        />
      </div>
    </div>
  )
}

export default BudgetTracker