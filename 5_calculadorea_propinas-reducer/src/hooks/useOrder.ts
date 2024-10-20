import {  useState } from "react"
import type { MenuItem, OrderItem } from "../types"

function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tip,setTip]=useState(0);
    const addItem = (item: MenuItem) => {
        const itemExists = order.find(orderItem => orderItem.id === item.id);
        if (itemExists) {
            const updatedOrder = order.map(orderItem =>
                orderItem.id === item.id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            );
            setOrder(updatedOrder);
            return;
        }
        else { 
            const newItem: OrderItem = { ...item, quantity: 1 };
            setOrder([...order, newItem]);
        }

    }
    const decreaseQuantity = (item: OrderItem) => {
        const itemExists = order.find(orderItem => orderItem.id === item.id);
        if (itemExists) {
            const updatedOrder = order.map(orderItem =>
                orderItem.id === item.id && orderItem.quantity > 1 
                    ? { ...orderItem, quantity: orderItem.quantity - 1 }
                    : orderItem
            );
            setOrder(updatedOrder);
            return;
        }
    }
    const removeItem=(item: OrderItem) => {
        const updatedOrder = order.filter(orderItem => orderItem.id !== item.id);
        setOrder(updatedOrder);
    }
    const placeOrder=()=>{
     setOrder([]);
    setTip(0);
    }
    return {
        tip,
        setTip,
        addItem,
        removeItem,
        order,
        decreaseQuantity,
        placeOrder
    }
}

export default useOrder