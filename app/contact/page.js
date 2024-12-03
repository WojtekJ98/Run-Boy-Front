"use client";
import CenterWrapper from "@/components/CenterWrapper";
import Layout from "@/components/Layout";
import styled from "styled-components";
import useForm from "../lib/useForm";
import Image from "next/image";
import ContactImg from "../../public/img/contact_img.jpg";

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  padding: 1rem 0;
`;
const WrapperImg = styled.div`
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const StyledForm = styled.form`
  background-color: white;
  border-radius: 25px;
  border: none;
  padding: 1rem;
  line-height: 1.5;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-gap: 1rem;

  div {
    display: flex;
    justify-content: center;
    gap: 2rem;
    input {
      max-height: 40px;
      width: 100%;
    }
  }

  input,
  textarea,
  select {
    border-radius: 5px;
    max-width: 100%;
    padding: 5px 0.5rem;
    font-size: 1rem;
    border: solid 2px #888;
    &:focus {
      outline: 0;
      border-color: var(--red);
    }
  }
  button {
    border: 2px solid #ff5a00;
    padding: 5px 15px;
    background-color: #ff5a00;
    border-radius: 15px;
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    width: fit-content;
    justify-self: center;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    transition: 0.2s all;
    &:hover {
      background-color: white;
      color: #ff5a00;
      border: 2px solid #ff5a00;
    }
  }
`;

export default function ContactPage() {
  const { inputs, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    message: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      if (response.ok) {
        alert("Email send Succesfully!");
      } else {
        alert("Error sending emial");
      }
    } catch (error) {
      console.error("Error", error);
    }

    resetForm();
  }

  return (
    <Layout>
      <CenterWrapper>
        <StyledGridContainer>
          <WrapperImg>
            <Image
              src={ContactImg}
              alt="Runing people"
              width={640}
              height={360}
            />
          </WrapperImg>
          <div>
            <h1>Write to us if you have a question</h1>
            <StyledForm method="POST" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="First Name and Last Name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                type="text"
                name="message"
                placeholder="Message"
                value={inputs.message}
                onChange={handleChange}
                rows={4}
                required
              />
              <button type="submit">Send</button>
            </StyledForm>
          </div>
        </StyledGridContainer>
      </CenterWrapper>
    </Layout>
  );
}
