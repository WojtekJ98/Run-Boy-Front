"use client";
import styled, { css } from "styled-components";
import SeeMoreBtn from "./StyledButtonSeeMore";
import CenterWrapper from "./CenterWrapper";
import { useRouter } from "next/navigation";

const Center = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 60px 0;
  @media (max-width: 1100px) {
    justify-content: space-between;
  }
`;
const ShoeContainer = styled.div`
  height: 280px;
  width: 450px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.4);
  ${({ $image }) =>
    css`
      background-image: url(${$image});
    `}
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  opacity: 0.8;
  @media (max-width: 1100px) {
    /* height: 280px;
    width: 450px; */
  }
  &:hover {
    opacity: 1;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease;
    z-index: 1;
  }
  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3);
  }
  &:hover button {
    opacity: 1;
    transform: translateY(0);
  }
`;
const StyledTittleH2 = styled.h2`
  text-align: center;
  font-size: 28px;
  z-index: 10;
  transform: translateY(10px);
  transition: ease-in-out 300ms all;
  ${ShoeContainer}:hover & {
    transform: translateY(-10px);
  }
`;

export default function CategoryShoe() {
  const router = useRouter();
  return (
    <CenterWrapper>
      <Center>
        <ShoeContainer $image="/img/men_category.webp">
          <StyledTittleH2>Men&apos;s Shoes</StyledTittleH2>
          <SeeMoreBtn text="See more →" link="/products?category=Men" />
        </ShoeContainer>
        <ShoeContainer $image="/img/women_category.webp">
          <StyledTittleH2>Women&apos;s Shoes</StyledTittleH2>
          <SeeMoreBtn text="See more →" link="/products?category=Women" />
        </ShoeContainer>
      </Center>
    </CenterWrapper>
  );
}
