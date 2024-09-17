import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/less/navigation";
import "swiper/less/pagination";
import "swiper/less/scrollbar";
import '../../css/slider.css'

function HowItWorksSlider() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <div className="flex flex-col items-center text-sm">
          <h1 className="font-semibold">Title One</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            atque nesciunt laudantium! Adipisci beatae provident inventore. Ea,
            quos amet. Error assumenda sed libero natus omnis deleniti dolores
            voluptatibus veniam laboriosam?
          </span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col items-center text-sm">
          <h1 className="font-semibold">Title Two</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            atque nesciunt laudantium! Adipisci beatae provident inventore. Ea,
            quos amet. Error assumenda sed libero natus omnis deleniti dolores
            voluptatibus veniam laboriosam?
          </span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col items-center text-sm">
          <h1 className="font-semibold">Title Three</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            atque nesciunt laudantium! Adipisci beatae provident inventore. Ea,
            quos amet. Error assumenda sed libero natus omnis deleniti dolores
            voluptatibus veniam laboriosam?
          </span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col items-center text-sm">
          <h1 className="font-semibold">Title Four</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            atque nesciunt laudantium! Adipisci beatae provident inventore. Ea,
            quos amet. Error assumenda sed libero natus omnis deleniti dolores
            voluptatibus veniam laboriosam?
          </span>
        </div>
      </SwiperSlide>
      ...
    </Swiper>
  );
}

export default HowItWorksSlider;
