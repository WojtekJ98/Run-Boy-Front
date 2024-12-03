"use client";
import styled from "styled-components";
import CenterWrapper from "./CenterWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";

const StyledContainer = styled.div`
  padding: 80px 0;
`;

const StyledItile = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    padding: 40px 0;
    display: flex;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    background-color: #555;
    top: -50px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #333;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    color: #000;
  }
`;

export default function NewProducts({ products }) {
  return (
    <CenterWrapper>
      <StyledContainer>
        <StyledItile>New items</StyledItile>
        <StyledSwiper
          slidesPerView={5}
          spaceBetween={20}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            1650: {
              slidesPerView: 5,
            },
            1300: {
              slidesPerView: 4,
            },
            1100: {
              slidesPerView: 3,
            },
            // 950: {
            //   slidesPerView: 2,
            // },
            450: {
              slidesPerView: 2,
            },
            240: {
              slidesPerView: 1,
            },
          }}>
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </StyledContainer>
    </CenterWrapper>
  );
}
