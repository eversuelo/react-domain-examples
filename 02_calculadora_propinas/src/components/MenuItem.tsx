import type { MenuItem } from '../types'

type MenuItemProps = {
    item: MenuItem,
    addItem:(item:MenuItem)=>void,
}
export default function MenuItem({ item,addItem}: MenuItemProps) {
    return (
        <button 
            className='flex justify-between w-full px-4 py-2 my-2 text-left bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            onClick={()=>addItem(item)}
        >
            <p>{item.name}</p>
            <p className="font-black">${item.price}</p>
        </button>
    )
}
