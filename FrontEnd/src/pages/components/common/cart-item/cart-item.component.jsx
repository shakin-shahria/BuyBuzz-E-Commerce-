import './cart-item.styles.css';
import AppURL from '../../../../api/AppURL';


const CartItem = ({ cartItem }) => {
    const {product_id, product_title, product_images, product_price, quantity } = cartItem;
    const main_image = product_images.feature_image;
    const imageUrl = AppURL.productImagePath+product_id+'/original/'+main_image;
    return (
        <div className="CartItemContainer">
            <img src={imageUrl} alt={`${product_title}`} />
            <div className="ItemDetails">
                <span>{product_title}</span>
                <span>
                  {quantity} x ${product_price}
                </span>
            </div>
        </div>
    )
}

export default CartItem;