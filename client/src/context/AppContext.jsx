import { createContext, useEffect, useState, useMemo } from "react";
import { fetchCategories } from "../service/CategaryService";
import { fetchItems } from "../service/ItemService";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth, setAuth] = useState({ token: null, role: null });
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const setAuthData = (token, role) => {
        if (token && role) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
        setAuth({ token, role });
    };

    const addToCart = (item) => {
        const existing = cartItems.find((x) => x.itemId === item.itemId);
        if (existing) {
            setCartItems(
                cartItems.map((x) =>
                    x.itemId === item.itemId
                        ? { ...x, quantity: x.quantity + 1 }
                        : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter((item) => item.itemId !== itemId));
    };

    const updateQuantity = (itemId, qty) => {
        setCartItems(
            cartItems.map((item) =>
                item.itemId === itemId ? { ...item, quantity: qty } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    useEffect(() => {
        async function loadData() {
            const token = localStorage.getItem("token");
            const role  = localStorage.getItem("role");

            if (token && role) {
                setAuthData(token, role);
            }

            // If NOT logged in → skip API calls
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetchCategories();
                const items = await fetchItems();

                setCategories(response.data || []);
                setItemsData(items.data || []);
                console.log("Fetched categories:", response.data);
                console.log("Fetched items:", items.data);
            } catch (err) {
                console.error("Failed to load data:", err);

            }

            setLoading(false);
        }

        loadData();
    }, []);


    const contextValue = useMemo(
        () => ({
            categories,
            setCategories,
            itemsData,
            setItemsData,
            auth,
            setAuthData,
            loading,
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        }),
        [categories, itemsData, auth, loading, cartItems]
    );

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
