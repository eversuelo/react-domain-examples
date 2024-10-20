import { useEffect, useState } from "react";
import { categories } from "../data";
import DatePicker from "react-date-picker";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { DraftExpense, Value } from '../types/index';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    });
    const [error, setError] = useState('');
    const [previusAmount,setPreviusAmount]=useState(0);
    const { dispatch, state ,remainingBudget} = useBudget();
    useEffect(() => {
        if (state.editingId) {
            const expense = state.expenses.find(expense => expense.id === state.editingId);
            if (expense) {
                setExpense(expense);
                setPreviusAmount(expense.amount)
            }
        }
    }, [state.editingId, state.expenses]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? parseFloat(value) : value

        })
    }
    const handleChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value })
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //Validar
        if (Object.values(expense).includes('')) {
            console.log(expense)
            setError('Todos los campos son obligatorios');
            return;
        }
        //Validar que los gastos no rebasen
        if((expense.amount-previusAmount)>remainingBudget){
            setError('Presupuesto rebasado.');
            return;
        }
        //Agregar un gastp
        if (state.editingId)
            dispatch({ type: 'update-expense', payload: {expense:{...expense,id:state.editingId} } });
        else
            dispatch({ type: 'add-expense', payload: { expense } });
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        });
        dispatch({ type: 'hide-modal' });
        setPreviusAmount(0);
        return;
    }
    useEffect(() => {
        setTimeout(() => {
            setError('')
        }
            , 3000);
    }
        , [error]);
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="text-lg font-semibold">{state.editingId ? 'Editar Gasto' : 'Agregar Gasto'}</legend>
            {error && (<ErrorMessage>{error}</ErrorMessage>)}
            <div className="flex flex-col space-y-5">
                <label htmlFor="expenseName" className="text-lg font-semibold">Nombre:</label>
                <input name="expenseName" defaultValue={expense.expenseName} type="text" id="expenseName" className="p-2 border border-gray-300 rounded-lg" onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-5">
                <label htmlFor="amount" className="text-lg font-semibold">Cantidad</label>
                <input type="number" onChange={handleChange} defaultValue={expense.amount} id="amount" className="p-2 border border-gray-300 rounded-lg" name="amount" />
            </div>
            <div className="flex flex-col space-y-5">
                <label htmlFor="category" className="text-lg font-semibold">Categoria</label>
                <select defaultValue={expense.category} id="category" className="p-2 border border-gray-300 rounded-lg" name="category" onChange={handleChange}>
                    <option value="" hidden>Selecciona una categoria</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col space-y-5">
                <label htmlFor="fecha-gasto" className="text-lg font-semibold">Fecha Gasto</label>
                <DatePicker value={expense.date}
                    onChange={handleChangeDate}
                    className="p-2 border-0 bg-slate-100"
                />
            </div>
            <input
                type="submit" value="Enviar" className="w-full p-2 font-semibold text-white bg-blue-600 rounded-lg cursor-pointer disabled:opacity-40 hover:bg-blue-700"
            />

        </form>
    )
}

export default ExpenseForm;