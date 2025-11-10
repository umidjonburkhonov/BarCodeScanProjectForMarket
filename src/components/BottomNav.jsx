// src/components/BottomNav.jsx
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, PlusIcon, CameraIcon, BoxesIcon } from "lucide-react";

export default function BottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-15 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around items-center py-2 z-50 sm:hidden">
            <Link
                to="/"
                className={`flex flex-col items-center text-xs ${location.pathname === "/" ? "text-green-600" : "text-gray-500"
                    }`}
            >
                <HomeIcon className="w-6 h-6 mb-1" />
                Главный
            </Link>

            <Link
                to="/products"
                className={`flex flex-col items-center text-xs ${location.pathname === "/products"
                    ? "text-green-600"
                    : "text-gray-500"
                    }`}
            >
                <BoxesIcon className="w-6 h-6 mb-1" />
                Продукты
            </Link>

            <Link
                to="/scan"
                className="flex flex-col items-center justify-center text-xs text-white bg-green-500 rounded-full w-16 h-16 shadow-lg  border-4 border-white active:scale-95 transition"
            >
                <CameraIcon className="w-7 h-7" />
                <span className="text-[10px] font-semibold mt-1">SCAN</span>
            </Link>

            <Link
                to="/add"
                className={`flex flex-col items-center text-xs ${location.pathname === "/add" ? "text-green-600" : "text-gray-500"
                    }`}
            >
                <PlusIcon className="w-6 h-6 mb-1" />
                Новый продукт
            </Link>
        </nav>
    );
}
