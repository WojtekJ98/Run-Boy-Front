"use client";
import { SessionProvider } from "next-auth/react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { createGlobalStyle } from "styled-components";
import { CartStateProvider } from "./lib/stateCart";
import CartWrapper from "@/components/CartWrapper";
import { FavoriteProvider } from "./lib/favoriteItemContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  background-color: #f5f5f5;
  box-sizing: border-box;
}
button {
  border: none;
  background: none;  font-family: "Poppins", sans-serif;
  cursor: pointer;

  
}
a {
  text-decoration: none;
} /* styles/globals.css */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <HelmetProvider>
        <html lang="en">
          <Helmet>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Oswald&family=Poppins&display=swap"></link>
          </Helmet>
          <GlobalStyles />
          <body>
            <CartStateProvider>
              <FavoriteProvider>{children}</FavoriteProvider>
              <CartWrapper />
              <ToastContainer />
            </CartStateProvider>
          </body>
        </html>
      </HelmetProvider>
    </SessionProvider>
  );
}
