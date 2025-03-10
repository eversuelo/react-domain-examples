import { useMemo } from "react"
import { Activity } from "../types"

type CaloriasTrackerProps = {
    activities: Activity[] | undefined
}
function CaloriasTracker({ activities }: CaloriasTrackerProps) {
    const caloriesBurned = useMemo(() => activities?.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities]);
    const caloriesConsumed = useMemo(() => activities?.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities]);
    return (
        <>
            <h2 className="text-4xl font-black text-center text-white">
                Resumen de Calorias
            </h2>
            <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-between">
                <p className="grid grid-cols-1 gap-3 font-bold text-center text-white rounded-full">
                    <span className="text-6xl font-black text-orange-600">{caloriesConsumed}</span>
                    Consumidas
                </p>
                <p className="grid grid-cols-1 gap-3 font-bold text-center text-white rounded-full">
                    <span className="text-6xl font-black text-orange-600">{caloriesBurned}</span>
                    Quemadas
                </p>
                <p className="grid grid-cols-1 gap-3 font-bold text-center text-white rounded-full">
                    <span className="text-6xl font-black text-orange-600">{caloriesConsumed&&caloriesBurned?caloriesConsumed-caloriesBurned:0}</span>
                    Diferencia
                </p>
            </div>

        </>
    )
}

export default CaloriasTracker