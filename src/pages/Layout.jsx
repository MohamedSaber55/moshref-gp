import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
            <Footer/>
        </>
    )
}

export default Layout