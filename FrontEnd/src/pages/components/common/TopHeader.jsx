import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductSearch from './ProductSearch';
import CartIcon from './cart-icon/cart-icon.component';
import CartDropdown from './cart-dropdown/cart-dropdown.component';
import { CartContext } from '../contexts/cart.context';

const TopHeader = () => {

    const {isCartOpen} = useContext(CartContext);

    return (
        <div className="container-fluid">
          <div className="row bg-secondary py-2 px-xl-5">
            <div className="col-lg-6 d-none d-lg-block">
              <div className="d-inline-flex align-items-center">
                <Link className="text-dark" to="/">FAQ</Link>
                <span className="text-muted px-2">|</span>
                <Link className="text-dark" to="/">Help</Link>
                <span className="text-muted px-2">|</span>
                <a className="text-dark" href>Support</a>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
              <div className="d-inline-flex align-items-center">
                <a className="text-dark px-2" href>
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="text-dark px-2" href>
                  <i className="fab fa-twitter" />
                </a>
                <a className="text-dark px-2" href>
                  <i className="fab fa-linkedin-in" />
                </a>
                <a className="text-dark px-2" href>
                  <i className="fab fa-instagram" />
                </a>
                <a className="text-dark pl-2" href>
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </div>
          <div className="row align-items-center py-3 px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
              <Link className="text-decoration-none" to="/">
                <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
              </Link>
            </div>
            <ProductSearch />
            <div className="col-lg-3 col-6 text-right">
              <a href className="btn border">
                <i className="fas fa-heart text-primary" />
                <span className="badge">0</span>
              </a>
              <CartIcon />
              { isCartOpen && <CartDropdown />}
            </div>
          </div>
        </div>
      );
};

export default TopHeader;