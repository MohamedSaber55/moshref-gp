import { useState } from 'react';
import { Link } from "react-router-dom";
import { orders } from "./../data/orders.json";

const categories = ["All", "Electronics", "Furniture", "Clothing", "Automotive", "Others"];

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredOrders = activeCategory === "All"
        ? orders
        : orders.filter(order => order.category === activeCategory);

    return (
        <div className="container py-10">
            {categories.length > 0 ? (
                <div className="mb-8">
                    <div className="flex justify-center flex-wrap gap-4">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-md ${activeCategory === category ? 'bg-main text-white' : 'bg-gray-200 text-black'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-600 text-lg mb-8">No categories available.</div>
            )}
            {filteredOrders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredOrders.map(order => (
                        <Link to={`/orders/${order.id}`} key={order.id} className="order shadow-md border border-main rounded-md overflow-hidden">
                            <div className="image">
                                <img src={order.image} className="w-full h-48 object-cover" alt={order.title} />
                            </div>
                            <div className="info px-4 py-2 space-y-1">
                                <h3 className="text-lg font-medium">{order.title}</h3>
                                <div className="owner flex items-center gap-1">
                                    <span className="text-lg font-medium">Owner: </span>
                                    <span>{order.owner}</span>
                                </div>
                                <p>
                                    <span className="text-lg font-medium">Description: </span>
                                    <span className="leading-7">{order.desc}</span>
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
        </div>
    );
};

export default Home;
