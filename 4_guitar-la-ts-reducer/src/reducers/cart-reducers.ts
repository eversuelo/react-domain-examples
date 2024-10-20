import { CartItem, Guitar } from "../types";
import { db } from "../data/db";
const MAX_ITEMS = 5;
export type CartActions=
{type:'add-to-cart',payload:{item:Guitar}}|
{type:'remove-from-cart',payload:{id:Guitar['id']}}|
{type:'increase-quantity',payload:{id:Guitar['id']}}|
{type:'decrease-quantity',payload:{id:Guitar['id']}}|
{type:'clear-cart'};
export type CartState ={
    data:Guitar[],
    cart:CartItem[]
}
const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
};
export const initialState:CartState={
    data:db,
    cart:initialCart()
}
export const cartReducer=(state:CartState,action:CartActions):CartState=>{
    switch(action.type){
        case 'add-to-cart': {
            const exist=state.cart.find(item=>item.id===action.payload.item.id);
            if(exist){
                if(exist.quantity>=MAX_ITEMS) return state;
                return{
                    ...state,
                    cart:state.cart.map(item=>item.id===action.payload.item.id?{...item,quantity:item.quantity+1}:item)
                }
            }
            return{
                ...state,
                cart:[...state.cart,{...action.payload.item,quantity:1}]
            }
        }
        case 'remove-from-cart':
            return{
                ...state,
                cart:state.cart.filter(item=>item.id!==action.payload.id)
            }
        case 'increase-quantity':
            return{
                ...state,
                cart:state.cart.map(item=>item.id===action.payload.id?{...item,quantity:item.quantity<=MAX_ITEMS?item.quantity+1:item.quantity}:item)
            }
        case 'decrease-quantity':
            return{
                ...state,
                cart:state.cart.map(item=>item.id===action.payload.id?{...item,quantity:item.quantity>1?item.quantity-1:item.quantity}:item)
            }
        case 'clear-cart':
            return{
                ...state,
                cart:[]
            }
        default:
            return state;
    }
}
