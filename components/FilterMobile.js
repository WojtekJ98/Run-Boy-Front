import { useState } from "react";
import styled from "styled-components";
import SelectProperties from "./SelectProperties";
const StyledFilterBtn = styled.button`
  margin-left: 5px;
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
  @media (min-width: 850px) {
    display: none;
  }
`;

const StyledFilterContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 8px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  transform: ${({ isVisible }) =>
    isVisible ? "translateX(0)" : "translateX(-100%)"};
  overflow-y: auto;
`;

const StyledFilterWrapper = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 2px solid #333;
  h3 {
    margin: 5px;
  }
`;
const StyledButtonWrappr = styled.div`
  margin-top: 2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledCloseBtn = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  z-index: 25;
`;

const StyledBtnClear = styled.button`
  border-radius: 15px;
  background-color: red;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  padding: 8px 12px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
    color: white;
    font-weight: bold;
  }
`;
const StyledBtnFilter = styled.button`
  background-color: green;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  padding: 8px 12px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
    color: white;
    font-weight: bold;
  }
`;
const StyledTitle = styled.h1`
  margin: 5px;
`;
export default function FilterMobile({
  filters,
  categories,
  availbleSizes,
  onSizeChange,
  onSurfaceChange,
  onDestinyChange,
  onBrandChange,
  onColorChange,
  onCategoryChange,
  quantityFiltredItems,
}) {
  const [isSortOptionsVisible, setIsSortOptionsVisible] = useState(false);
  const toggleBtnOption = () => {
    setIsSortOptionsVisible((prev) => !prev);
  };
  const menCategory = categories?.find((category) => category.name === "Men");
  const categoriesAll = ["All", "Men", "Women"];
  const surface = ["Asphalt", "Trail"];
  const destiny = ["Training", "Competition"];
  const colors =
    menCategory?.properties?.find((property) => property.name === "color")
      .values || [];
  const brands =
    menCategory?.properties?.find((property) => property.name === "brand")
      .values || [];

  const handleClearFilters = () => {
    onSizeChange("");
    onSurfaceChange("");
    onDestinyChange("");
    onBrandChange([]);
    onColorChange([]);
    onCategoryChange("All");
  };

  return (
    <div>
      <StyledFilterBtn onClick={toggleBtnOption}>Filter</StyledFilterBtn>
      <StyledFilterContainer isVisible={isSortOptionsVisible}>
        <StyledCloseBtn onClick={toggleBtnOption}>&times;</StyledCloseBtn>
        <StyledTitle>Filters</StyledTitle>
        <SelectProperties />
        <StyledFilterWrapper>
          <h3>Category</h3>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              style={{
                fontWeight:
                  filters.category === category.name ? "bold" : "normal",
              }}>
              {category.name}
            </button>
          ))}
        </StyledFilterWrapper>
        <StyledFilterWrapper>
          <h3>Brands</h3>
          {brands?.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onBrandChange(brand)}
              style={{
                fontWeight: filters.brand === brand ? "bold" : "normal",
              }}>
              {brand}
            </button>
          ))}
        </StyledFilterWrapper>
        <StyledFilterWrapper>
          <h3>Size</h3>
          {availbleSizes?.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              style={{
                fontWeight: filters.size === size ? "bold" : "normal",
              }}>
              {size}
            </button>
          ))}
        </StyledFilterWrapper>
        <StyledFilterWrapper>
          <h3>Surface</h3>
          {surface?.map((item) => (
            <button
              key={item}
              onClick={() => onSurfaceChange(item)}
              style={{
                fontWeight: filters.item === item ? "bold" : "normal",
              }}>
              {item}
            </button>
          ))}
        </StyledFilterWrapper>
        <StyledFilterWrapper>
          <h3>Destiny</h3>
          {destiny?.map((item) => (
            <button
              key={item}
              onClick={() => onDestinyChange(item)}
              style={{
                fontWeight: filters.item === item ? "bold" : "normal",
              }}>
              {item}
            </button>
          ))}
        </StyledFilterWrapper>
        <StyledFilterWrapper>
          <h3>Color</h3>
          {colors?.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              style={{
                fontWeight: filters.color === color ? "bold" : "normal",
              }}>
              {color}
            </button>
          ))}
        </StyledFilterWrapper>
        <StyledButtonWrappr>
          <StyledBtnClear onClick={handleClearFilters}>
            Clean all filters
          </StyledBtnClear>
          <StyledBtnFilter onClick={toggleBtnOption}>
            Show filtred products ({quantityFiltredItems})
          </StyledBtnFilter>
        </StyledButtonWrappr>
      </StyledFilterContainer>
    </div>
  );
}
