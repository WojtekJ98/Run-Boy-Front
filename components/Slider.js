"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SeeMoreBtn from "./StyledButtonSeeMore";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styled, { css, keyframes } from "styled-components";
import { useState } from "react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SliderContainer = styled.div`
  max-width: 100vw;
`;
const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    background-color: #ddd;
    opacity: 1;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #ddd;
  }
`;
const SlideContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$image",
})`
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  ${({ $image }) =>
    css`
      background-image: url(${$image});
    `}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (min-width: 1600px) {
    height: 600px;
  }
`;
const test = styled.div`
  width: 100%;
  height: 400px;
`;
const WrapperContent = styled.div`
  height: 100%;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 1rem;
  padding-bottom: 3rem;

  h1,
  h2,
  button {
    opacity: 0;
    animation: ${fadeIn} 0.5s ease-in-out 0.3s forwards;
  }
  h1 {
    margin: 2px;
    font-size: 2rem;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
  h2 {
    font-size: 1.5rem;
    margin: 2px;
  }
  button {
    margin-left: 3rem;
    align-self: flex-start;
    &:hover {
    }
  }
`;

export default function SliderMain() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = () => {
    setIsAnimating(false); // Reset animation
    setTimeout(() => setIsAnimating(true), 50); // Trigger animation after a small delay
  };

  return (
    <>
      <SliderContainer>
        <StyledSwiper
          pagination={{
            dynamicBullets: true,
          }}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          onSlideChange={handleSlideChange}>
          <SwiperSlide>
            <SlideContent $image="/img/slider_2.jpg">
              <WrapperContent className={isAnimating ? "fade-in" : ""}>
                <h1>Fuel Your Run with Nike</h1>
                <h2>
                  Engineered for performance, comfort, and style. Discover your
                  perfect pair today!
                </h2>
                <SeeMoreBtn text="See more!" link="/products?brand=+Nike" />
              </WrapperContent>
            </SlideContent>
          </SwiperSlide>
          <SwiperSlide>
            <SlideContent $image="/img/slider_4.jpg">
              <WrapperContent className={isAnimating ? "fade-in" : ""}>
                <h1>Running: Freedom in Every Step</h1>
                <h2>
                  Unleash your potential. Feel the rhythm, embrace the journey.
                </h2>
                <SeeMoreBtn text="Find Your Gear" link="/products" />
              </WrapperContent>
            </SlideContent>
          </SwiperSlide>
          <SwiperSlide>
            <SlideContent $image="/img/slider_3.jpg">
              <WrapperContent className={isAnimating ? "fade-in" : ""}>
                <h1>Elevate Your Run with Hoka</h1>
                <h2>
                  Experience ultimate cushioning and support. Run farther,
                  faster, and stronger.
                </h2>
                <SeeMoreBtn text="See more!" link="/products?brand=+Hoka" />
              </WrapperContent>
            </SlideContent>
          </SwiperSlide>
          <SwiperSlide>
            <SlideContent $image="/img/slider_5.jpg">
              <WrapperContent className={isAnimating ? "fade-in" : ""}>
                <h1>Every Run Has a Story</h1>
                <h2>
                  From beginners to pros, every step counts. Start your
                  adventure today.
                </h2>
                <SeeMoreBtn text="See more!" link="/products" />
              </WrapperContent>
            </SlideContent>
          </SwiperSlide>
        </StyledSwiper>
      </SliderContainer>
    </>
  );
}
