import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";	// 추가
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation, Pagination, Autoplay])
const SwiperComponent = ({slides}) => {
    return(
        <div>
            <Swiper
                className="banner"
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}	// 추가
                loop={true}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>{slide}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
export default SwiperComponent;