import { useEffect, useState } from "react";
import AppURL from "../../../api/AppURL";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = ({ categoryId }) => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        axios
        .get(AppURL.ProductListByCategory(categoryId))
        .then((response) => {
            console.log(response.data);
            setProductData(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [categoryId]);

    return (
        <div className="col-lg-12 col-md-12">
          <div className="row pb-3">
            <div className="col-12 pb-1">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <form>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search by name" />
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent text-primary">
                        <i className="fa fa-search" />
                      </span>
                    </div>
                  </div>
                </form>
                <div className="dropdown ml-4">
                  <button
                    className="btn border dropdown-toggle"
                    type="button"
                    id="triggerId"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort by
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                    <a className="dropdown-item" href="#">
                      Latest
                    </a>
                    <a className="dropdown-item" href="#">
                      Popularity
                    </a>
                    <a className="dropdown-item" href="#">
                      Best Rating
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {productData.length > 0 ? (
              Object.keys(productData).map((key, i) => {
                const pid = productData[key].product_id;
                const imagePath =
                  AppURL.productImagePath + pid + "/original/" + productData[key].product_images.feature_image;
    
                return (
                  <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={i}>
                    <div className="card product-item border-0 mb-4">
                      <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img className="img-fluid w-100" src={imagePath} alt="" />
                      </div>
                      <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 className="text-truncate mb-3">{productData[key].product_title}</h6>
                        <div className="d-flex justify-content-center">
                          <h6>${productData[key].product_price}</h6>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between bg-light border">
                        <Link className="btn btn-sm text-dark p-0" to={`/productdetails/${pid}`}>
                          <i className="fas fa-eye text-primary mr-1" />
                          View Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center w-100">No products found.</p>
            )}
          </div>
        </div>
      );
};

export default Products;