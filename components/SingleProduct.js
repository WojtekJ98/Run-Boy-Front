"use client";
import styled from "styled-components";
import CenterWrapper from "./CenterWrapper";
import Layout from "./Layout";
import formatMoney from "@/app/lib/formatMoney";
import SindlePorductSlider from "./SingleProductSlider";
import BtnAddToFavorite from "./BtnAddToFavorite";
import Select from "react-select";
import { useState } from "react";
import { FaLessThanEqual } from "react-icons/fa";
import AddtoCartBtn from "./AddtoCartItem";
import Color from "../assets/icons/color.svg";
import Run from "../assets/icons/Run.svg";
import Road from "../assets/icons/Road.svg";
import Image from "next/image";

const StyledBg = styled.div`
  padding: 10px 0;
  width: 100%;
  background-color: white;
`;

const StyledGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 3fr 2fr;
  justify-content: center;
  align-items: start;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  @media (max-width: 730px) {
    display: block;
    text-align: center;
    padding-bottom: 40px;
  }
`;

const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h1 {
    margin-bottom: 0.5rem;
    @media (max-width: 1024px) {
      font-size: 1.5rem;
    }
  }
  h2 {
    font-size: 1.2rem;
    margin: 0;
    @media (max-width: 1024px) {
      font-size: 1rem;
    }
  }
`;
const StyledPrice = styled.span`
  font-size: 2rem;
  margin: 1rem 0;
  font-weight: bold;
`;
const WrapperBtn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  z-index: 50;
  @media (max-width: 730px) {
    justify-content: center;
    align-items: center;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  margin-right: 1rem;
`;

const CustomBtnAddToFavorite = styled.span`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 2px solid #ff5a00;
  background-color: white;
  transition: ease-in-out 0.2s all;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledContainerProductDetails = styled.div`
  max-width: 800px;
  padding: 2rem 1rem;
  margin: 0 auto;
`;
const BoxProductDetails = styled.div`
  padding: 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  background-color: white;
  grid-gap: 1rem;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(220px, 1fr)
  ); /* Enable wrapping */
  justify-content: center;
  align-items: center;
  div {
    margin: 15px;
    display: flex;
    gap: 1rem;
    align-items: center;

    span {
      font-weight: bold;
    }
  }
`;

export default function SingleProduct({ product, categories }) {
  const [selectSize, setSelectSize] = useState("");

  function selectCategory(product) {
    const matchingCategory = categories.find(
      (category) => category._id === product.category
    );
    return matchingCategory ? matchingCategory.name : "Unknow Category";
  }
  console.log(product);

  return (
    <Layout>
      <StyledBg>
        <CenterWrapper>
          <StyledGrid>
            <SindlePorductSlider product={product} />
            <StyledProductInfo>
              <div>
                <h1>{product.name}</h1>
                <h2>{selectCategory(product)}&apos;s Running Shoes</h2>
                <h3>Brand: {product.properties.brand}</h3>
              </div>
              <StyledPrice>{formatMoney(product.price)}</StyledPrice>

              <WrapperBtn>
                <Select
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: "200px",
                      borderColor: "#ccc",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#aaa",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#f0f0f0" : "white",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      width: "200px",
                      margin: "0 auto",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: "150px",
                      overflowY: "auto",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#999",
                    }),
                  }}
                  isMulti={false}
                  defaultOptions
                  name="size"
                  placeholder="Select.."
                  onChange={(selectedOption) => setSelectSize(selectedOption)}
                  options={product.properties.size.map((value) => ({
                    value,
                    label: value,
                  }))}
                />
              </WrapperBtn>
              <BtnWrapper>
                <AddtoCartBtn selectSize={selectSize} product={product._id} />
                <CustomBtnAddToFavorite>
                  <BtnAddToFavorite />
                </CustomBtnAddToFavorite>
              </BtnWrapper>
            </StyledProductInfo>
          </StyledGrid>
        </CenterWrapper>
      </StyledBg>
      <StyledContainerProductDetails>
        <div>
          <BoxProductDetails>
            <div>
              <Image src={Color} width={50} height={50} />
              <p>Color: </p>
              <span>{product.properties.color}</span>
            </div>
            <div>
              <Image src={Run} width={50} height={50} />
              <p>Purpose: </p>
              <span>{product.properties.purpose}</span>
            </div>
            <div>
              <Image src={Road} width={50} height={50} />
              <p>Surface:</p>
              <span> {product.properties.surface}</span>
            </div>
          </BoxProductDetails>
          <h4>About Product</h4>
          <p>{product.description}</p>
        </div>
      </StyledContainerProductDetails>
    </Layout>
  );
}
