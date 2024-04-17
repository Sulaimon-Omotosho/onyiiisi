"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { feedbacks } from "@/constants";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToComment = (idx: number) => {
    setCurrentIndex(idx);
  };

  const prevFeedback = () => {
    const isFirstComment = currentIndex === 0;
    const newIndex = isFirstComment ? feedbacks.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextFeedback = () => {
    const isLastComment = currentIndex === feedbacks.length - 1;
    const newIndex = isLastComment ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="my-20">
      <div className="relative flex justify-center items-center w-full h-[500px] md:h-[400px] lg:h-[594px]">
        <Image
          src="/Feedback bg.jpg"
          alt="Feedback BG"
          fill
          className="brightness-75 object-cover"
        />
        <div className="absolute flex items-center flex-col gap-8 w-[80%] lg:w-[50%]">
          <div className="absolute top-[-20px] left-[49%] p-2 rounded-full bg-yellow-700 w-fit ">
            <Quote color="white" size={15} />
          </div>
          {feedbacks.map((feedback, idx) => (
            <div
              key={idx}
              className={`text-center bg-white rounded-lg p-3 md:p-6 ${
                idx === currentIndex ? "opacity-100" : "opacity-0 hidden"
              } `}
            >
              <p className=" text-sm md:text-md lg:text-lg text-gray-500">
                {feedback.comment}
              </p>
              <h3 className="font-semibold pt-1 md:pt-3 text-xl capitalize">
                {feedback.name}
              </h3>
              <p className="text-sm text-orange-800 capitalize">
                {feedback.verified}
              </p>
            </div>
          ))}
          <div className="w-[80%] hidden md:flex">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              // slidesPerView={5}
              spaceBetween={30}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[EffectCoverflow, Navigation]}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 5 },
              }}
              className="swiper_container flex items-center justify-center"
            >
              {feedbacks.map((feedback, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    key={idx}
                    onClick={() => goToComment(idx)}
                    className="relative mx-3 h-[80px] lg:h-[120px] w-[80px] lg:w-[120px] overflow-hidden rounded-full border-4 border-yellow-700"
                  >
                    <Image
                      src={feedback.image}
                      alt={feedback.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div className="">
                <div
                  onClick={prevFeedback}
                  className="swiper-button-prev lg:hover:scale-150 ease-in-out duration-300"
                >
                  <ChevronLeft size={10} />
                </div>
                <div
                  onClick={nextFeedback}
                  className="swiper-button-next lg:hover:scale-150 ease-in-out duration-300"
                >
                  <ChevronRight size={10} />
                </div>
                {/* <div className='swiper-pagination'></div> */}
              </div>
            </Swiper>
          </div>

          {/* Mobile  */}

          <div className="md:hidden relative flex justify-center items-center w-full">
            <div className="">
              {feedbacks.map((feedback, idx) => (
                <div
                  key={idx}
                  className={`relative mx-3 h-[150px] w-[150px] overflow-hidden rounded-full border-4 border-yellow-700 ${
                    idx === currentIndex ? "opacity-100" : "opacity-0 hidden"
                  }
                `}
                >
                  <Image
                    src={feedback.image}
                    alt={feedback.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div onClick={prevFeedback} className=" absolute left-1 ">
              <ChevronLeft size={50} className="text-white drop-shadow-xl" />
            </div>
            <div onClick={nextFeedback} className=" absolute right-1">
              <ChevronRight size={50} className="text-white drop-shadow-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
