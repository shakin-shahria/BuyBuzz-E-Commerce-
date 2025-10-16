import React from 'react'
import TopHeader from "./components/common/TopHeader";


import Topmenu from "./components/common/Topmenu";
import Footer from "./components/common/Footer";

import Paymentdetails from './components/common/paymentdetails';
export default function Thankyou() {
    return (
        <>
            <TopHeader />
			<div className="container-fluid mb-10">
				<div className="row border-top px-xl-5">
                   
                    <Topmenu />
				</div>
			</div>
			
			<Paymentdetails/>
			<Footer />
        </>
    );
}
