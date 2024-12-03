import styled from "styled-components";
import formatMoney from "@/app/lib/formatMoney";

export const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  transition: ease-in-out 0.3s all;
  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;
const ProductName = styled.h4`
  margin: 8px 0 4px 0;
  font-weight: normal;
`;
const ProductPrice = styled.span`
  font-weight: bold;
`;

export default function ProductInfo({ name, price }) {
  return (
    <StyledProductInfo>
      <ProductName>{name}</ProductName>
      <ProductPrice>{formatMoney(price)}</ProductPrice>
    </StyledProductInfo>
  );
}
