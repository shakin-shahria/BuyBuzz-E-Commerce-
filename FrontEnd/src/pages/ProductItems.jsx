import { useEffect, useState, useContext } from "react";
import AppURL from "../api/AppURL";
import axios from "axios";
import { CartContext } from "./components/contexts/cart.context";

const ProductItems = ({ productId }) => {

    const [ProductDetails, setProductDetails] = useState([]);
    const [featureImage, setFeatureImage] = useState([]);
	  const [galleryImages, setGalleryImages] = useState([]);

    const main_image_path = AppURL.productImagePath+productId+'/original/';
	  const gallery_image_path = AppURL.productImagePath+productId+'/gallery_images/';

    const { addItemToCart } = useContext(CartContext);

    const [activeTab, setActiveTab] = useState(1); // State to manage the active tab

    const [sizeData, setSizeData] = useState([]);
    const [colorData, setColorData] = useState([]);

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const [quantity, setQuantity] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };
    
    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    
    const addProductToCart = () => {
      const productWithQuantity = { ...ProductDetails, quantity };
      addItemToCart(productWithQuantity);
    }

    const handleIncrement = () => {
      setQuantity(quantity + 1);
    }

    const handleDecrement = () => {
      if(quantity > 1){
        setQuantity(quantity - 1);
      }
    }

    useEffect(() => {
        axios
        .get(AppURL.getProductsById(productId))
        .then((response) => {
            //console.log(response.data);
            setProductDetails(response.data.product_details);

            const featuresImage = response.data.product_details.product_images && response.data.product_details.product_images.feature_image;
		    setFeatureImage(featuresImage);

            const imageArrayJSON  = response.data.product_details.product_images && response.data.product_details.product_images.gallery_images;
		    setGalleryImages(JSON.parse(imageArrayJSON));

            setSizeData(response.data.size_data);
            setColorData(response.data.color_data);

        })
        .catch((error) => {
            console.error(error);
        });
    }, [productId]);

    return (
        <div className="container-fluid pt-5">
	        <div className="row px-xl-5 pb-3">
	    		<div className="col-lg-5 pb-5">
                    <div id="product-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner border">
                            <div className="carousel-item active">
                            <img className="w-100 h-100" src={main_image_path+featureImage} alt="Image" />
                            </div>
                            {galleryImages && galleryImages.length > 0 ? (
                                    galleryImages.map((image, index) => (
                                    <div className="carousel-item" key={index}>
                                        <img className="w-100 h-100" src={gallery_image_path+image} alt={`Image ${index + 1}`} />
                                    </div>
                                    ))
                                ) : ''}
                        </div>
                        <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                            <i className="fa fa-2x fa-angle-left text-dark" />
                        </a>
                        <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                            <i className="fa fa-2x fa-angle-right text-dark" />
                        </a>
                    </div>
		        </div>

		      <div className="col-lg-7 pb-5">
		        <h3 className="font-weight-semi-bold">{ProductDetails.product_title}</h3>
		        <div className="d-flex mb-3">
		          <div className="text-primary mr-2">
		            <small className="fas fa-star" />
		            <small className="fas fa-star" />
		            <small className="fas fa-star" />
		            <small className="fas fa-star-half-alt" />
		            <small className="far fa-star" />
		          </div>
		          <small className="pt-1">(50 Reviews)</small>
		        </div>
		        <h3 className="font-weight-semi-bold mb-4">${ProductDetails.product_price}</h3>
		        <p className="mb-4">{ProductDetails.short_description}</p>
		        <div className="d-flex mb-3">
		          <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
		          <form>
                  {sizeData.map((size, index) => (
                    <div className="custom-control custom-radio custom-control-inline" key={index}>
                    <input
                        type="radio"
                        className="custom-control-input"
                        id={`size-${index}`}
                        name="size"
                        value={size}
                        checked={selectedSize === size}
                        onChange={handleSizeChange}
                    />
                    <label className="custom-control-label" htmlFor={`size-${index}`}>{size}</label>
                    </div>
                ))}
		          </form>
		        </div>
		        <div className="d-flex mb-4">
		          <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
		          <form>
                  {colorData.map((color, index) => (
                        <div className="custom-control custom-radio custom-control-inline" key={index}>
                        <input
                            type="radio"
                            className="custom-control-input"
                            id={`color-${index}`}
                            name="color"
                            value={color}
                            checked={selectedColor === color}
                            onChange={handleColorChange}
                        />
                        <label className="custom-control-label" htmlFor={`color-${index}`}>{color}</label>
                        </div>
                    ))}
		          </form>
		        </div>
		        <div className="d-flex align-items-center mb-4 pt-2">
		          <div className="input-group quantity mr-3" style={{width: '130px'}}>
		            <div className="input-group-btn">
		              <button className="btn btn-primary btn-minus" onClick={handleDecrement}>
		                <i className="fa fa-minus" />
		              </button>
		            </div>
		            <input type="text" className="form-control bg-secondary text-center" value={quantity} readOnly />
		            <div className="input-group-btn">
		              <button className="btn btn-primary btn-plus" onClick={handleIncrement}>
		                <i className="fa fa-plus" />
		              </button>
		            </div>
		          </div>
		          <button className="btn btn-primary px-3" onClick={addProductToCart}><i className="fa fa-shopping-cart mr-1" /> Add To Cart</button>
		        </div>
		        <div className="d-flex pt-2">
		          <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
		          <div className="d-inline-flex">
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
		              <i className="fab fa-pinterest" />
		            </a>
		          </div>
		        </div>
		      </div>
    	</div>

        <div className="row px-xl-5">
      <div className="col">
        <div className="nav nav-tabs justify-content-center border-secondary mb-4">
          <a
            className={`nav-item nav-link ${activeTab === 1 ? "active" : ""}`}
            onClick={() => handleTabClick(1)}
          >
            Description
          </a>
          <a
            className={`nav-item nav-link ${activeTab === 2 ? "active" : ""}`}
            onClick={() => handleTabClick(2)}
          >
            Information
          </a>
          <a
            className={`nav-item nav-link ${activeTab === 3 ? "active" : ""}`}
            onClick={() => handleTabClick(3)}
          >
            Reviews (0)
          </a>
        </div>
        <div className="tab-content">
          {/* Description Tab */}
          <div className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`}>
            <h4 className="mb-3">Product Description</h4>
                <div dangerouslySetInnerHTML={{ __html: ProductDetails.long_description  }}></div>
          </div>

          {/* Information Tab */}
          <div className={`tab-pane fade ${activeTab === 2 ? "show active" : ""}`}>
            <h4 className="mb-3">Additional Information</h4>
            <p>
              Test
            </p>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                  </li>
                  <li className="list-group-item px-0">
                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                  </li>
                  <li className="list-group-item px-0">
                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                  </li>
                  <li className="list-group-item px-0">
                    Takimata ea clita labore amet ipsum erat justo voluptua.
                    Nonumy.
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                  </li>
                  <li className="list-group-item px-0">
                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                  </li>
                  <li className="list-group-item px-0">
                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                  </li>
                  <li className="list-group-item px-0">
                    Takimata ea clita labore amet ipsum erat justo voluptua.
                    Nonumy.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews Tab */}
          <div className={`tab-pane fade ${activeTab === 3 ? "show active" : ""}`}>
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-4">1 review for Colorful Stylish Shirt</h4>
                <div className="media mb-4">
                  <img
                    src="img/user.jpg"
                    alt="Image"
                    className="img-fluid mr-3 mt-1"
                    style={{ width: "45px" }}
                  />
                  <div className="media-body">
                    <h6>
                      John Doe<small> - <i>01 Jan 2045</i></small>
                    </h6>
                    <div className="text-primary mb-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <i className="far fa-star"></i>
                    </div>
                    <p>
                      Diam amet duo labore stet elitr ea clita ipsum, tempor
                      labore accusam ipsum et no at. Kasd diam tempor rebum magna
                      dolores sed sed eirmod ipsum.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="mb-4">Leave a review</h4>
                <small>
                  Your email address will not be published. Required fields are
                  marked *
                </small>
                <div className="d-flex my-3">
                  <p className="mb-0 mr-2">Your Rating * :</p>
                  <div className="text-primary">
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="message">Your Review *</label>
                    <textarea
                      id="message"
                      cols="30"
                      rows="5"
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group mb-0">
                    <input
                      type="submit"
                      value="Leave Your Review"
                      className="btn btn-primary px-3"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>                                


  	</div>
    );
};

export default ProductItems;