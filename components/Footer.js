"use client";
import Image from "next/image";
import styled from "styled-components";
import LogoImg from "../public/img/Logo1.svg";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/app/lib/stateCart";
import Cart from "../assets/icons/cart.svg";
import Heart1 from "../assets/icons/heart1.svg";
import { useFavorite } from "@/app/lib/favoriteItemContext";

const StyledFooter = styled.footer`
  height: 100%;
  background-color: #dadada;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4px 3rem;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

const LogoWrapper = styled.div`
  min-width: 250px;
  max-width: 350px;
  min-height: 150px;
`;
const Logo = styled(Link)`
  max-width: 250px;
  max-height: 150px;
  color: #14532d;
  text-decoration: none;
  font-size: 3rem;
`;
const StyledImg = styled(Image)`
  width: 100%;
  height: 100%;
`;
const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 16px;
  @media (max-width: 860px) {
    gap: 4px;
  }
  @media (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  gap: 0.5rem;
  @media (max-width: 450px) {
    justify-content: center;
    align-items: center;
  }
`;
const StyledLinkContainer = styled.div`
  padding: 8px;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  width: 32px;
  height: 32px;
`;
const StyledItemsCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: solid 1px #ff5a00;
  color: white;
  font-weight: bold;
  background-color: #ff5a00;
  font-size: 14px;
  text-align: center;
`;
const NavButton = styled.button`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  @media (max-width: 450px) {
    justify-content: center;
    align-items: center;
  }
`;
export default function Footer() {
  const { data: session, status } = useSession();
  const { openCart, cartOpen, cartItems } = useCart();
  const { favoriteItems } = useFavorite();

  const quantityInCart = cartItems
    .filter((item) => item.user === session?.user?.id)
    .map((items) => items.quantity);
  const sumInCart = quantityInCart.reduce((a, b) => a + b, 0);

  const userFavoriteItems = favoriteItems.filter(
    (item) => item.user === session?.user?.id
  );

  return (
    <StyledFooter>
      <LogoWrapper>
        <Logo href={"/"}>
          <StyledImg
            src={LogoImg}
            alt="Logo Run Boy"
            width={250}
            height={150}
          />
        </Logo>
      </LogoWrapper>
      <StyledNav>
        <StyledLinkContainer>
          <StyledTitle>RunBoy</StyledTitle>
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/blog"}>Blog</NavLink>
        </StyledLinkContainer>
        <StyledLinkContainer>
          <StyledTitle>Products</StyledTitle>
          <NavLink href={"/products"}>Our Products </NavLink>
        </StyledLinkContainer>
        {session ? (
          <>
            <StyledLinkContainer>
              <StyledTitle>Account Details</StyledTitle>

              <NavLink href={"/account"}>
                Account
                <StyledWrapper>
                  <Image src={Heart1} alt="Favorite Items" />
                  {userFavoriteItems.length > 0 && (
                    <StyledItemsCount>
                      {userFavoriteItems.length}
                    </StyledItemsCount>
                  )}
                </StyledWrapper>
              </NavLink>
              <NavButton
                type="button"
                onClick={() => {
                  openCart();
                }}>
                Cart
                <StyledWrapper>
                  <Image src={Cart} alt="Cart icon" />
                  <StyledItemsCount>{sumInCart}</StyledItemsCount>
                </StyledWrapper>
              </NavButton>
              <NavButton onClick={() => signOut()}>Sign Out</NavButton>
            </StyledLinkContainer>
          </>
        ) : (
          <StyledLinkContainer>
            <StyledTitle>Create Account </StyledTitle>
            <NavLink href={"/signin"}>Sign In</NavLink>
          </StyledLinkContainer>
        )}
        <StyledLinkContainer>
          <StyledTitle>Write to us</StyledTitle>
          <NavLink href={"/contact"}>Contact</NavLink>{" "}
        </StyledLinkContainer>
      </StyledNav>
    </StyledFooter>
  );
}
