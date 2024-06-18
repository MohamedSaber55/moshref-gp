/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoutes({ children }) {
    const state = useSelector(state => state.user)
    if (!state.token) {
        return <Navigate to={"/login"} replace={true} />;
    } else {
        return children;
    }
}