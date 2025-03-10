import { useState,ChangeEvent, FormEvent, Dispatch,useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import { categories } from "../data/categories"
import type { Activity } from "../types";
import { ActivityActions,ActivityState } from "../reducers/activity-reducers";
type FormProps={
    dispatch:Dispatch<ActivityActions>,
    state:ActivityState
}
const initialActivity={
        id:'',
        category: 0,
        name: '',
        calories: 0
    };
function Form({dispatch,state}:FormProps) {
    
    const [activity, setActivity] = useState<Activity>({
        id:'',
        category: 0,
        name: '',
        calories: 0
    });
    useEffect(()=>{
        if(state?.activities!==undefined && state.activeId!=''){
            const activeActivity=state.activities.find(activity=>activity.id===state.activeId);
            console.log(activeActivity);
            if(activeActivity!==undefined){
                setActivity(activeActivity);
            }
        }
    },[state])
    const handleChange=(e:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{
        const isNumberField=['category','calories'].includes(e.target.id);
        
            setActivity({
                ...activity,
                id:uuidv4(),
                [e.target.id]:isNumberField?+e.target.value:e.target.value,
            });
    }
    const isValidActivity=()=>{
        const {name,calories}=activity
        return name.trim()!== ''&& calories>0&&activity.category>0;
    }
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(activity.id!=''){
            dispatch({type:'save-activity',payload:{newActivity:activity}});
        }else{
            dispatch({type:'save-activity',payload:{newActivity:activity}});
        }
        setActivity(initialActivity);
    }
    return (
        <form onSubmit={handleSubmit}
            className="p-10 space-y-5 bg-white shadow rounded-xl">

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select onChange={handleChange} defaultValue={activity.name}  className="w-full p-2 border rounded-lg border-slate-300 bg-white0" id="category" title="Category">
                    <option hidden value=''  >Seleccione una Opción</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input id="name" type="text" value={activity.name} onChange={handleChange}
                    className="p-2 border rounded-lg border-slate-300" placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta" />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Actividad:</label>
                <input value={activity.calories} id="calories" type="number" min={0}
                 onChange={handleChange}
                 className="p-2 border rounded-lg border-slate-300" placeholder="Ej. 300,200,150" />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <input type="submit" disabled={!isValidActivity()}
                    className="w-full p-2 font-bold text-white uppercase bg-gray-800 cursor-pointer hover:bg-gray-900 disabled:opacity-10" value={activity.category.toString()=='1'?'Guardar Comida':activity.category.toString()=='2'?'Guardar Ejercicio':'Llene los campos'} />
            </div>
        </form>

    )
}

export default Form