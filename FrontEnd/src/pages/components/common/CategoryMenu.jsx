import { useEffect, useState } from "react";
import AppURL from "../../../api/AppURL";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryMenu = () => {

    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        axios
        .get(AppURL.AllCategoryDetails)
        .then((response) => {
            //console.log(response.data);
            setMenuData(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

  return (
    <div className="col-lg-3 d-none d-lg-block">
        <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: '65px', marginTop: '-1px', padding: '0 30px'}}>
            <h6 className="m-0">Categories</h6>
            <i className="fa fa-angle-down text-dark"></i>
        </a>
        <nav className="position-absolute collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical" style={{width: 'calc(100% - 30px)', zIndex: 1}}>
            <div className="navbar-nav w-100 overflow-hidden" style={{height: '410px'}}>
                {Object.keys(menuData).map((key, i) => (
                    <div className="nav-item dropdown" key={i}>
                    <Link href="#" className="nav-link" data-toggle="dropdown">
                        {menuData[key].category_name} <i className="fa fa-angle-down float-right mt-1" />
                    </Link>
                    {menuData[key].subcategory ? (
                        <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                        {Object.keys(menuData[key].subcategory).map((sub, j) => (
                            <Link className="dropdown-item" key={j} to={`/shop/${sub}`}>
                            {menuData[key].subcategory[sub].category_name}
                            </Link>
                        ))}
                        </div>
                    ) : (
                        ""
                    )}
                    </div>
                ))}
            </div>
        </nav>
    </div>
  );
};

export default CategoryMenu;