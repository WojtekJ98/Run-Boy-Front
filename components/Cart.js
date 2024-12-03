"use client";
import styled from "styled-components";
import CartStyles from "./styles/CartStyles";
import formatMoney from "@/app/lib/formatMoney";
import { useCart } from "@/app/lib/stateCart";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Logo from "../public/img/Logo1.svg";
import Image from "next/image";
import totalCartPrice from "@/app/lib/totalCartPrice";
import axios from "axios";
import { CheckoutTest } from "./CheckoutTest";
import { toast } from "react-toastify";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;
const DeleteCartItemBtn = styled.button`
  font-size: 2rem;
  margin-right: 1rem;
  transition: ease-in-out 0.2s all;
  &:hover {
    color: red;
    transform: scale(1.1);
  }
`;
const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function CartItemMap({ cartItem }) {
  const { refreshCart } = useCart();

  async function handleDelete() {
    try {
      const response = await axios.delete(`/api/cartitem`, {
        data: { id: cartItem._id },
      });
      if (response.data.message === "Item deleted successfully") {
        toast.success("Item deleted successfully", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        refreshCart();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Something went wrong!", {
        position: "top-left",
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
    <CartItemStyles>
      <Image
        width={100}
        height={75}
        alt={`${cartItem.name} image`}
        src={cartItem.images[0]}
      />
      <div>
        <h3>{cartItem.name}</h3>
        <p>
          {formatMoney(cartItem.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.price)} each
          </em>
        </p>
        <p>Size: {cartItem.size}</p>
      </div>
      <DeleteCartItemBtn
        onClick={() => handleDelete(cartItem)}
        title="Remove This Item from Cart">
        &times;
      </DeleteCartItemBtn>
    </CartItemStyles>
  );
}

export default function Cart({ users, products }) {
  const { cartOpen, closeCart, cartItems, refreshCart, loading } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const userItemCart = cartItems
    .filter((item) => item.user === session?.user.id)
    .map((item) => {
      const product = products.find((product) => product._id === item.product);
      if (product) {
        return {
          ...product,
          quantity: item.quantity,
          size: item.size,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  if (loading) {
    return <CartStyles open={cartOpen}>Loading...</CartStyles>;
  }

  if (userItemCart.length === 0) {
    return (
      <CartStyles open={cartOpen}>
        <header>
          <span>Cart</span>
          <button onClick={closeCart}>close</button>
        </header>
        <ul>No items in the cart</ul>
      </CartStyles>
    );
  }
  return (
    <CartStyles open={cartOpen}>
      <header>
        <div>
          <Image src={Logo} alt="Logo of Run Boy" width={100} height={75} />
          <span>{session?.user.name}'s Cart</span>
        </div>
        <button onClick={closeCart}>close</button>
      </header>
      <ul>
        {userItemCart.map((userItemCart) => (
          <CartItemMap key={userItemCart._id} cartItem={userItemCart} />
        ))}
      </ul>
      <footer>
        <PriceWrapper>
          <p>Total: </p>
          <p>{formatMoney(totalCartPrice(userItemCart))}</p>
        </PriceWrapper>
        <CheckoutTest cartDetails={userItemCart} user={session.user} />
      </footer>
    </CartStyles>
  );
}
