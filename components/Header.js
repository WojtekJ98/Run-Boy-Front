"use client";
import Link from "next/link";
import styled from "styled-components";
import LogoImg from "../public/img/Logo1.svg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/app/lib/stateCart";
import Cart from "../assets/icons/cart.svg";
import Heart1 from "../assets/icons/heart1.svg";
import Menu from "../assets/icons/menu.svg";
import useFavoriteItemCount from "@/app/lib/countFavoriteItem";
import { useFavorite } from "@/app/lib/favoriteItemContext";
import { useState } from "react";

const StyledHeader = styled.header`
  background-color: #dadada;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4px 3rem;
  position: relative;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    padding: 4px 1rem;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div`
  width: 200px;
  height: 100px;
`;
const Logo = styled(Link)`
  max-width: 200px;
  max-height: 100px;
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
  align-items: center;
  gap: 16px;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const StyledNavMobile = styled.nav``;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  gap: 0.5rem;
`;
const NavButton = styled.button`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  width: 32px;
  height: 32px;
`;
const BtnMenu = styled.button`
  position: relative;
  @media (min-width: 1024px) {
    display: none;
  }
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
const StyledNavMobContainer = styled.div`
  padding: 20px;
  height: 100%;
  width: 40%;
  min-width: 200px;
  position: fixed;
  transform: translateX(100%);
  top: 0;
  right: 0;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  height: ${({ isVisible }) => (isVisible ? "auto" : "0")};
  transform: ${({ isVisible }) =>
    isVisible ? "translateX(0)" : "translateX(100%)"};
  z-index: 100;
  background-color: white;
  box-shadow: 2px 2px s4px 4px rgba(0, 0, 0, 0.2);
`;
const BtnClose = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: red;
    transform: scale(1.1);
  }
`;

export default function Header() {
  const { data: session, status } = useSession();
  const { openCart, cartOpen, cartItems } = useCart();
  const { favoriteItems } = useFavorite();
  const [openNavMob, setOpenNavMob] = useState(false);

  const quantityInCart = cartItems
    .filter((item) => item.user === session?.user?.id)
    .map((items) => items.quantity);
  const sumInCart = quantityInCart.reduce((a, b) => a + b, 0);

  const userFavoriteItems = favoriteItems.filter(
    (item) => item.user === session?.user?.id
  );

  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo href={"/"}>
          <StyledImg src={LogoImg} alt="Logo Run Boy" width={150} height={80} />
        </Logo>
      </LogoWrapper>

      <StyledNav>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/products"}>Products</NavLink>
        {/* <NavLink href={"/blog"}>Blog</NavLink> */}
        <NavLink href={"/contact"}>Contact</NavLink>
        {session ? (
          <>
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
          </>
        ) : (
          <NavLink href={"/signin"}>Sign In</NavLink>
        )}
      </StyledNav>
      <BtnMenu onClick={() => setOpenNavMob(!openNavMob)}>
        <Image src={Menu} alt="Menu button" />
      </BtnMenu>
      <StyledNavMobContainer isVisible={openNavMob}>
        <BtnClose onClick={() => setOpenNavMob(!openNavMob)}>&times;</BtnClose>
        <StyledNavMobile>
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/products"}>Products</NavLink>
          {/* <NavLink href={"/blog"}>Blog</NavLink> */}
          <NavLink href={"/contact"}>Contact</NavLink>
          {session ? (
            <>
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
            </>
          ) : (
            <NavLink href={"/signin"}>Sign In</NavLink>
          )}
        </StyledNavMobile>
      </StyledNavMobContainer>
    </StyledHeader>
  );
}
