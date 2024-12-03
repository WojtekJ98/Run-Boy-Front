"use client";
import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favoriteItems, setFavoriteItems] = useState([]);

  async function fetchFavorites() {
    try {
      const response = await fetch("/api/favoriteitem");
      const data = await response.json();
      setFavoriteItems(data);
    } catch (error) {
      console.error("Error fetching favorite items:", error);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{ favoriteItems, setFavoriteItems, fetchFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  return useContext(FavoriteContext);
}
