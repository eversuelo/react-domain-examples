
import { menuItems } from "./data/db"
import MenuItem from "./components/MenuItem"
import OrderContents from './components/OrderContents';
import OrderTotals from './components/OrderTotals.tsx';
import TipPercentageForm from './components/TipPercentageForm';
import { useReducer } from 'react';
import { orderReducer,initialState } from './reducers/order-reducers';
function App() {

  const [state,dispatch]=useReducer(orderReducer,initialState);
  return (
    <>
      <header className="py-5 bg-teal-400">
        <h1 className="text-4xl font-black text-center text-white"> Calculadora de Propinas y Consumo</h1>
      </header>
      <main className="grid py-20 mx-auto max-w-7xl md:grid-cols-2">
        <div className="p-5 space-y-3 ">
          <h2 className="mt-10 text-4xl font-black">Menú</h2>
          {menuItems.map(item => (
            <MenuItem key={item.id} item={item} dispatch={dispatch} />
          ))}
        </div>
        <div className="p-5 space-y-10 border border-dashed rounded-lg border-slate-300">
          {state.items.length !== 0 ? (
            <>
              <OrderContents order={state.items} dispatch={dispatch}/>
              <TipPercentageForm key={'tip-percentage'}  tip={state.tip} dispatch={dispatch} />
              <OrderTotals dispatch={dispatch} order={state.items} tip={state.tip} />
            </>
          ) :( <p className="text-3xl font-bold">La orden esta vacia</p>)}

        </div>

      </main>
    </>
  )
}

export default App
