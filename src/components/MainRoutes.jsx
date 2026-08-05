import { Routes, Route} from "react-router-dom";
import Layout from './layout/Layout';
import Home from "./screens/Home";
import TermsAndConditions from "./TermsAndConditions";
import Admin from "./admin/Admin";
import {Context as AuthContext} from "../context/AuthContext";
import { useContext } from "react";
import ProtectedRoute from "./layout/ProtectedRoute";


const MainRoutes = () => {
    const {state:{authenticated},setAuthenticated} = useContext(AuthContext);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/home" element={<Home />}>
                </Route>

                <Route path="/admin" element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }>
                </Route>
            </Routes>
        </>
    );
}


export default MainRoutes;