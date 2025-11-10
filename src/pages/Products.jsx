import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

import { useProducts } from "../store/ProductsContext";

export default function Products() {
    const { products, remove } = useProducts();
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("ALL");

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return products.filter((p) => {
            const byCat = category === "ALL" ? true : p.category === category;
            const byText =
                !qq ||
                p.title.toLowerCase().includes(qq) ||
                p.description.toLowerCase().includes(qq) ||
                p.barcode.includes(qq);
            return byCat && byText;
        });
    }, [products, q, category]);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                Список продуктов
            </h2>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Введите имя, номер или штрихкода..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />

            </div>

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((p) => (
                        <ProductCard key={p.id} p={p} onDelete={remove} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl shadow-sm">
                    <p className="text-lg">Товары не найдены.</p>
                    <p className="text-sm text-gray-400">Измените входной материал или добавьте новый продукт</p>
                </div>
            )}
        </div>
    );
}
