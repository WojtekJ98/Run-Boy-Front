"use client";
import CenterWrapper from "@/components/CenterWrapper";
import FavoriteItemWrapper from "@/components/FavoriteItemWrapper";
import Layout from "@/components/Layout";
import UserOrders from "@/components/UserOrders";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  min-height: 100vh;
`;

const StyledSubTitle = styled.h2`
  padding: 2px;
  border-bottom: 3px solid green;
`;

const WrapperModal = styled.div`
  position: fixed;
  z-index: 100;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.2);
`;
const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin: 10px;
  }
  p {
    margin: 10px;
  }
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
    transition: ease-in-out 0.2s all;

    &:hover {
      background-color: green;
      color: white;
      transform: scale(1.1);s
    }
  }
`;

export default function AccountPage() {
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
      setShowModal(true);
      setSuccess(true);
    }

    if (query.get("canceled")) {
      setShowModal(true);
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  const { data: session } = useSession();

  return (
    <Layout>
      <CenterWrapper>
        <Wrapper>
          <h1>{session?.user.name}'s Account</h1>
          <div>
            <StyledSubTitle>Your Favorite Products</StyledSubTitle>
            <FavoriteItemWrapper />
          </div>
          <div>
            <StyledSubTitle>Your Orders</StyledSubTitle>
            {session?.user?.id ? (
              <UserOrders user={session.user.id} />
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
          {showModal && (
            <WrapperModal>
              <StyledFlex>
                <h2>
                  {success ? "Order accepted successfully!" : "Order canceled!"}
                </h2>
                <p>
                  {success
                    ? "You can now check your orders in your account."
                    : "Something go wrong, please try checkout again."}
                </p>
                <BtnWrapper>
                  <button onClick={() => setShowModal(false)}>Close</button>
                </BtnWrapper>
              </StyledFlex>
            </WrapperModal>
          )}
        </Wrapper>
      </CenterWrapper>
    </Layout>
  );
}
