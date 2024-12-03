import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  background-color: #14532d;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #196f3b;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #0f3e21;
    transform: translateY(0);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledPrimaryBtn = styled.button`
  ${ButtonStyle}
`;

export default function PrimaryBtn({ text }) {
  return <StyledPrimaryBtn>{text}</StyledPrimaryBtn>;
}
