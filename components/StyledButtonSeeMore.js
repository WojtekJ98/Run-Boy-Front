import { useRouter } from "next/navigation";
import styled from "styled-components";

const StyledSeeMoreBtn = styled.button`
  z-index: 10;
  background-color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-40px);
  transition: ease-in-out 300ms all;
`;
export default function SeeMoreBtn({ text, link }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(link);
  };
  return <StyledSeeMoreBtn onClick={handleClick}>{text}</StyledSeeMoreBtn>;
}
