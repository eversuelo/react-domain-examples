import { MenuItem, OrderItem } from "../types"
export type OrderActions = { type: "add-item", payload: { item: MenuItem } } |
{ type: "remove-item", payload: { item: MenuItem } } |
{ type: "place-order" } |
{ type: "decrease-quantity", payload: { item: OrderItem } } |
{ type: "set-tip", payload: { tip: number } } |
{ type: "increase-quantity", payload: { item: OrderItem } };

export type OrderState = {
    items: OrderItem[],
    tip: number
}

export const initialState: OrderState = {
    items: [],
    tip: 0
}

export const orderReducer = (state: OrderState, action: OrderActions): OrderState => {
    switch (action.type) {
        case "add-item":
            if (state.items.find(item => item.id === action.payload.item.id)) {
                return {
                    ...state,
                    items: state.items.map(item => {
                        if (item.id === action.payload.item.id) {
                            return { ...item, quantity: item.quantity + 1 }
                        }
                        return item
                    })
                }
            } else
                return {
                    ...state,
                    items: [...state.items, { ...action.payload.item, quantity: 1 }]
                }
            return state;
        case "remove-item":
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.item.id)
            }
        case "place-order":
            return {
                ...state,
                items: [],
                tip: 0
            }
        case "decrease-quantity":
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.payload.item.id) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    return item
                }).filter(item => item.quantity > 0)
            }
        case "set-tip":
            return {
                ...state,
                tip: action.payload.tip
            }
        default:
            return state
    }
}