import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers/helpers";
import { OrderActions } from "../reducers/order-reducers";
type OrderTotalsProps = {
  order: OrderItem[],
  tip:number,
  dispatch: React.Dispatch<OrderActions>
}
function OrderTotals({ order,tip,dispatch }: OrderTotalsProps) {
  const subTotalAmount = useMemo(() => order.reduce((total,item)=>total+(item.quantity*item.price),0),[order]);
  const tipAmount=useMemo(()=>subTotalAmount*tip,[tip,subTotalAmount])
  const totalAmount=useMemo(()=>subTotalAmount+tipAmount,[subTotalAmount,tipAmount]);

  return (
    <>
      <div className="space-y-3">
        <h2 className="text-2xl font-black">
          Totales y Propina
        </h2>
        <p>Subtotal a Pagar: <span className="font-bold">{formatCurrency(subTotalAmount)}</span></p>
        <p>Propina: <span className="font-bold">{formatCurrency(tipAmount)}</span></p>
        <p>Total a Pagar: <span className="font-bold">{formatCurrency(totalAmount)}</span></p>
      </div>
      <button onClick={()=>dispatch({type:"place-order"})}
      
      className="w-full p-3 mt-10 font-bold text-white uppercase bg-black disabled:opacity-10" disabled={totalAmount===0}>
          Guardar Ordén
        </button>
    </>
  )
}

export default OrderTotals