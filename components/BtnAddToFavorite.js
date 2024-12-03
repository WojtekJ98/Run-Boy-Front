"use client";
import styled from "styled-components";
import Heart from "../assets/icons/heart.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFavorite } from "@/app/lib/favoriteItemContext";

export const StyledBtnAddtoFavorite = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
`;

export default function BtnAddToFavorite({ product }) {
  const { data: session } = useSession();
  const { fetchFavorites } = useFavorite();
  async function handleAddToFavorite(e) {
    console.log("Add to favorite");
    if (!session) {
      alert("Please log in to add items to your favorites.");
      return;
    }
    e.preventDefault();

    try {
      const resposne = await fetch("/api/favoriteitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.id || session.user._id,
          product: product._id || product,
        }),
      });
      if (resposne.ok) {
        fetchFavorites();
        toast.success("Item added to favorites!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error adding item!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Something went wrong!", {
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
  return (
    <>
      <StyledBtnAddtoFavorite onClick={handleAddToFavorite}>
        <Image src={Heart} alt="Add to Favorite" />
      </StyledBtnAddtoFavorite>
    </>
  );
}
