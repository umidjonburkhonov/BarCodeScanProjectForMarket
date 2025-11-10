import { useCallback, useState } from "react";
import Scanner from "../components/Scanner";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../store/ProductsContext";

export default function Scan() {
    const { products } = useProducts();
    const [code, setCode] = useState("");
    const [hit, setHit] = useState(null);

    const onDetected = useCallback(
        (c) => {
            setCode(c);
            const found = products.find((p) => p.barcode === c);
            setHit(found || null);
        },
        [products]
    );

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center ">
                Сканирование штрих-кода
            </h2>

            {/* Kamera bloki */}
            <div className="flex flex-col items-center justify-center gap-4 mb-2">
                <div className="w-64 sm:w-72  rounded-2xl overflow-hidden cursor-pointer">
                    <Scanner onDetected={onDetected} />
                </div>
                <p className="text-gray-600 text-sm">
                    код сканера:{" "}
                    <span className="font-medium text-gray-900">{code || "—"}</span>
                </p>
            </div>

            {/* Natija */}
            {hit ? (
                <div className="animate-fadeIn">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
                        Продукт найден
                    </h3>
                    <ProductCard p={hit} />
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-xl text-center py-10 text-gray-500 shadow-sm">
                    <p className="text-lg font-medium mb-1">Товар не найден </p>
                    <p className="text-sm text-gray-400">
                        наведите камеру на правильный штрихкод
                    </p>
                </div>
            )}
        </div>
    );
}
