"use client";
import { useStore } from '@/src/store';
import { Product } from '@prisma/client';
type AddProductButtonProps = {
    product: Product
}
function AddProductButton({product}:AddProductButtonProps) {
    const addToOrder = useStore(state => state.addToOrder);
    
    return (
    <button 
    onClick={()=>addToOrder(product)}
    className='bg-indigo-600 hover:bg-indigo-800 uppercase text-white px-4 w-full py-2 mt-5 rounded-lg'>Agregar</button>
  )
}

export default AddProductButton