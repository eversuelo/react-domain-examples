import { create } from "zustand";
import { OrderItem } from './types/index';
import { Product } from "@prisma/client";
import { products } from '../prisma/data/products';
interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    deleteItem: (id: Product['id']) => void
    clearOrder: () => void

}
export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product: Product) => {
        const { categoryId, image, ...data } = product;
        let order: OrderItem[] = [];
        if (get().order.find((item) => item.id === product.id)) {
            order= get().order.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1,subtotal:item.price * (item.quantity+1)}
                }
                return item
            });
        } else {
            order = [...get().order, { ...data, quantity: 1,subtotal:data.price }];
        }
        set({ order });
    },
    increaseQuantity: (id: Product['id']) => {
        const order = get().order.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1,subtotal:item.price * (item.quantity+1) }
            }
            return item
        });
        set({ order });
    },
    decreaseQuantity: (id: Product['id']) => {
        const order = get().order.map((item) => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1,subtotal:item.price * (item.quantity-1) }
            }else{
                return item
            }
            
        }).filter((item) => item.quantity > 0);
        set({ order });
    },
    deleteItem: (id: Product['id']) => {
        const order = get().order.filter((item) => item.id !== id);
        set({ order });
    },
    clearOrder: () => {
        set({ order: [] });
    }
    
}));