import { BrowserRouter,Routes,Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/CreateProjectView";
export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route  element={<AppLayout/>}>
                <Route path="/" index element={<DashboardView/>}/>
                <Route path="/projects/create" index element={<CreateProjectView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}