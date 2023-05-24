import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie';

const AdminRoute = () => {
    let auth = { 'isAdmin': false }
    if (JSON.parse(Cookies.get('info')).type_of_account === 'admin') {
        auth.isAdmin = true;
    }
    return (
        auth.isAdmin ? <Outlet /> : <Navigate to='*' />
    )
}

export default AdminRoute;