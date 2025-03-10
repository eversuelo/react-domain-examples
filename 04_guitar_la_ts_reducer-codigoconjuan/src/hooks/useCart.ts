import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { CartItem, Guitar } from "../types";
const useCart = () => {
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);
    const MAX_ITEMS = 5;
    useEffect(() => {
        saveLocalStorage();
    }, [cart]);
    function addToCart(guitar: Guitar) {
        const exist = cart.findIndex((item) => item.id === guitar.id);
        console.log(exist);
        if (exist >= 0) {
            if (cart[exist].quantity >= MAX_ITEMS) return;
            const updateCart = [...cart];
            updateCart[exist].quantity += 1;
            setCart(updateCart);

        } else {
            const newGuitar:CartItem = { ...guitar, quantity: 1 };
            setCart([...cart, newGuitar]);
        }
    }
    function removeFromCart(guitar: Guitar) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== guitar.id));
    }
    function increaseQuantity(guitar: CartItem) {
        const updateCart = cart.map((item) =>
            item.id === guitar.id && guitar.quantity < MAX_ITEMS
                ? { ...guitar, quantity: guitar.quantity + 1 }
                : item
        );
        setCart(updateCart);
    }
    function decreaseQuantity(guitar: CartItem) {
        const exist: CartItem | undefined = cart.find((item) => item.id === guitar.id);
        if (exist != undefined && exist.quantity === 1) {
            setCart((prevCart) => prevCart.filter((item) => item.id !== guitar.id));
        } else if (exist != undefined && exist.quantity > 1) {
            const updateCart = cart.map((item) =>
                item.id === guitar.id
                    ? { ...guitar, quantity: guitar.quantity - 1 }
                    : item
            );
            setCart(updateCart);
        } else {
            removeFromCart(guitar);
        }
    }
    function clearCart() {
        setCart([]);
    }
    function saveLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    //State Derivado
    const isEmpty = useMemo(() => cart.length, [cart]);
    const cartTotal = useMemo(
        () =>
            cart.reduce((total, guitar) => total + guitar.price * guitar.quantity, 0),
        [cart]
    );
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    };
};

export { useCart};
