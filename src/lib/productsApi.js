import { initializeApp } from "firebase/app";
import {
    getDatabase,
    ref,
    get,
    set,
    push,
    remove,
    update,
} from "firebase/database";

// Firebase config
const firebaseConfig = {
    databaseURL:
        
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const PRODUCTS_REF = ref(db, "products");

// ✅ Get all products
export async function getAll() {
    const snapshot = await get(PRODUCTS_REF);
    const data = snapshot.val();
    return data ? Object.keys(data).map((id) => ({ id, ...data[id] })) : [];
}

// ✅ Save (create or update)
export async function upsert(product) {
    if (!product.id) {
        // yangi mahsulot
        const newRef = push(PRODUCTS_REF);
        const newProduct = { ...product, id: newRef.key };
        await set(newRef, newProduct);
        return newProduct;
    } else {
        // mavjud mahsulotni yangilash
        const productRef = ref(db, `products/${product.id}`);
        await update(productRef, product);
        return product;
    }
}

// ✅ Remove by ID
export async function removeById(id) {
    const productRef = ref(db, `products/${id}`);
    await remove(productRef);
}

// ✅ Find by barcode
export async function findByBarcode(code) {
    const all = await getAll();
    return all.find((p) => p.barcode === code) || null;
}

// ✅ Search (text + category filter)
export async function search({ q = "", category = "ALL" }) {
    const list = await getAll();
    const qq = q.trim().toLowerCase();
    return list.filter((p) => {
        const byCat = category === "ALL" ? true : p.category === category;
        const byText =
            !qq ||
            p.title?.toLowerCase().includes(qq) ||
            p.description?.toLowerCase().includes(qq) ||
            p.barcode?.includes(qq);
        return byCat && byText;
    });
}
