import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import styled from "styled-components";

const StyledSliderContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 1024px) {
    max-width: 450px;
  }
  .mySwiper2 {
    border-radius: 10px;
    overflow: hidden;
  }
`;
const StyledImageWrapper = styled.div`
  padding: 20px;
`;
const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-button-prev,
  .swiper-button-next {
    color: #555;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    color: black;
    transform: scale(1.1);
    transition: transform 0.3s;
  }
`;

const StyledSmallImg = styled(Image)`
  @media (max-width: 1024px) {
    width: 75px;
    height: 50px;
  }
`;

export default function SingleProductSlider({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <StyledSliderContainer>
      <StyledSwiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2">
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <StyledImageWrapper>
              <Image
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  height: "auto",
                }}
                alt={product.name}
                width={800}
                height={600}
                src={img}
              />
            </StyledImageWrapper>
          </SwiperSlide>
        ))}
      </StyledSwiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper">
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <StyledSmallImg
              alt={product.name}
              src={img}
              width={100}
              height={75}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSliderContainer>
  );
}
