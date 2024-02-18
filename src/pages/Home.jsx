import { Link } from "react-router-dom"
import { orders } from "./../data/orders.json"
const Home = () => {
    return (
        <div className="">
            <div className="container py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {orders.map(order => (
                        <Link to={`/orders/${order.id}`} key={order.id} className="order shadow-md border border-main rounded-md overflow-hidden">
                            <div className="image">
                                <img src={order.image} className="w-full" alt="" />
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
            </div>
        </div>
    )
}

export default Home