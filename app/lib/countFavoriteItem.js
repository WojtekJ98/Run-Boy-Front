import { useEffect, useState } from "react";

export default function useFavoriteItemCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchFavoriteItems() {
      try {
        const response = await fetch("/api/favoriteitem");
        const data = await response.json();
        setCount(data.length);
      } catch (error) {
        console.error("Error fetching favorite items:", error);
      }
    }

    fetchFavoriteItems();
  }, []);

  return count;
}
