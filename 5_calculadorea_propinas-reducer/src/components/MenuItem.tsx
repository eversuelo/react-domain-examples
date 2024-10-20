import React from 'react'
import type { MenuItem } from '../types'
import { OrderActions } from '../reducers/order-reducers'

type MenuItemProps = {
    item: MenuItem,
    dispatch:React.Dispatch<OrderActions>,
}
export default function MenuItem({ item,dispatch}: MenuItemProps) {
    return (
        <button 
            className='flex justify-between w-full px-4 py-2 my-2 text-left bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            onClick={()=>dispatch({type:"add-item",payload:{item}})}
        >
            <p>{item.name}</p>
            <p className="font-black">${item.price}</p>
        </button>
    )
}
