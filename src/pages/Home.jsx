import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryPosts, getPosts, searchPostWithTitle } from '../store/slices/postSlice';
import Pagination from '../components/Pagination';

const categories = ["All", "Steal", "Wood", "Cars"];

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const dispatch = useDispatch();
    const state = useSelector((state) => state.post);
    const orders = state.posts;
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(orders?.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        // dispatch(searchPostWithTitle({ title: "car" }));
        if (activeCategory == "All") {
            dispatch(getPosts());
        } else if (activeCategory == "Steal") {
            dispatch(getCategoryPosts("steal"));
        } else if (activeCategory == "Wood") {
            dispatch(getCategoryPosts("Wood"));
        } else if (activeCategory == "Cars") {
            dispatch(getCategoryPosts("Cars"));
        }
    }, [activeCategory, dispatch]);
    const handleSearch = (searchText) => {
        if (searchText) {
            dispatch(searchPostWithTitle({ title: searchText }))
        } else {
            dispatch(getPosts())
        }
    }

    return (
        <div className="container py-10">
            {categories.length > 0 ? (
                <div className="flex flex-wrap gap-5 justify-center sm:justify-between items-center border-b pb-4 mb-5 border-main">
                    <div className="flex justify-center flex-wrap gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-md ${activeCategory === category ? "bg-main text-white" : "bg-gray-200 text-black"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <input type="text" onChange={e => handleSearch(e.target.value)} className='bg-main/10 p-3 rounded-md border border-main placeholder-main focus:outline-none' placeholder='Search...' />
                </div>
            ) : (
                <div className="text-center text-gray-600 text-lg mb-8">No categories available.</div>
            )}
            {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentItems.map((order) => (
                        <Link to={`/orders/${order.id}`} key={order.id} className="order shadow-md border border-main rounded-md overflow-hidden">
                            <div className="image">
                                <img
                                    src={`data:image/png;base64,${order.image}`}
                                    className="w-full h-48 object-cover"
                                    alt={order.title}
                                />
                            </div>
                            <div className="info px-4 py-2 space-y-1">
                                <h3 className="text-lg font-medium">{order.title}</h3>
                                <div className="owner flex items-center gap-1">
                                    <span className="text-lg font-medium">Owner: </span>
                                    <span>{order.fullName}</span>
                                </div>
                                <p>
                                    <span className="text-lg font-medium">Description: </span>
                                    <span className="leading-7 line-clamp-2">{order.description}</span>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <p className="text-gray-600 text-lg mb-2">No orders available for {activeCategory} category.</p>
                        <p className="text-gray-600 text-lg">Please select a different category or check back later.</p>
                    </div>
                </div>
            )}
            <div className="py-10 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPageCount={totalPageCount}
                    onPageChange={handlePageChange}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                />
            </div>
        </div>
    );
};

export default Home;
