import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";
function ExpenseList() {
  const { state } = useBudget();
  const filteredExpenses=state.currentCategory?state.expenses.filter(expense=>expense.category===state.currentCategory):state.expenses;
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);
  return (
    <div
      className="mt-10"
    >
      {isEmpty ? (<p className="text-center text-gray-600 yrxy-2xl">No hay gastos</p>) : (
        <>
          <p className="text-center text-gray-600">Lista de Gastos</p>
          {state.expenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))
          }
        </>
      )}

    </div>
  )
}

export default ExpenseList