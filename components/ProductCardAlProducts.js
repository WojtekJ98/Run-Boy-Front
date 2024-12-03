"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import BtnAddToFavorite from "./BtnAddToFavorite";
import ProductInfo, { StyledProductInfo } from "./ProductInfo";

const StyledPorductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 150px;
  height: auto;
  margin: auto;
  @media (min-width: 580px) {
    max-width: 250px;
  }
`;

const ProductImageWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 180px;
  position: relative;

  @media (max-width: 580px) {
    height: 120px;
  }
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: ease-in-out 0.3s all;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: 100%;
`;
const StyledSizeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  opacity: 0;
  transition: ease-in-out 0.3s all;

  span {
    color: black;
    padding: 2px;
    font-size: 10px;
  }
`;

const StyledSwiperSlide = styled.div`
  max-width: 300px;
  @media (max-width: 850px) {
    max-width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 580px) {
    max-height: 250px;
    max-width: 180px;
  }

  &:hover img {
    transform: scale(1.1);
  }
  &:hover ${StyledProductInfo} {
    transform: translateY(-10px);
  }
  &:hover ${StyledSizeWrapper} {
    opacity: 1;
    transform: translateY(-10px);
  }
`;
const CustomStyledBtnAddtoFavorite = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
`;

export default function ProductCard({ product }) {
  return (
    <StyledSwiperSlide>
      <StyledLink href={`/product/${product._id}`}>
        <StyledPorductContainer>
          <ProductImageWrapper>
            <CustomStyledBtnAddtoFavorite>
              <BtnAddToFavorite product={product} />
            </CustomStyledBtnAddtoFavorite>
            <ProductImage
              src={product.images[0]}
              alt={product.name}
              width={300}
              height={200}
            />
          </ProductImageWrapper>
          <ProductInfo name={product.name} price={product.price} />
          <StyledSizeWrapper>
            {product.properties.size.map((s, index) => (
              <span key={index}>{s}</span>
            ))}
          </StyledSizeWrapper>
        </StyledPorductContainer>
      </StyledLink>
    </StyledSwiperSlide>
  );
}
