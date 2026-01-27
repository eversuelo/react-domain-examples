import { Outlet } from "react-router";
import Header from "../components/Header";
import Notification from "../components/Notification";

export default function Layout() {
    return (
        <>
            <Header />
            <main className="container mx-auto py-16">
                <Outlet />
            </main>
            <Notification />
        </>
    );
}
