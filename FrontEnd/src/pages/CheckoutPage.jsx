import TopHeader from "./components/common/TopHeader";
import CategoryMenu from "./components/common/CategoryMenu";
import PageHeader from "./components/common/PageHeader";
import Topmenu from "./components/common/Topmenu";
import Footer from "./components/common/Footer";
import CheckoutDetails from "./components/common/checkout-details/checkout-details.component.jsx";

const CheckoutPage = () => {

    return (
        <>
            <TopHeader />
			<div className="container-fluid mb-5">
				<div className="row border-top px-xl-5">
                    <CategoryMenu />
                    <Topmenu />
				</div>
			</div>
			<PageHeader />
			<CheckoutDetails />
			<Footer />
        </>
    );
};

export default CheckoutPage;