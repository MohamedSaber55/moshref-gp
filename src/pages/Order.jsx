import { useParams } from "react-router-dom"
import { orders } from "./../data/orders.json"
import { offers } from "./../data/offers.json"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { useState } from "react"
const Order = () => {
    const params = useParams()
    const orderId = parseInt(params.orderId);
    const order = orders?.find(order => order.id === orderId)
    const comments = offers.filter(offer => offer.order_id == orderId)
    const [comment, setComment] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newOffer = {
            id: offers.length + 1,
            order_id: orderId,
            comment: comment,
            contacts: {
                email: email,
                phone: phone
            }
        };
        console.log("New Offer:", newOffer);
        // You can add logic here to send the new offer to the server or update the state accordingly
        // For simplicity, let's just log the new offer
    };

    if (!order) {
        return (
            <div className="container mx-auto mt-8">
                <div className="text-center text-gray-600 text-lg">Order not found.</div>
            </div>
        );
    }

    return (
        <div>
            <div className="container py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="image md:col-span-1">
                        <img src={order.image} alt="Order Image" className="w-full h-80 object-contain border rounded-md" />
                    </div>
                    <div className="content md:col-span-1 space-y-2">
                        <div className="">
                            <span className="bg-main/30 py-1 px-2 rounded-3xl">{order.category}</span>
                        </div>
                        <h2 className="text-2xl font-medium">{order.title}</h2>
                        <p>
                            <span className="font-medium">Description: </span>
                            <span className="leading-7">{order.desc}</span>
                        </p>
                        <div className="owner flex items-center gap-1">
                            <span className="font-medium">Owner: </span>
                            <span>{order.owner}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="offers">
                        <h2 className="text-2xl font-semibold mb-5">Offers </h2>
                        <div className="comments grid gap-2">
                            {comments.length > 0 ? comments.map(comment => (
                                <div key={comment.id} className="comment rounded-xl flex items-end gap-2 w-full">
                                    <div className="comment-content border p-2 rounded-md border-main/50 space-y-2 w-full mx-1">
                                        <div className="user-image rounded-full flex gap-2 items-center">
                                            <img src={comment.image} className="h-10 object-cover w-10  rounded-full" alt="user Image" />
                                            <h5 className="text-lg font-medium">{comment.user}</h5>
                                        </div>
                                        <p>{comment.comment}</p>
                                        <p className="flex items-center text-sm gap-2"><AiOutlineMail size={18} /> {comment.contacts?.email}</p>
                                        <p className="flex items-center text-sm gap-2"><AiOutlinePhone size={18} /> {comment.contacts?.phone} </p>
                                        <div className="actions flex gap-2 items-center">
                                            <button className="p-2 rounded-md text-sm text-white bg-main/80 green-500 border border-main">Accept</button>
                                            <button className="p-2 rounded-md text-sm text-white bg-red-500 border border-red-800">Refuse</button>
                                        </div>
                                    </div>
                                </div>
                            )) : <div>No Offers yet!</div>}
                        </div>
                    </div>
                    <div className="">
                        <h2 className="text-2xl font-semibold mb-4">Add Offer</h2>
                        <div className="bg-main/10 rounded-md border border-main/50 p-8">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">Comment:</label>
                                    <textarea
                                        id="comment"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-main"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-main"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-main"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="bg-main/80 duration-200 text-white py-2 px-4 rounded-lg hover:bg-main focus:outline-none focus:bg-main/90">Submit Offer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order