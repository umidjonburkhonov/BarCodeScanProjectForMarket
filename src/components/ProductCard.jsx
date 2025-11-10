import { Link } from "react-router-dom";

export default function ProductCard({ p, onDelete }) {
    if (!p) return null;
    const profit = (p.sellPrice ?? 0) - (p.buyPrice ?? 0);

    return (
        <Link
            to={`/product/${p.id}`}
            className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-400 transition-all duration-200 p-5 flex flex-col justify-between h-full"
        >
            {/* Yuqori qism */}
            <div>
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                        {p.title}
                    </h3>
                    {/* {onDelete && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete(p.id);
                            }}
                            className="text-red-500 hover:text-red-600 text-sm font-medium transition"
                            title="O‘chirish"
                        >
                            ✕
                        </button>
                    )} */}
                </div>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {p.description || "Описание недоступно"}
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-700">
                    <p className="flex justify-between">
                        <span className="font-medium text-gray-600">Штрихкод:</span>
                        <span className="text-gray-800">{p.barcode}</span>
                    </p>

                </div>
            </div>

            {/* Pastki narxlar bloki */}
            <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">Цена покупки:</span>
                    <span className="text-gray-800">{p.buyPrice} сомони</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">Цена продажи:</span>
                    <span className="text-gray-800">{p.sellPrice} сомони</span>
                </div>


            </div>
        </Link>
    );
}
