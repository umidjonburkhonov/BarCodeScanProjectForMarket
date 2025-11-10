// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {
    return (
        <div className="mt-10 flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 relative pb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
                Панель управления продуктом
            </h2>




            <div className="flex flex-col items-center gap-8">
                <Link
                    to="/products"
                    className="w-60 sm:w-64 h-30 sm:h-64 bg-blue-500 text-white rounded-2xl shadow-xl flex items-center justify-center text-2xl sm:text-3xl font-bold transition-transform hover:scale-105 active:scale-95"
                >
                    Поиск
                </Link>

                <Link
                    to="/scan"
                    className="w-56 sm:w-64 h-56 sm:h-64 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl sm:text-3xl font-bold transition-transform hover:scale-105 active:scale-95"
                >
                    SCAN
                </Link>


            </div>

            {/* Har doim pastda chiqadigan bar */}

        </div>
    );
}
