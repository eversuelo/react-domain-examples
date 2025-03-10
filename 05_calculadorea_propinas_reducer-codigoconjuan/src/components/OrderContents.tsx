import type { OrderItem } from "../types"
import { formatCurrency } from '../helpers/helpers';
import { OrderActions } from "../reducers/order-reducers";
type OrderContentsProps = {
    order: OrderItem[],
    dispatch: React.Dispatch<OrderActions>
}
function OrderContents({ order, dispatch }: OrderContentsProps) {
    return (
        <div>
            <h2 className='text-4xl font-black'>Consumo</h2>
            <div className="mt-5 space-y-3">
                {
                    order.map(item => (

                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-slate-300">
                            <div>
                                <p className="text-lg">
                                    {item.name} - {formatCurrency(item.price)}
                                </p>
                                <p className="font-black">
                                    Cantidad: {item.quantity} - Total: {formatCurrency(item.price * item.quantity)}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => dispatch({ type: "remove-item", payload: { item } })}
                                className="w-8 h-8 font-black text-white bg-red-600 rounded-full" >
                                    X
                                </button>{
                                    item.quantity > 1 ? <button onClick={() => dispatch({ type: "decrease-quantity", payload: { item } })}
                                    className="items-center w-8 h-8 font-black text-white bg-red-600 rounded-full" >
                                        -
                                    </button> : null
                                }

                            </div>
                        </div>
                    )
                    )

                }

            </div>
        </div>
    )
}

export default OrderContents