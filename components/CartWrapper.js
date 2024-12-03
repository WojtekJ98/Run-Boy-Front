"use client";
import { useEffect, useState } from "react";
import Cart from "./Cart";

export default function CartWrapper() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await fetch("/api/products");
        const productsData = await productsResponse.json();
        setProducts(productsData);

        const usersResponse = await fetch("/api/users");
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return <Cart products={products} users={users} />;
}
