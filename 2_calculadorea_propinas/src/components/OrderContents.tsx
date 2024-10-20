import type { OrderItem } from "../types"
import { formatCurrency } from '../helpers/helpers';
type OrderContentsProps = {
    order: OrderItem[],
    removeItem: (item: OrderItem) => void,
    decreaseQuantity: (item: OrderItem) => void,
}
function OrderContents({ order, removeItem, decreaseQuantity }: OrderContentsProps) {
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
                                <button onClick={() => removeItem(item)} className="w-8 h-8 font-black text-white bg-red-600 rounded-full" >
                                    X
                                </button>{
                                    item.quantity > 1 ? <button onClick={() => decreaseQuantity(item)} className="items-center w-8 h-8 font-black text-white bg-red-600 rounded-full" >
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