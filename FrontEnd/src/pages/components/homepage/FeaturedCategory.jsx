
import React, { useEffect, useState } from "react";
import AppURL from "../../../api/AppURL";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedCategory = () => {

    const [featuredCategory, setFeaturedCategory] = useState([]);

    useEffect(() => {
        axios
        .get(AppURL.getAllFeaturedCategory)
        .then((response) => {
            //console.log(response.data);
            setFeaturedCategory(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div className="container-fluid pt-5">
          <div className="row px-xl-5 pb-3">
            {Object.keys(featuredCategory).map((key) => {
              const image_path = AppURL.categoryImagePath + featuredCategory[key].category_image;
              return (
                <div className="col-lg-4 col-md-6 pb-1" key={key}>
                  <div className="cat-item d-flex flex-column border mb-4" style={{ padding: "30px" }}>
                    <p className="text-right">{featuredCategory[key].total_products_count} Products</p>
                    <Link
                      className="cat-img position-relative overflow-hidden mb-3"
                      to={`/shop/${featuredCategory[key].category_row_id}`}
                    >
                      <img
                        className="img-fluid"
                        src={image_path}
                        alt=""
                        width="500px"
                        height="400px"
                      />
                    </Link>
                    <h5 className="font-weight-semi-bold m-0">{featuredCategory[key].category_name}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
};

export default FeaturedCategory;