import { useState } from "react";
import { nanoid } from "nanoid";
import Scanner from "../components/Scanner";

import { useProducts } from "../store/ProductsContext";

export default function AddProduct() {
    const { add } = useProducts();
    const [barcode, setBarcode] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Other");
    const [buyPrice, setBuyPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [showScan, setShowScan] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!barcode || !title) return;
        const now = Date.now();
        add({
            id: nanoid(),
            barcode: barcode.trim(),
            title: title.trim(),
            description: description.trim(),
            buyPrice: Number(buyPrice || 0),
            sellPrice: Number(sellPrice || 0),
            createdAt: now,
            updatedAt: now,
        });
        setBarcode("");
        setTitle("");
        setDescription("");
        setBuyPrice("");
        setSellPrice("");
    }




    return (
        <div className="max-w-md mx-auto p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Добавить продукт
            </h2>



            {showScan && (
                <div className="flex flex-col items-center gap-2 mb-4">
                    <div className="w-60 sm:w-72 rounded-xl overflow-hidden border-2 border-green-500 shadow-md">
                        <Scanner
                            onDetected={(code) => {
                                setBarcode(code);
                                setShowScan(false); // o‘qilgach kamera avtomatik yopiladi
                            }}
                        />
                    </div>
                    <p className="text-sm text-gray-600">Отсканированный штрих-код: {barcode}</p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col gap-3"
            >
                <input
                    type="text"
                    placeholder="Штрихкод"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="text"
                    placeholder="Название продукта"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                    placeholder="Комментария"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-20"
                />

                <input
                    type="number"
                    step="0.01"
                    placeholder="Цена покупки"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Цена продажи"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 mt-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                >
                    Сохранить
                </button>
            </form>

            <button
                onClick={() => setShowScan((s) => !s)}
                className="w-full  py-4 mt-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
                {showScan ? "Закройте камеру" : "Сканер штрих-кода"}
            </button>
        </div>
    );
}
