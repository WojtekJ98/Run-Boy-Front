"use client";
import CenterWrapper from "@/components/CenterWrapper";
import Layout from "@/components/Layout";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import styled from "styled-components";

const GridStyles = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  gap: 3rem;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export default function SingInPage() {
  return (
    <Layout>
      <CenterWrapper>
        <GridStyles>
          <SignIn />
          <SignUp />
        </GridStyles>
      </CenterWrapper>
    </Layout>
  );
}
