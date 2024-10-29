import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/less/navigation";
import "swiper/less/pagination";
import "swiper/less/scrollbar";
import "../../css/slider.css";

function HowItWorksSlider() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => {}}
      onSlideChange={() => {}}
    >
      <SwiperSlide>
        <div className="flex flex-col items-center text-sm gap-2">
          <img src="/svgs/person-clip.svg" className="h-[50px]" />
          <h1 className="font-semibold text-center">
            Register an account to start
          </h1>
          <span className="text-center text-little">
            Sign up as a candidate or an employer
          </span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col items-center text-sm gap-2">
          <img src="/svgs/job-search.svg" className="h-[50px]" />
          <h1 className="font-semibold text-center">
            Explore over thousands of resume/employers
          </h1>
          <span className="text-center text-little">
            Get unlimited access to candidates and employers/companies
          </span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col items-center tex-sm gap-2">
          <img src="/svgs/update-profile.svg" className="h-[50px]" />
          <h1 className="font-semibold">Update Profile</h1>
          <span className="text-center text-little">
            Update your profile on your dashboard
          </span>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HowItWorksSlider;
