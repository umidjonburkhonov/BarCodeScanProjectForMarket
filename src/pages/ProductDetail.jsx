import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../store/ProductsContext";
import { Edit, Trash2, ScanLine, Save, X } from "lucide-react";

export default function ProductDetail() {
    const { idOrBarcode } = useParams();
    const { products, remove, add } = useProducts();
    const navigate = useNavigate();

    const product = useMemo(
        () => products.find((p) => p.id === idOrBarcode || p.barcode === idOrBarcode),
        [products, idOrBarcode]
    );

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        title: product?.title || "",
        description: product?.description || "",
        buyPrice: product?.buyPrice || "",
        sellPrice: product?.sellPrice || "",
    });

    if (!product) {
        return (
            <div className="max-w-lg mx-auto mt-16 px-4 text-center bg-gray-50 py-12 rounded-2xl shadow-sm border">
                <p className="text-lg font-medium text-gray-700 mb-2">Товар не найден</p>
                <Link
                    to="/products"
                    className="text-green-600 hover:text-green-700 font-semibold"
                >
                    ← Вернуться к списку
                </Link>
            </div>
        );
    }

    const profit = (product.sellPrice ?? 0) - (product.buyPrice ?? 0);

    const handleDelete = () => {
        if (confirm("Удалить этот продукт?")) {
            remove(product.id);
            navigate("/products");
        }
    };

    const handleSave = () => {
        if (!form.title.trim()) return alert("Название продукта не может быть пустым.");
        const updated = {
            ...product,
            title: form.title,
            description: form.description,
            buyPrice: Number(form.buyPrice) || 0,
            sellPrice: Number(form.sellPrice) || 0,
            updatedAt: Date.now(),
        };
        add(updated);
        setIsEditing(false);
        alert("Изменения сохранены!");
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Описание продукта</h2>
                <Link
                    to="/products"
                    className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                >
                    ← Назад
                </Link>
            </div>

            <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5 sm:p-6 space-y-5">
                {isEditing ? (
                    // ✏️ Tahrirlash formasi
                    <div className="space-y-4">
                        <input
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                            placeholder="Название продукта"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                        <textarea
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                            placeholder="Описание"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="number"
                                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                                placeholder="Цена покупки"
                                value={form.buyPrice}
                                onChange={(e) => setForm({ ...form, buyPrice: e.target.value })}
                            />
                            <input
                                type="number"
                                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                                placeholder="Цена продажи"
                                value={form.sellPrice}
                                onChange={(e) => setForm({ ...form, sellPrice: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm transition"
                            >
                                <X className="w-4 h-4" />
                                Отмена
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                            >
                                <Save className="w-4 h-4" />
                                Сохранить
                            </button>
                        </div>
                    </div>
                ) : (
                    // 👁️ Oddiy ko‘rish holati
                    <>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                            <p className="text-gray-500 text-sm mt-1">
                                {product.description || "Описание не прилагается."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                            <div>
                                <p>
                                    <span className="font-medium text-gray-600">Штрихкод:</span>{" "}
                                    {product.barcode}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="font-medium text-gray-600">Цена покупки:</span>{" "}
                                    {product.buyPrice} сомони
                                </p>
                                <p>
                                    <span className="font-medium text-gray-600">Цена продажи:</span>{" "}
                                    {product.sellPrice} сомони
                                </p>
                            </div>
                        </div>



                        <div className="flex justify-between sm:justify-end gap-2 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-sm transition"
                                title="Редактировать"
                            >
                                <Edit className="w-4 h-4" />
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
                                title="Удалить"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <Link
                                to="/scan"
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                                title="Сканировать снова"
                            >
                                <ScanLine className="w-4 h-4" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
