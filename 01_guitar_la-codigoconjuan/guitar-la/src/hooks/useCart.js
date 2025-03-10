
import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db";
const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);
    const MAX_ITEMS = 5;
    useEffect(() => {
        saveLocalStorage();
    }
        , [cart]);
    function addToCart(guitar) {
        const exist = cart.find(item => item.id === guitar.id);
        if (exist) {
            if (exist.quantity >= MAX_ITEMS) return;
            const updateCart = cart.map(item => item.id === guitar.id ? { ...exist, quantity: exist.quantity + 1 } : item);
            setCart(updateCart);
        } else {
            setCart([...cart, { ...guitar, quantity: 1 }]);
        }
    }
    function removeFromCart(guitar) {
        setCart(prevCart => prevCart.filter(item => item.id !== guitar.id));

    }
    function increaseQuantity(guitar) {
        const updateCart = cart.map(item => item.id === guitar.id && guitar.quantity < MAX_ITEMS ? { ...guitar, quantity: guitar.quantity + 1 } : item);
        setCart(updateCart);
    }
    function decreaseQuantity(guitar) {
        const exist = cart.find(item => item.id === guitar.id);
        if (exist.quantity === 1) {
            setCart(prevCart => prevCart.filter(item => item.id !== guitar.id));
        } else if (exist.quantity > 1) {
            const updateCart = cart.map(item => item.id === guitar.id ? { ...guitar, quantity: guitar.quantity - 1 } : item);
            setCart(updateCart);
        } else {
            removeFromCart(guitar);
        }
    }
    function clearCart() {
        setCart([]);
    }
    function saveLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    //State Derivado
    const isEmpty = useMemo(() => cart.length == 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, guitar) => total + guitar.price * guitar.quantity, 0), [cart]);
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

export {
    useCart
}