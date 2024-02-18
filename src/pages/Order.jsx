import { useParams } from "react-router-dom"
import { orders } from "./../data/orders.json"
import { offers } from "./../data/offers.json"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
const Order = () => {
    const params = useParams()
    const orderId = params.orderId
    const order = orders.find(order => order.id === orderId)
    const comments = offers.filter(offer => offer.order_id === orderId)
    return (
        <div>
            <div className="container py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="image col-span-3 md:col-span-1">
                        <img src={order.image} alt="Order Image" />
                    </div>
                    <div className="content col-span-3 md:col-span-2 space-y-2">
                        <h2 className="text-2xl font-medium">{order.title}</h2>
                        <p>
                            <span className="text-lg font-medium">Description: </span>
                            <span className="leading-7">{order.desc}</span>
                        </p>
                        <div className="owner flex items-center gap-1">
                            <span className="text-lg font-medium">Owner: </span>
                            <span>{order.owner}</span>
                        </div>
                    </div>
                    <div className="offers my-5 col-span-3">
                        <h2 className="text-2xl font-semibold mb-5">Offers </h2>
                        <div className="comments grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {comments.length > 0 ? comments.map(comment => (
                                <div key={comment.id} className="comment rounded-xl flex items-end gap-2">
                                    <div className="comment-content border p-2 rounded-md border-main space-y-2">
                                        <div className="user-image rounded-full flex gap-2 items-center">
                                            <img src={comment.image} className="h-14 w-14 rounded-full" alt="user Image" />
                                            <h5 className="text-lg font-medium">{comment.user}</h5>
                                        </div>
                                        <p>{comment.comment}</p>
                                        <p className="flex items-center gap-2"><AiOutlineMail size={22} /> {comment.contacts?.email}</p>
                                        <p className="flex items-center gap-2"><AiOutlinePhone size={22} /> {comment.contacts?.phone} </p>
                                        <div className="actions flex gap-2 items-center">
                                            <button className="p-2 rounded-md text-sm text-white bg-green-500 border border-green-800">Accept</button>
                                            <button className="p-2 rounded-md text-sm text-white bg-red-500 border border-red-800">Refuse</button>
                                        </div>
                                    </div>
                                </div>
                            )) : <div>No Offers yet!</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order