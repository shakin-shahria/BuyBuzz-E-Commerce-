
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"

const Slider = () => {
    const images = [
        "/img/carousel-1.jpg",
        "/img/carousel-2.jpg",
    ];
    return (
        <div id="header-carousel" className="carousel slide" data-ride="carousel">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                    <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        style={{ width: "100%", borderRadius: "10px", height:"410px" }}
                    />
                    </SwiperSlide>
                ))}
                </Swiper>
        </div>
    );
};

export default Slider;