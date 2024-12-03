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
`;

const ProductImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  width: 300px;
  height: 220px;
  position: relative;
  @media (max-width: 650px) {
    width: 200px;
    height: 150px;
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
`;

const StyledSwiperSlide = styled.div`
  &:hover img {
    transform: scale(1.1);
  }
  &:hover ${StyledProductInfo} {
    transform: translateY(-10px);
  }
`;
const CusstomStyled = styled.span`
  position: absolute;
  right: 5px;
  z-index: 10;
`;

export default function ProductCard({ product }) {
  return (
    <StyledSwiperSlide>
      <StyledLink href={`/product/${product._id}`}>
        <StyledPorductContainer>
          <ProductImageWrapper>
            <CusstomStyled>
              <BtnAddToFavorite product={product} />
            </CusstomStyled>
            <ProductImage
              src={product.images[0]}
              alt={product.name}
              width={300}
              height={200}
            />
          </ProductImageWrapper>
          <ProductInfo name={product.name} price={product.price} />
        </StyledPorductContainer>
      </StyledLink>
    </StyledSwiperSlide>
  );
}
