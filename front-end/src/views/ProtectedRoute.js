import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Chia cho 1000 để chuyển đổi từ milliseconds sang giây
    
    return decodedToken.exp < currentTime;
};
const ProtectedRoute = () => {
    let auth = { 'token': false }
    if (Cookies.get('jwt') !== undefined) {
        const expired = isTokenExpired(Cookies.get('jwt'));
         expired ? auth = { 'token': false } : auth = { 'token': Cookies.get('jwt') };
    }
    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default ProtectedRoute;