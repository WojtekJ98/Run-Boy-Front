import {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
} from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cartitem");
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error refreshing cart items:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }
  function closeCart() {
    setCartOpen(false);
  }
  function openCart() {
    setCartOpen(true);
  }
  return (
    <LocalStateProvider
      value={{
        cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart,
        cartItems,
        setCartItems,
        refreshCart,
        loading,
      }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart };
