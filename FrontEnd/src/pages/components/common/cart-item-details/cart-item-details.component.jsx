import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";
import AppURL from "../../../../api/AppURL";

const CartItemDetails = () => {
    const { cartItems, addItemToCart, removeItemToCart, clearItemFromCart, cartTotal } = useContext(CartContext);

    console.log(cartItems);

    return (
    <div className="container-fluid pt-5">
        <div className="row px-xl-5">
        <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-bordered text-center mb-0">
            <thead className="bg-secondary text-dark">
                <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
                </tr>
            </thead>
            <tbody className="align-middle">
                { cartItems.map((item, index) => (
                <tr key={index}>
                    <td className="align-middle"><img src={AppURL.productImagePath + item.product_id + '/thumbnail/' + item.product_images.feature_image} alt="" style={{width: '50px'}} /> {item.product_title}</td>
                    <td className="align-middle">${item.product_price}</td>
                    <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus" onClick={() => removeItemToCart(item)}>
                            <i className="fa fa-minus" />
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-secondary text-center" value={item.quantity} />
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus" onClick={() => addItemToCart(item)}>
                            <i className="fa fa-plus" />
                            </button>
                        </div>
                        </div>
                    </td>
                    <td className="align-middle">${item.quantity * item.product_price}</td>
                    <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => clearItemFromCart(item)}><i className="fa fa-times" /></button></td>
                </tr>
                )) }
            </tbody>
            </table>
        </div>
        <div className="col-lg-4">
            <form className="mb-5" action>
            <div className="input-group">
                <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                <div className="input-group-append">
                <button className="btn btn-primary">Apply Coupon</button>
                </div>
            </div>
            </form>
            <div className="card border-secondary mb-5">
            <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Subtotal</h6>
                <h6 className="font-weight-medium">${cartTotal}</h6>
                </div>
                <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">$10</h6>
                </div>
            </div>
            <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                <h5 className="font-weight-bold">Total</h5>
                <h5 className="font-weight-bold">${cartTotal + 10}</h5>
                </div>
                <Link className="btn btn-block btn-primary my-3 py-3"  to={"/checkoutPage"}>Proceed To Checkout</Link>
            </div>
            </div>
        </div>
        </div>
    </div>
	);
};

export default CartItemDetails;