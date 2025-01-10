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
const PasswordWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-items: center;
  flex-direction: column;
  padding: 1rem;
  max-width: 250px;
  border: 2px solid green;
  border-radius: 25px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);

  p:nth-child(1) {
    flex: 0;
    font-weight: 600;
    margin-bottom: 12px;
    border-bottom: 2px solid green;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function SingInPage() {
  return (
    <Layout>
      <CenterWrapper>
        <Wrapper>
          <PasswordWrapper>
            <p>If you want to use this app: </p>
            <div>
              <span>Email: skip234@wp.pl</span>
              <span>Password: runboy2024</span>
            </div>
            <p>Or create account. </p>
          </PasswordWrapper>
        </Wrapper>
        <GridStyles>
          <SignIn />
          <SignUp />
        </GridStyles>
      </CenterWrapper>
    </Layout>
  );
}
