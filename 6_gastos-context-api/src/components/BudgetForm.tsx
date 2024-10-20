import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";
function BudgetForm() {
    const [budget, setBudget] = useState(0)
    const{dispatch}=useBudget();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(parseInt(e.target.value))
        console.log(budget)
    }
    const isValid = useMemo(() => (budget > 0) && !isNaN(budget) && !(budget == null)&&!(budget==undefined), [budget])
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'add-budget',payload:{budget}})
    }
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-lg font-semibold">Presupuesto</label>
                <input min={0} type="number" id="budget" className="p-2 border border-gray-300 rounded-lg" name="budget" value={budget}
                    onChange={handleChange} />

            </div>
            <input

                type="submit" className="w-full p-2 font-semibold text-white bg-blue-600 rounded-lg cursor-pointer disabled:opacity-40 hover:bg-blue-700"
                disabled={!isValid}
            />

        </form>
    )
}

export default BudgetForm