
import { OrderItem } from '@/src/types';
import { PlusIcon, MinusIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { formatCurrency } from '@/src/utils';
import { useStore } from '@/src/store';
import { useMemo } from 'react';
type ProductDetailsProps = {
    item: OrderItem
}
const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;
const ProductDetails = ({ item }: ProductDetailsProps) => {
    const increaseQuantity=useStore(state=>state.increaseQuantity);
    const decreaseQuantity=useStore(state=>state.decreaseQuantity);
    const deleteItem=useStore(state=>state.deleteItem);
    const disableDecreaseQuantity = useMemo(() => item.quantity === MIN_QUANTITY, [item]);
    const disableIncreaseQuantity = useMemo(() => item.quantity === MAX_QUANTITY, [item]);
    return (
        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8" />
                    </button>
                </div>
                <p className="text-2xl text-amber-500 font-black">
                    {formatCurrency(item.price)}
                </p>
                <div className="flex gap-5 px-2  lg:px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        disabled={disableDecreaseQuantity}
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className='disabled:opacity-20 disabled:cursor-not-allowed'
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>

                    <p className="text-lg font-black ">
                        {item.quantity}
                    </p>

                    <button
                        type="button"
                        disabled={disableIncreaseQuantity}
                        className='disabled:opacity-20 disabled:cursor-not-allowed'
                        onClick={() => increaseQuantity(item.id)}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-lg lg:text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal">
                        {formatCurrency(item.subtotal)}
                    </span>
                </p>
            </div>
        </div>

    );
}

export default ProductDetails;
