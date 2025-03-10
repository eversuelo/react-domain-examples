
import { menuItems } from "./data/db"
import MenuItem from "./components/MenuItem"
import useOrder from './hooks/useOrder';
import OrderContents from './components/OrderContents';
import OrderTotals from './components/OrderTotals.tsx';
import TipPercentageForm from './components/TipPercentageForm';
function App() {

  const { addItem, order, removeItem, decreaseQuantity, tip, setTip, placeOrder } = useOrder();

  return (
    <>
      <header className="py-5 bg-teal-400">
        <h1 className="text-4xl font-black text-center text-white"> Calculadora de Propinas y Consumo</h1>
      </header>
      <main className="grid py-20 mx-auto max-w-7xl md:grid-cols-2">
        <div className="p-5 space-y-3 ">
          <h2 className="mt-10 text-4xl font-black">Menú</h2>
          {menuItems.map(item => (
            <MenuItem key={item.id} item={item} addItem={addItem} />
          ))}
        </div>
        <div className="p-5 space-y-10 border border-dashed rounded-lg border-slate-300">
          {order.length !== 0 ? (
            <>
              <OrderContents order={order} removeItem={removeItem} decreaseQuantity={decreaseQuantity} />
              <TipPercentageForm tip={tip} setTip={setTip} />
              <OrderTotals placeOrder={placeOrder} order={order} tip={tip} />
            </>
          ) : '<p className="text-3xl font-bold">La orden esta vacia</p>'}

        </div>

      </main>
    </>
  )
}

export default App
