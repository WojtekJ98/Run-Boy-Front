import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  padding-bottom: 12px;
  position: relative;
`;

const StyledSortBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  border: solid 1px #ddd;
  padding: 4px 14px;
  border-radius: 4px;
  gap: 16px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  transition: ease-in-out 0.2s all;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;

const StyledOptionContainer = styled.div`
  position: absolute;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  height: ${({ isVisible }) => (isVisible ? "auto" : "0")};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(-10%)" : "translateY(-50%)"};
  top: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
  background-color: white;
  border: 1px solid #ddd;
`;

const StyledOption = styled.button`
  width: 100%;
  display: flex;
  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? "#e0f7fa" : "white")};
  color: ${({ $isActive }) => ($isActive ? "green" : "black")};
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function SortComponent({ sortMin, sortMax, sortAZ }) {
  const [isSortOptionsVisible, setIsSortOptionsVisible] = useState(false);
  const [active, setActive] = useState("");

  const toggleBtnOption = () => {
    setIsSortOptionsVisible((prev) => !prev);
  };

  const handleSortMinPrice = (item) => {
    sortMin(item);
    setActive("MinMax");
    setIsSortOptionsVisible(false);
  };
  const handleSortMaxPrice = (item) => {
    sortMax(item);
    setActive("MaxMin");
    setIsSortOptionsVisible(false);
  };
  const handleSortAZ = (item) => {
    sortAZ(item);
    setActive("AZ");
    setIsSortOptionsVisible(false);
  };

  return (
    <StyledContainer>
      <StyledSortBtn onClick={toggleBtnOption}>
        Sort by
        <FaChevronDown color="green" />
      </StyledSortBtn>
      <StyledOptionContainer isVisible={isSortOptionsVisible}>
        <StyledOption
          $isActive={active === "AZ"}
          onClick={() => handleSortAZ("AZ")}>
          A-Z
        </StyledOption>
        <StyledOption
          $isActive={active === "MinMax"}
          onClick={() => handleSortMinPrice("MinMax")}>
          Price: Low to High
        </StyledOption>
        <StyledOption
          $isActive={active === "MaxMin"}
          onClick={() => handleSortMaxPrice("MaxMin")}>
          Price: High to Low
        </StyledOption>
      </StyledOptionContainer>
    </StyledContainer>
  );
}
