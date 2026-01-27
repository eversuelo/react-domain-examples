import { createBrowserRouter } from "react-router";
import Layout from "./layouts/Layout";
import IndexPage from "./views/IndexPage";
import FavoritesPage from "./views/FavoritesPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <IndexPage />,
            },
            {
                path: "favorites",
                element: <FavoritesPage />,
            },
        ],
    },
]);

export default router;
