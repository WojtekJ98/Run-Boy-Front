import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 0 auto;
  padding: 0 70px;
  @media (max-width: 1100px) {
    margin: 0 auto;
    padding: 0 20px;
  }
  @media (max-width: 768px) {
    margin: 0 auto;
    padding: 0 10px;
  }
`;
export default function CenterWrapper({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
