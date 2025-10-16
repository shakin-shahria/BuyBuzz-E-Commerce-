import TopHeader from "./components/common/TopHeader";
import Navigation from "./components/homepage/Navigation";
import Footer from "./components/common/Footer";
import FeaturedCategory from "./components/homepage/FeaturedCategory";

const HomePage = () => {
    return (
        <>
            <TopHeader />
            <Navigation />
            <FeaturedCategory />
            <Footer />
        </>
    );
}

export default HomePage;