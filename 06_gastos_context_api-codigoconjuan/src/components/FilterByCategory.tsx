import { ChangeEvent } from 'react';
import { categories } from '../data/index';
import { useBudget } from '../hooks/useBudget';


export default function FilterByCategory() {
    const {dispatch}=useBudget();
    const handleChange=(e:ChangeEvent<HTMLSelectElement>)=>{
        dispatch({type:'add-filter-category',payload:{id:e.target.value}});   
    }
  return (
    <div className="p-5 space-y-5 bg-white rounded-lg shadow-xl">
        <form>
            <div className="flex flex-col space-y-5">
                <label htmlFor="category" className="text-lg font-semibold">Categoria</label>
                <select
                onChange={handleChange}
                id="category" className="p-2 border border-gray-300 rounded-lg">
                    <option value="">Todos los Gastos</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
        </form>

    </div>
  )
}
