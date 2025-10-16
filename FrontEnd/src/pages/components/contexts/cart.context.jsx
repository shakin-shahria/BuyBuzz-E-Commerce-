import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
    console.log(productToAdd);

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.product_id === productToAdd.product_id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.product_id === productToAdd.product_id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    }
    

    return [...cartItems, productToAdd];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.product_id === cartItemToRemove.product_id
    );
  
    // check if quantity is equal to 1, if it is; remove that item from the cart
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.product_id !== cartItemToRemove.product_id);
    }
  
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
      cartItem.product_id === cartItemToRemove.product_id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});


export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
          );
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.product_price, 0
          );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        console.log(productToAdd);
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        cartItems,
        cartCount,
        cartTotal
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}