import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <a href="#" className="btn border" onClick={toggleIsCartOpen}>
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge">{cartCount}</span>
        </a>
    );
};

export default CartIcon;