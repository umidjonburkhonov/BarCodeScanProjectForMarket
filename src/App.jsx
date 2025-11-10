import { Link, Outlet, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav"; // 🔹 yangi komponentni chaqiramiz

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Yuqori navbar (faqat desktopda ko‘rinadi) */}
      <nav className="hidden sm:flex items-center gap-6 border-b border-gray-200 px-6 py-3 bg-white shadow-sm">
        <Link
          to="/"
          className={`font-medium ${location.pathname === "/" ? "text-green-600" : "text-gray-700"
            }`}
        >
          Home
        </Link>
        <Link
          to="/add"
          className={`font-medium ${location.pathname === "/add" ? "text-green-600" : "text-gray-700"
            }`}
        >
          Add
        </Link>
        <Link
          to="/products"
          className={`font-medium ${location.pathname === "/products" ? "text-green-600" : "text-gray-700"
            }`}
        >
          Products
        </Link>
        <Link
          to="/scan"
          className={`font-medium ${location.pathname === "/scan" ? "text-green-600" : "text-gray-700"
            }`}
        >
          Scan
        </Link>
      </nav>

      {/* Sahifa kontenti */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Pastki navbar — mobil uchun doimiy */}
      <BottomNav />
    </div>
  );
}
