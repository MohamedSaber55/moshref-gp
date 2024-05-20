import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import ScrollToTopBTN from "./ScrollToTopBTN";

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-8 relative">
            <ScrollToTopBTN />
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="col-span-1">
                        <Link to="/">
                            <img src="/logo-main.png" alt="Logo" className="w-24 h-auto" />
                        </Link>
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                            <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
                            <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-gray-400">© 2024 Your Website. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
