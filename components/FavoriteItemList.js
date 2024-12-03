import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import ProductCardFavorite from "./ProductCardFavorite";
import styled from "styled-components";
import LoadingSpiner from "./LoadingSpiner";

const StyledFlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

export default function FavoriteItemList({ products }) {
  const [loading, setLoading] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const { data: session } = useSession();

  const getFavoritesItems = useCallback(async () => {
    setLoading(true);
    try {
      const resposne = await fetch("/api/favoriteitem");
      const data = await resposne.json();
      setFavoriteItems(data);
    } catch (error) {
      console.error("Error refreshing favorite items: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getFavoritesItems();
  }, [getFavoritesItems]);

  const userFavoriteItems = favoriteItems
    .filter((item) => item.user === session?.user.id)
    .map((item) => {
      const product = products.find((product) => product._id === item.product);
      if (product) {
        return {
          ...product,
        };
      }
      return null;
    })
    .filter(Boolean);

  if (loading) {
    return (
      <div>
        <LoadingSpiner />
      </div>
    );
  }

  if (userFavoriteItems.length === 0) {
    return (
      <div>
        <ul>No favorite items</ul>
      </div>
    );
  }

  return (
    <StyledFlexWrapper>
      {userFavoriteItems.map((product) => (
        <ProductCardFavorite
          product={product}
          key={product?.name}
          refresh={getFavoritesItems}
        />
      ))}
    </StyledFlexWrapper>
  );
}
