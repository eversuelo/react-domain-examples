import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers/helpers";
type OrderTotalsProps = {
  order: OrderItem[],
  tip:number,
  placeOrder:()=>void,
}
function OrderTotals({ order,tip,placeOrder }: OrderTotalsProps) {
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
      <button onClick={()=>placeOrder()} className="w-full p-3 mt-10 font-bold text-white uppercase bg-black disabled:opacity-10" disabled={totalAmount===0}>
          Guardar Ordén
        </button>
    </>
  )
}

export default OrderTotals