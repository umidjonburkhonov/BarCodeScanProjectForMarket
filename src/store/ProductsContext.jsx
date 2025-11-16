import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as db from "../lib/productsApi"; 
import { onValue, ref, getDatabase } from "firebase/database";

const ProductsCtx = createContext();

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const dbInstance = getDatabase();

    // 🔹 Firebase dan real-time ma’lumot olish
    useEffect(() => {
        const productsRef = ref(dbInstance, "products");
        const unsubscribe = onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const list = data
                ? Object.keys(data).map((id) => ({ id, ...data[id] }))
                : [];
            setProducts(list);
        });
        return () => unsubscribe();
    }, [dbInstance]);

    // 🔹 CRUD funksiyalar
    const actions = useMemo(
        () => ({
            async add(p) {
                await db.upsert(p);
            },
            async remove(id) {
                await db.removeById(id);
            },
            async refresh() {
                const all = await db.getAll();
                setProducts(all);
            },
        }),
        []
    );

    return (
        <ProductsCtx.Provider value={{ products, ...actions }}>
            {children}
        </ProductsCtx.Provider>
    );
}

export function useProducts() {
    return useContext(ProductsCtx);
}
