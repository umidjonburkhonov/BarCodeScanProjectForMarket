import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import AddProduct from "../pages/AddProduct";
import Products from "../pages/Products";
import Scan from "../pages/Scan";
import ProductDetail from "../pages/ProductDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "add", element: <AddProduct /> },
            { path: "products", element: <Products /> },
            { path: "scan", element: <Scan /> },
            { path: "product/:idOrBarcode", element: <ProductDetail /> },
        ],
    },
]);
