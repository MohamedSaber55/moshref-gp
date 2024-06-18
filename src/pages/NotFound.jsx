import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-main mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-lg mb-8">The page you are looking for does not exist or an error occurred.</p>
            <Link to="/" className="px-6 py-3 bg-main text-white rounded-full text-lg font-medium hover:bg-main/80 duration-150">
                Go Back to Homepage
            </Link>
        </div>
    );
}

export default NotFound;
