
import Topmenu from "../common/Topmenu";
import Slider from "./Slider";
import FeaturedItems from "./FeaturedItems";
import CategoryMenu from "../common/CategoryMenu"; // Assuming it's being imported too

const Navigation = () => {
    return (
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <>
            <CategoryMenu />
            <div className="col-lg-9">
              <Topmenu />
              <Slider />
            </div>
            <FeaturedItems />
          </>
        </div>
      </div>
    );
  };
  
  export default Navigation;