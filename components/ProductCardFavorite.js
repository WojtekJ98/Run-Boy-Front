"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import ProductInfo, { StyledProductInfo } from "./ProductInfo";
import Trash from "../assets/icons/trash.svg";
import axios from "axios";
import { useFavorite } from "@/app/lib/favoriteItemContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledPorductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductImageWrapper = styled.div`
  overflow: hidden;
  max-height: 230px;
  /* width: 250px; */
  @media (max-width: 1300px) {
    /* width: 300px;
    height: 220px; */
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
const StyledSizeWrapper = styled.div`
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: ease-in-out 0.3s all;

  span {
    /* border: solid 1px black; */
    color: black;
    padding: 2px;
    font-size: 10px;
  }
`;

const StyledSwiperSlide = styled.div`
  width: 300px;
  position: relative;

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
const DeleteBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
`;

export default function ProductCardFavorite({ product, refresh }) {
  const { fetchFavorites } = useFavorite();

  async function handleDelete() {
    try {
      console.log(product);

      const response = await axios.delete("/api/favoriteitem", {
        data: { id: product._id },
      });
      if (response.data.message === "Item deleted successfully") {
        toast.success("Item deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchFavorites();
        refresh();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item:", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  if (!product) return <div>Product data not available</div>;

  return (
    <StyledSwiperSlide>
      <DeleteBtn
        title="Remove item from favorite"
        onClick={() => handleDelete(product)}>
        <Image src={Trash} alt="Remove item" />
      </DeleteBtn>
      <StyledLink href={`/product/${product?._id}`}>
        <StyledPorductContainer>
          <ProductImageWrapper>
            <ProductImage
              src={product?.images[0]}
              alt={product?.name}
              width={300}
              height={200}
            />
          </ProductImageWrapper>
          <ProductInfo name={product?.name} price={product?.price} />
          <StyledSizeWrapper>
            {product?.properties?.size?.map((s, index) => (
              <span key={index}>{s}</span>
            ))}
          </StyledSizeWrapper>
        </StyledPorductContainer>
      </StyledLink>
    </StyledSwiperSlide>
  );
}
