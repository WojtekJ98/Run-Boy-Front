"use client";

import AdidasLogo from "../assets/icons/Adidas.svg";
import Asics from "../assets/icons/asics.svg";
import BlackDiamond from "../assets/icons/BlackDiamond.svg";
import Brooks from "../assets/icons/BrooksBlack.svg";
import Hoka from "../assets/icons/hoka.svg";
import Mizuno from "../assets/icons/MizunoBlack.svg";
import NewBalance from "../assets/icons/new-balance.svg";
import Nike from "../assets/icons/NikeSwoosh.svg";
import Puma from "../assets/icons/Puma.svg";
import Salomon from "../assets/icons/salomon.svg";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay } from "swiper/modules";
import styled from "styled-components";

const SwiperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const LogoImage = styled(Image)`
  width: 80px;
  height: 80px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

export default function LogoSlider() {
  const logos = [
    { src: AdidasLogo, alt: "Adidas Logo" },
    { src: Asics, alt: "Asics Logo" },
    { src: BlackDiamond, alt: "Black Diamond Logo" },
    { src: Brooks, alt: "Brooks Logo" },
    { src: Hoka, alt: "Hoka Logo" },
    { src: Mizuno, alt: "Mizuno Logo" },
    { src: NewBalance, alt: "New Balance Logo" },
    { src: Nike, alt: "Nike Logo" },
    { src: Puma, alt: "Puma Logo" },
    { src: Salomon, alt: "Salomon Logo" },
  ];

  return (
    <SwiperContainer>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2200,
        }}
        modules={[FreeMode, Autoplay]}
        className="mySwiper">
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <SlideContent>
              <LogoImage src={logo.src} alt={logo.alt} width={80} height={80} />
            </SlideContent>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
}
