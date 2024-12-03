"use client";
import { useCart } from "@/app/lib/stateCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Wrapper = styled.div`
  flex: 1;
`;
const AddToCartbtn = styled.button`
  width: 80%;
  border: 2px solid #ff5a00;
  border-radius: 25px;
  padding: 10px 12px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #ff5a00;
  color: white;
  transition: ease-in-out 0.3s all;
  &:hover {
    border: ${(props) => (props.disabled ? "none" : "2px solid #ff5a00")};
    background-color: ${(props) => (props.disabled ? "#555" : "white")};
    color: ${(props) => (props.disabled ? "#white" : "black")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

const WrapperModal = styled.div`
  position: fixed;
  z-index: 100;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 1px solid black;
  background-color: white;
  padding: 2rem;
`;
const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  button {
    border: 1px solid black;
    padding: 4px 12px;
    border-radius: 15px;
    font-weight: bold;
  }
`;
const BtnSignIn = styled.button`
  background-color: green;
  transition: ease-in-out 0.2s all;
  &:hover {
    color: white;
    transform: scale(1.1);
  }
`;
const BtnClose = styled.button`
  background-color: #ff5a00;
  transition: ease-in-out 0.2s all;
  &:hover {
    color: white;
    transform: scale(1.1);
  }
`;

export default function AddtoCartBtn({ selectSize, product }) {
  const { refreshCart } = useCart();
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  async function addToCart(e) {
    if (!session) {
      setShowModal(true);
      return;
    }

    e.preventDefault();
    try {
      const response = await fetch("/api/cartitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.id || session.user._id,
          product: product._id || product,
          size: selectSize.value,
          quantity: 1,
        }),
      });
      if (response.ok) {
        toast.success("Product added to cart!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        refreshCart();
      } else {
        toast.error("Error adding product!", {
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
      console.error("Error", error);
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
      <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <AddToCartbtn disabled={!selectSize} onClick={addToCart}>
          {isHover && !selectSize ? "Please select a size" : "Add to Cart"}
        </AddToCartbtn>
      </Wrapper>
      {showModal && (
        <WrapperModal>
          <StyledFlex>
            <h2>Please Sign In</h2>
            <p>You need to be signed in to add items to your cart.</p>
            <BtnWrapper>
              <BtnSignIn onClick={() => router.push("/signin")}>
                Sign In
              </BtnSignIn>
              <BtnClose onClick={() => setShowModal(false)}>Close</BtnClose>
            </BtnWrapper>
          </StyledFlex>
        </WrapperModal>
      )}
    </>
  );
}
