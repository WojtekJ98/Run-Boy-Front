"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SeeMoreBtn from "./StyledButtonSeeMore";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styled, { css, keyframes } from "styled-components";
import { useState } from "react";
import Image from "next/image";

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

const SlideContent = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  @media (max-width: 768px) {
    height: 500px;
  }
`;
const StyledImage = styled(Image)`
  @media (max-width: 480px) {
    object-position: 70% center;
  }
`;
const WrapperContent = styled.div`
  position: absolute;
  bottom: 5px;
  height: 100%;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 1rem;
  padding-bottom: 3rem;
  color: white;

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
    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
  h2 {
    font-size: 1.5rem;
    margin: 2px;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
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
            <SlideContent>
              <Image
                src="/img/slider_2.webp"
                alt="Fuel Your Run with Nike"
                fill
                objectFit="cover"
              />
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
            <SlideContent>
              <StyledImage
                src="/img/slider_3.webp"
                alt="Fuel Your Run with Nike"
                fill
                objectFit="cover"
                priority={false}
              />
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
            <SlideContent>
              <StyledImage
                src="/img/slider_4.webp"
                alt="Fuel Your Run with Nike"
                fill
                objectFit="cover"
                priority={false}
              />
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
            <SlideContent>
              <StyledImage
                src="/img/slider_5.webp"
                alt="Fuel Your Run with Nike"
                fill
                objectFit="cover"
                priority={false}
              />
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
