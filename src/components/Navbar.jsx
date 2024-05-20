import { useState } from "react"
import { Link } from "react-router-dom"
import { TfiClose } from 'react-icons/tfi';
import { VscMenu } from 'react-icons/vsc'
import AddOrderModal from "./AddOrderModal";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false)
    const links = [
        { title: "Home", to: "/" },
        { title: "About", to: "/about" },
        { title: "Team", to: "/team" },
        { title: "Contact", to: "/contact" },
    ]
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    return (
        <nav className="shadow h-16 relative z-50">
            <div className="h-full container flex justify-between items-center bg-white">
                <div className="logo">
                    <Link to={"/"} className="flex items-center justify-center gap-1">
                        <img src="/logo-main.png" alt="Logo" className="w-14 h-auto" />
                        <h1 className="text-3xl font-bold text-main">Logo</h1>
                    </Link>
                </div>
                <div className="links hidden sm:flex items-center justify-center gap-5">
                    {links.map(link => (
                        <Link key={link.title} to={link.to} className="font-medium hover:text-main duration-300" >{link.title}</Link>
                    ))}
                    <button onClick={togglePopup} className="text-sm bg-main p-2 rounded-md text-white">Add Order</button>
                </div>
                <div className="mobile-btn sm:hidden flex items-center gap-3">
                    <button onClick={togglePopup} className="text-sm bg-main p-2 rounded-md text-white">Add Order</button>
                    <div className="">
                        <button onClick={() => setNavOpen(!navOpen)} className="text-2xl">
                            {navOpen ? <TfiClose /> : <VscMenu />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile view */}
            <div className={`mobile-view absolute -z-10 inset-x-0 sm:-top-48 sm: bg-white border-t py-3 duration-500 ${!navOpen ? "-top-48" : "top-16 shadow-lg"}`}>
                <div className="container">
                    <div className="links flex flex-col justify-center gap-5">
                        {links.map(link => (
                            <Link key={link.title} to={link.to} className="font-medium hover:text-main duration-300" >{link.title}</Link>
                        ))}
                    </div>
                </div>
            </div>
            {showPopup && <AddOrderModal onClose={togglePopup} />}

        </nav>
    )
}

export default Navbar