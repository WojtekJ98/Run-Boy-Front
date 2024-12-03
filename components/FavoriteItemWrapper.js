"use client";

import { useEffect, useState } from "react";
import FavoriteItemList from "./FavoriteItemList";

export default function FavoriteItemWrapper() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await fetch("/api/products");
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return <FavoriteItemList products={products} />;
}
