import { createBrowserRouter } from "react-router";
import Layout from "./layouts/Layout";
import IndexPage from "./views/IndexPage";
import FavoritesPage from "./views/FavoritesPage";
import AICreatorPage from "./views/AICreatorPage";

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
            {
                path: "ai-creator",
                element: <AICreatorPage />,
            },
        ],
    },
]);

export default router;
