import { Dispatch, useMemo } from "react";
import { Activity } from "../types"
import { categories } from "../data/categories";
import { PencilSquareIcon,TrashIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducers";
type ActivitieListProps = {
    activities: Activity[]|undefined,
    dispatch:Dispatch<ActivityActions>,
}
function ActivityList({ activities,dispatch }: ActivitieListProps) {
    const categoryName=useMemo(()=>(category:Activity['category'])=> categories.map(cat=>cat.id===category?cat.name:''),[]);
    const isEmptyActivities =useMemo(()=>activities?.length===0,[activities]);

    return (
        <>
            <h2 className="text-4xl font-bold text-center text-slate-600">
                Comida y Actividades
            </h2>
            {!isEmptyActivities?activities?.map(activity => {
                return (
                    <div key={activity.id} className="flex justify-between px-5 py-10 mt-5 bg-white shadow-xl">
                        <div className="relative space-y-2">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase ${activity.category==1?'bg-lime-500':'bg-orange-500'}`}>
                            {categoryName(+activity.category) }
                        </p>
                        <p className="pt-5 text-2xl font-bold">
                            {activity.name}
                        </p>
                        <p className="text-4xl font-black text-lime-500">
                            {activity.calories} Cal
                        </p>
                        </div>
                        <div className="flex items-center gap-5">
                            <button 
                                onClick={() => dispatch({type:'set-activeId',payload:{id:activity.id}})}
                                title="Edit Activity"
                            >
                                <PencilSquareIcon className="w-8 h-8 text-slate-500"/>
                            </button>
                            <button 
                                onClick={() => dispatch({type:'delete-activeId',payload:{id:activity.id}})}
                                title="Delete Activity"
                            >
                                <TrashIcon className="w-8 h-8 text-slate-500"/>
                            </button>
                        </div>
                    </div>
                );
            }):(<p className="text-2xl font-bold text-center text-slate-500">No hay actividades registradas</p>)}
        </>
    )
}

export default ActivityList