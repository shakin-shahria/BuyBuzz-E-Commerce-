import './cart-dropdown.styles.css';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Link } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            {cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item} />
            ))}
            </div>
            <Link className="btn btn-primary px-3" to={"/cartPage"}><i className="fa fa-shopping-cart mr-1" /> Proceed to Cart</Link>
        </div>
    );
};

export default CartDropdown;