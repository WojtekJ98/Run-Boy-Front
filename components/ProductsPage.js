"use client";
import Layout from "@/components/Layout";
import CenterWrapper from "@/components/CenterWrapper";
import styled from "styled-components";
import ProductCardAllProducts from "./ProductCardAlProducts";
import SelectProperties from "./SelectProperties";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SortComponent from "./SortComponent";
import ProductPageSlider from "./ProductPageSlider";
import FilterMobile from "./FilterMobile";
import LoadingSpiner from "./LoadingSpiner";
const WrapperGrid = styled.div`
  width: 100%;
  display: grid;
  padding: 5px;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 1640px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
`;

const StyledContainer = styled.div`
  justify-content: center;
  display: flex;
  gap: 20px;
`;
const StyledSort = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default function ProductsPage({ products, categories }) {
  const router = useRouter();
  const searchParms = useSearchParams();
  const pathname = usePathname();
  const [lengthItems, setLengthItems] = useState([]);
  const [loading, setLoading] = useState();
  const [filterdProducts, setFilterProducts] = useState(products);
  const [selectedSize, setSelectedSize] = useState(
    searchParms.get("size") || ""
  );
  const [selectedSurface, setSelectedSurface] = useState(
    searchParms.get("surface") || ""
  );
  const [selectedDestiny, setSelectedDestiny] = useState(
    searchParms.get("destiny") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParms.get("") ? searchParms.get("brand").split(",") : []
  );
  const [selectedBrandMob, setSelectedBrandMob] = useState(
    searchParms.get("brand") || ""
  );
  const [selectedColorMob, setSelectedColorMob] = useState(
    searchParms.get("color") || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    searchParms.get("color") ? searchParms.get("color").split(",") : []
  );
  // sorting by price
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortAlphabetically, setSortAlphabetically] = useState(
    searchParms.get("sortAZ") === "true"
  );
  // set category
  const [category, setCategory] = useState(searchParms.get("category") || "");

  const updateUrl = useCallback(
    (filters) => {
      const params = new URLSearchParams(searchParms);
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params.set(key, filters[key]);
        } else {
          params.delete(key);
        }
      });
      router.push(
        `${pathname}?${params.toString()}`,
        { scroll: false },
        {
          shallow: true,
        }
      );
    },
    [searchParms, pathname, router]
  );

  useEffect(() => {
    let filtered = products;
    setLoading(true);

    if (category && category !== "All") {
      const categoryObj = categories.find((cat) => cat.name === category);
      if (categoryObj) {
        filtered = filtered.filter(
          (product) => product.category === categoryObj._id
        );
      }
    }
    if (selectedSize) {
      filtered = filtered.filter((product) =>
        product.properties.size.includes(selectedSize)
      );
    }
    if (selectedSurface) {
      filtered = filtered.filter((product) =>
        product?.properties?.surface?.includes(selectedSurface)
      );
    }
    if (selectedDestiny) {
      filtered = filtered.filter((product) =>
        product?.properties?.purpose?.includes(selectedDestiny)
      );
    }
    if (selectedBrandMob) {
      filtered = filtered.filter((product) =>
        product?.properties?.brand?.includes(selectedBrandMob)
      );
    }
    if (selectedColorMob) {
      filtered = filtered.filter((product) =>
        product?.properties?.color?.includes(selectedColorMob)
      );
    }
    if (selectedBrand.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrand.some((brand) =>
          product?.properties?.brand.includes(brand)
        )
      );
    }

    if (selectedColor.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColor.some((color) =>
          product?.properties?.color?.includes(color)
        )
      );
    }
    if (sortByPrice === "min") {
      filtered = filtered.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (sortByPrice === "max") {
      filtered = filtered.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    if (sortAlphabetically) {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    setLengthItems(filtered.length);
    setFilterProducts(filtered);
    setLoading(false);
    updateUrl({
      category: category || null,
      size: selectedSize || null,
      surface: selectedSurface || null,
      destiny: selectedDestiny || null,
      brand: selectedBrandMob || null,
      color: selectedColorMob || null,
      brand: selectedBrand.length > 0 ? selectedBrand.join(",") : null,
      color: selectedColor.length > 0 ? selectedColor.join(",") : null,
      sortAZ: sortAlphabetically ? "true" : null,
      sortPrice: sortByPrice || null,
    });
  }, [
    categories,
    category,
    sortByPrice,
    sortAlphabetically,
    selectedSize,
    selectedSurface,
    selectedDestiny,
    selectedBrand,
    selectedColor,
    selectedBrandMob,
    selectedColorMob,
    products,
    updateUrl,
  ]);

  const filters = {
    category,
    size: selectedSize,
    surface: selectedSurface,
    destiny: selectedDestiny,
    brand: selectedBrandMob,
    color: selectedColorMob,
  };

  const handleCategoryFilterChange = (category, e) => {
    if (e) e.preventDefult();
    setCategory(category);
  };
  const handleSizeFilterChange = (size) => {
    setSelectedSize(size);
  };
  const handleSurfaceFilterChange = (surface) => {
    setSelectedSurface(surface);
  };
  const handleDestinyFilterChange = (destiny) => {
    setSelectedDestiny(destiny);
  };
  const handleBrandFilterChange = (brand) => {
    setSelectedBrand(brand);
  };
  const handleBrandFilterChangeMob = (brand) => {
    setSelectedBrandMob(brand);
  };
  const handleColorFilterChangeMob = (color) => {
    setSelectedColorMob(color);
  };
  const handleColorFilterChange = (color) => {
    setSelectedColor(color);
  };
  const handleMinPriceSort = (item) => {
    setSortByPrice("min");
    setSortAlphabetically(false);
  };
  const handleMaxPriceSort = (item) => {
    setSortByPrice("max");
    setSortAlphabetically(false);
  };
  const handleAlphabeticallySort = (item) => {
    setSortAlphabetically((prev) => !prev);
    setSortByPrice("");
  };
  console.log(lengthItems);

  return (
    <>
      <Layout>
        <CenterWrapper>
          <ProductPageSlider />
          <div>
            <StyledContainer>
              <SelectProperties
                categories={categories}
                products={products}
                availbleSizes={[
                  "34",
                  "35",
                  "36",
                  "37",
                  "38",
                  "39",
                  "40",
                  "41",
                  "42",
                  "43",
                  "44",
                  "45",
                  "46",
                  "47",
                  "48",
                ]}
                selectedSize={selectedSize}
                onSizeChange={handleSizeFilterChange}
                selectedSurface={selectedSurface}
                onSurfaceChange={handleSurfaceFilterChange}
                selectedDestiny={selectedDestiny}
                onDestinyChange={handleDestinyFilterChange}
                selectedBrand={selectedBrand}
                onBrandChange={handleBrandFilterChange}
                selectedColor={selectedColor}
                onColorChange={handleColorFilterChange}
                selectedCategory={category}
                onCategoryChange={handleCategoryFilterChange}
              />
              <div>
                <StyledSort>
                  <FilterMobile
                    filters={filters}
                    categories={categories}
                    availbleSizes={[
                      "34",
                      "35",
                      "36",
                      "37",
                      "38",
                      "39",
                      "40",
                      "41",
                      "42",
                      "43",
                      "44",
                      "45",
                      "46",
                      "47",
                      "48",
                    ]}
                    onSizeChange={handleSizeFilterChange}
                    onSurfaceChange={handleSurfaceFilterChange}
                    onDestinyChange={handleDestinyFilterChange}
                    onBrandChange={handleBrandFilterChangeMob}
                    onColorChange={handleColorFilterChangeMob}
                    onCategoryChange={handleCategoryFilterChange}
                    quantityFiltredItems={lengthItems}
                  />
                  <SortComponent
                    products={products}
                    sortMin={handleMinPriceSort}
                    sortMax={handleMaxPriceSort}
                    sortAZ={handleAlphabeticallySort}
                  />
                </StyledSort>
                <WrapperGrid>
                  {loading ? (
                    <div>
                      <LoadingSpiner />
                    </div>
                  ) : (
                    filterdProducts.map((product, index) => (
                      <ProductCardAllProducts product={product} key={index} />
                    ))
                  )}
                  {!loading && filterdProducts.length === 0 && (
                    <p>No products available for the selected size.</p>
                  )}
                </WrapperGrid>
              </div>
            </StyledContainer>
          </div>
        </CenterWrapper>
      </Layout>
    </>
  );
}
