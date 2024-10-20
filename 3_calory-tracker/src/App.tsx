import Form from "./components/Form"
import { useEffect, useReducer, useMemo } from 'react';
import { activityReducer, initialState } from "./reducers/activity-reducers";
import ActivityList from "./components/ActivityList";
import CaloriasTracker from './components/CaloriasTracker';
function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState);
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state?.activities));
  }, [state]);
  const canRestartApp=useMemo(()=>state?.activities.length,[state]);
  const handleReset=()=>{
      dispatch({type:"restart-app"});
  }
  return (
    <>
      <header className="py-3 bg-lime-600">
        <div className="flex justify-between max-w-4xl mx-auto">
          <h1 className="text-lg font-bold text-center text-white uppercase">
            Contador de Calorias
          </h1>
          <button onClick={handleReset} disabled={!canRestartApp} className="p-2 text-sm font-bold text-white uppercase bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 disabled:opacity-30">
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="px-5 py-20 bg-lime-500">
        <div className="max-w-4xl mx-auto">
          <Form state={state || initialState} dispatch={dispatch} />
        </div>
      </section>
      <section className="py-10 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <CaloriasTracker 
            activities={state?.activities}
          />
        </div>
      </section>
      <section className="max-w-4xl p-10 mx-auto">
        <ActivityList activities={state?.activities} dispatch={dispatch} />
      </section>
    </>
  )
}

export default App
