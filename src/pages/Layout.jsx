import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default Layout