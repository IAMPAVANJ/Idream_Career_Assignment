import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
    const getUserDetails = JSON.parse(sessionStorage.getItem("token"))
    return (getUserDetails ? <Outlet /> : <Navigate to="/"/>)
}
export default ProtectedRoutes;