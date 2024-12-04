"use client";
import Image from "next/image";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import CenterWrapper from "./CenterWrapper";

import ButtonLink from "./ButtonLink";
const Bg = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const Center = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 20px;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: block;
  }
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const ImgWrapper = styled.div`
  justify-self: center;
  max-width: 450px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  max-width: 450px;
  height: 450px;
  @media (max-width: 768px) {
    max-height: 300px;
    max-width: 300px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #555;
  }
  .swiper-button-prev {
    left: -20px;
  }
  .swiper-button-next {
    right: -20px;
  }
  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    color: black;
    transform: scale(1.1);
    transition: transform 0.3s;
  }

  .swiper-pagination-bullet {
    background-color: #555;
    opacity: 1;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;
const Text = styled.p`
  margin-bottom: 10px;
  color: #555;
`;

export default function Featured({ product }) {
  return (
    <Bg>
      <CenterWrapper>
        <Center>
          <TextWrapper>
            <Title>{product.name}</Title>
            <Text>{product.description}</Text>
            <ButtonLink href={"/product/" + product._id}>Read more</ButtonLink>
          </TextWrapper>
          <ImgWrapper>
            <StyledSwiper
              effect={"flip"}
              grabCursor={true}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              modules={[EffectFlip, Pagination, Navigation]}
              className="mySwiper">
              {product?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <SlideContent>
                    <Image
                      src={image}
                      alt="New Balance 1080"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </SlideContent>
                </SwiperSlide>
              ))}
            </StyledSwiper>
          </ImgWrapper>
        </Center>
      </CenterWrapper>
    </Bg>
  );
}
