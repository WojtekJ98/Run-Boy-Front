import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaXmark } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";

const StyledSelectFilter = styled.aside`
  max-width: 250px;
  min-height: 100vh;
  @media (max-width: 850px) {
    display: none;
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledContainerTitle = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
`;
const StyledTitle = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  padding-bottom: 3px;
`;
const StyledWrapperSize = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const StyledWrapperCategory = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;

const StyledButton = styled.button`
  padding: 4px;
  border: solid 1px black;
  border-radius: 4px;
  transition: ease-in-out 0.2s all;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "#96f97b" : "#f5f5f5")};
  color: ${({ isSelected }) => (isSelected ? "#14532d" : "#000")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  border-color: ${({ isSelected }) => (isSelected ? "#14532d" : "#000")};
  border-width: ${({ isSelected }) => (isSelected ? "2px" : "1px")};
  &:hover {
    background-color: white;
    font-weight: bold;
  }
`;
const StyledButtonText = styled.button`
  margin: 5px;
  padding: 6px 10px;
  border: solid 1px black;
  border-radius: 4px;
  transition: ease-in-out 0.2s all;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "#96f97b" : "#f5f5f5")};
  color: ${({ isSelected }) => (isSelected ? "#14532d" : "#000")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  border-color: ${({ isSelected }) => (isSelected ? "#14532d" : "#000")};
  border-width: ${({ isSelected }) => (isSelected ? "2px" : "1px")};
  &:hover {
    transform: scale(1.1);
  }
`;
const StyledBox = styled.div`
  padding: 10px 0;
`;
const StyledFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  align-items: center;
  input[type="checkbox"] {
    width: 1em;
    height: 1rem;
    accent-color: green;
  }
`;
const StyledBoxDeleteBtn = styled.div`
  display: flex;
  gap: 7px;
  padding: 5px 0 0 0;
`;
const StyledDeleteBtn = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default function SelectProperties({
  selectedCategory,
  categories,
  products,
  availbleSizes,
  selectedSize,
  onSizeChange,
  selectedSurface,
  onSurfaceChange,
  selectedDestiny,
  onDestinyChange,
  selectedBrand,
  onBrandChange,
  selectedColor,
  onColorChange,
  onCategoryChange,
}) {
  const searchParams = useSearchParams();
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState(
    searchParams.get("category") || null
  );
  const [currentSizeFilter, setCurrentSizeFilter] = useState(
    searchParams.get("size") || null
  );
  const [currentSurfaceFilter, setCurrentSurfaceFilter] = useState(
    searchParams.get("surface") || null
  );
  const [currentDestinyFilter, setCurrentDestinyFilter] = useState(
    searchParams.get("destiny") || null
  );
  const [currentBrandFilter, setCurrentBrandFilter] = useState(
    searchParams.get("brand") ? searchParams.get("brand").split(",") : []
  );
  const [currentColorFilter, setCurrentColorFilter] = useState(
    searchParams.get("color") ? searchParams.get("color").split(",") : []
  );
  const menCategory = categories?.find((category) => category.name === "Men");
  const categoriesAll = ["All", "Men", "Women"];
  const surface = ["asphalt", "trail"];
  const destiny = ["training", "competition"];
  const colors =
    menCategory?.properties?.find((property) => property.name === "color")
      .values || [];
  const brands =
    menCategory?.properties?.find((property) => property.name === "brand")
      .values || [];

  useEffect(() => {
    setCurrentCategoryFilter(searchParams.get("category") || "");
    setCurrentSizeFilter(searchParams.get("size") || "");
    setCurrentSurfaceFilter(searchParams.get("surface") || "");
    setCurrentDestinyFilter(searchParams.get("destiny") || "");
    setCurrentBrandFilter(
      searchParams.get("brand") ? searchParams.get("brand").split(",") : []
    );
    setCurrentColorFilter(
      searchParams.get("color") ? searchParams.get("color").split(",") : []
    );
  }, [searchParams]);

  function selectCategory(category, e) {
    if (e) e.preventDefault();
    onCategoryChange(category);
    setCurrentCategoryFilter(category);
  }
  function selectSize(size) {
    onSizeChange(size);
    setCurrentSizeFilter(size);
  }
  function selectSurface(item) {
    onSurfaceChange(item);
    setCurrentSurfaceFilter(item);
  }
  function selectDestiny(item) {
    onDestinyChange(item);
    setCurrentDestinyFilter(item);
  }
  function selectBrand(item) {
    let updatedBrands;

    if (currentBrandFilter.includes(item)) {
      updatedBrands = currentBrandFilter.filter((brand) => brand !== item);
    } else {
      updatedBrands = [...currentBrandFilter, item];
    }
    onBrandChange(updatedBrands);
    setCurrentBrandFilter(updatedBrands);
  }

  function selectColor(item) {
    let updatedColor;
    if (currentColorFilter.includes(item)) {
      updatedColor = currentColorFilter.filter((color) => color !== item);
    } else {
      updatedColor = [...currentColorFilter, item];
    }
    onColorChange(updatedColor);
    setCurrentColorFilter(updatedColor);
  }

  function handleDeleteFilter(type) {
    const filterMapping = {
      category: {
        setter: setCurrentCategoryFilter,
        callback: onCategoryChange,
        defaultValue: "",
      },
      size: {
        setter: setCurrentSizeFilter,
        callback: onSizeChange,
        defaultValue: "",
      },
      surface: {
        setter: setCurrentSurfaceFilter,
        callback: onSurfaceChange,
        defaultValue: "",
      },
      destiny: {
        setter: setCurrentDestinyFilter,
        callback: onDestinyChange,
        defaultValue: "",
      },
      brand: {
        setter: setCurrentBrandFilter,
        callback: onBrandChange,
        defaultValue: [],
      },
      color: {
        setter: setCurrentColorFilter,
        callback: onColorChange,
        defaultValue: [],
      },
    };

    const { setter, callback, defaultValue } = filterMapping[type];
    setter(defaultValue);
    callback(defaultValue);
  }
  return (
    <StyledSelectFilter>
      <StyledWrapper>
        <div>
          <StyledContainerTitle>
            <StyledTitle>Selected filters</StyledTitle>
          </StyledContainerTitle>
          {[
            { type: "size", value: currentSizeFilter },
            { type: "surface", value: currentSurfaceFilter },
            {
              type: "brand",
              value: currentBrandFilter,
              display: currentBrandFilter.join(","),
            },
            { type: "destiny", value: currentDestinyFilter },
            {
              type: "color",
              value: currentColorFilter,
              display: currentColorFilter.join(","),
            },
            {
              type: "category",
              value: currentCategoryFilter,
            },
          ].map((filter) => {
            if (
              (Array.isArray(filter.value) && filter.value.length === 0) ||
              filter.value === "" ||
              (filter.display && filter.display.trim() === "")
            ) {
              return null;
            }
            return (
              <StyledBoxDeleteBtn key={filter.type}>
                <StyledDeleteBtn
                  onClick={() => handleDeleteFilter(filter.type)}>
                  <FaXmark fontSize={16} />
                </StyledDeleteBtn>
                <span>{filter.display || filter.value}</span>
              </StyledBoxDeleteBtn>
            );
          })}
          <div>
            <StyledContainerTitle>
              <StyledTitle>Category</StyledTitle>
            </StyledContainerTitle>
            <StyledWrapperCategory>
              {categoriesAll.map((category, index) => (
                <StyledButtonText
                  key={index}
                  onClick={(e) => selectCategory(category, e)}
                  isSelected={selectedCategory === category}>
                  {category}
                </StyledButtonText>
              ))}
            </StyledWrapperCategory>
          </div>
          <StyledContainerTitle>
            <StyledTitle>Brand</StyledTitle>
          </StyledContainerTitle>
          <StyledBox>
            {brands.map((brand, index) => (
              <StyledFilterContainer key={index}>
                <input
                  type="checkbox"
                  checked={currentBrandFilter.includes(brand)}
                  onClick={() => selectBrand(brand)}
                  isSelected={selectedBrand === brand}
                />
                <span>{brand}</span>
              </StyledFilterContainer>
            ))}
          </StyledBox>
        </div>
        <div>
          <StyledContainerTitle>
            <StyledTitle>Size</StyledTitle>
          </StyledContainerTitle>
          <StyledWrapperSize>
            {availbleSizes?.map((size, index) => (
              <StyledButton
                key={index}
                onClick={() => selectSize(size)}
                isSelected={selectedSize === size}>
                {size}
              </StyledButton>
            ))}
          </StyledWrapperSize>
        </div>
        <div>
          <StyledContainerTitle>
            <StyledTitle>Surface</StyledTitle>
          </StyledContainerTitle>
          <StyledWrapperSize>
            {surface.map((item, index) => (
              <StyledButtonText
                key={index}
                onClick={() => selectSurface(item)}
                isSelected={selectedSurface === item}>
                {item[0].toUpperCase() + item.substring(1)}
              </StyledButtonText>
            ))}
          </StyledWrapperSize>
        </div>
        <div>
          <StyledContainerTitle>
            <StyledTitle>Destiny</StyledTitle>
          </StyledContainerTitle>
          <StyledWrapperSize>
            {destiny.map((item, index) => (
              <StyledButtonText
                key={index}
                onClick={() => selectDestiny(item)}
                isSelected={selectedDestiny === item}>
                {item[0].toUpperCase() + item.substring(1)}
              </StyledButtonText>
            ))}
          </StyledWrapperSize>
        </div>
        <div>
          <StyledContainerTitle>
            <StyledTitle>Color</StyledTitle>
          </StyledContainerTitle>
          <StyledBox>
            {colors.map((color, index) => (
              <StyledFilterContainer key={index}>
                <input
                  type="checkbox"
                  checked={currentColorFilter.includes(color)}
                  onClick={() => selectColor(color)}
                  isSelected={selectedColor === color}
                />
                <span>{color}</span>
              </StyledFilterContainer>
            ))}
          </StyledBox>
        </div>
      </StyledWrapper>
    </StyledSelectFilter>
  );
}
