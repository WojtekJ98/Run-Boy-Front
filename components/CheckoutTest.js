"use client";
import { loadStripe } from "@stripe/stripe-js";

import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import useForm from "@/app/lib/useForm";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const Wrapper = styled.div`
  max-height: 200px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  border-radius: 5px;
  grid-gap: 5px;
  margin: 10px 0 15px;
  h2 {
    font-size: 14px;
    margin: 0;
  }
`;
const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #fff;
  grid-gap: 5px;
  border-radius: 10px;
`;
const CheckOutBtn = styled.button`
  margin: 0 auto;
  border-radius: 5px;
  width: 250px;
  padding: 6px 10px;
  border: 1px solid #333;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: ease-in-out 0.2s all;
  &:hover {
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

function CheckoutFormTest({ cartDetails, user }) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const { inputs, handleChange } = useForm({
    name: "",
    email: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: "",
  });
  useEffect(() => {
    const isValid =
      inputs.name &&
      inputs.email &&
      inputs.city &&
      inputs.postalCode &&
      inputs.streetAddress &&
      inputs.country;
    setFormValid(isValid);
  }, [inputs]);

  async function goToPayment() {
    if (!formValid) {
      toast.error("Please fill in all required fields before continuing.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/checkout_sessions", {
        inputs,
        user,
        cartDetails,
      });
      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (err) {
      console.error("Error during payment process:", err);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <h2>Order information</h2>
      <Box>
        <StyledInput
          type="text"
          placeholder="Name"
          value={inputs.name}
          name="name"
          onChange={handleChange}
          required
        />
        <StyledInput
          type="text"
          placeholder="Email"
          value={inputs.email}
          name="email"
          onChange={handleChange}
        />
        <CityHolder>
          <StyledInput
            type="text"
            placeholder="City"
            value={inputs.city}
            name="city"
            onChange={handleChange}
          />
          <StyledInput
            type="text"
            placeholder="Postal Code"
            value={inputs.postalCode}
            name="postalCode"
            onChange={handleChange}
          />
        </CityHolder>
        <StyledInput
          type="text"
          placeholder="Street Address"
          value={inputs.streetAddress}
          name="streetAddress"
          onChange={handleChange}
        />
        <StyledInput
          type="text"
          placeholder="Country"
          value={inputs.country}
          name="country"
          onChange={handleChange}
        />
      </Box>
      <CheckOutBtn onClick={goToPayment} disabled={isLoading}>
        {isLoading ? "Processing..." : "Continue to payment"}
      </CheckOutBtn>
    </Wrapper>
  );
}

function CheckoutTest({ cartDetails, user }) {
  return <CheckoutFormTest cartDetails={cartDetails} user={user} />;
}
export { CheckoutTest };
