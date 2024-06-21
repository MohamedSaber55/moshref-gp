import { useParams } from "react-router-dom"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPost } from "../store/slices/postSlice"
import { addOffer, getOffers } from "../store/slices/offerSlice"
import moment from "moment"
import Pagination from "../components/Pagination"
const UserId = localStorage.getItem("moshUserId")

const Order = () => {
    const params = useParams()
    const orderId = params.orderId
    const dispatch = useDispatch()
    const state = useSelector(state => state.post)
    const offersState = useSelector(state => state.offer)
    const offers = offersState.offers
    const { post, loading } = state
    const [comment, setComment] = useState("")
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = offers?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(offers?.length / itemsPerPage);

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
        dispatch(getPost(orderId))
        dispatch(getOffers({ postId: orderId }))
    }, [dispatch, orderId])

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            Description: comment,
            ClientId: UserId,
            PostId: orderId
        }
        dispatch(addOffer({ body })).then(() => dispatch(getOffers({ postId: orderId }))
        )
    }

    if (loading) {
        return (
            <div className="container mx-auto mt-8 flex flex-col items-center justify-center h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-t-4 bg-gray-200 rounded-full border-main spin" role="status"></div>
                <div className="text-center text-gray-600 text-lg mt-4">Loading...</div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="container mx-auto mt-8 flex flex-col items-center justify-center h-screen">
                <div className="text-center text-gray-600 text-lg bg-red-100 p-4 rounded-lg shadow-lg">
                    Order not found.
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="container py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 pb-5 border-b">
                    <div className="image md:col-span-1">
                        <img src={`data:image/png;base64,${post.image}`} alt="Order Image" className="w-full max-h-96 object-contain border rounded-md" />
                    </div>
                    <div className="content md:col-span-1 space-y-2">
                        <div className="">
                            <span className="bg-main/30 py-1 px-2 rounded-3xl">{post.categoryName}</span>
                        </div>
                        <h2 className="text-2xl font-medium">{post.title}</h2>
                        <p>
                            <span className="font-medium">Description: </span>
                            <span className="leading-7">{post.description}</span>
                        </p>
                        <div className="owner flex items-center gap-1">
                            <span className="font-medium">Owner: </span>
                            <span>{post.fullName}</span>
                        </div>
                        <div className="availability flex items-center gap-1">
                            <span className="font-medium">Available: </span>
                            <span>{post.isAvailable ? "Yes" : "No"}</span>
                        </div>
                        <div className="created-at flex items-center gap-1">
                            <span className="font-medium">Created At: </span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="offers">
                        <h2 className="text-2xl font-semibold mb-5">Offers</h2>
                        <div className="offers-list grid  gap-2">
                            {currentItems.length > 0 ? currentItems.map((offer, i) => (
                                <>
                                    <div key={i} className="offer rounded-xl flex items-end gap-2 w-full">
                                        <div className="offer-content border p-2 rounded-md border-main/50 w-full mx-1 flex justify-between items-center">
                                            <div className="content space-y-1">
                                                <div className="offer-description rounded-full flex gap-2 items-center">
                                                    <h5 className="text-lg font-medium">{offer.description}</h5>
                                                </div>
                                                <p>{moment(offer.addedAt).fromNow()}</p>
                                                <p className="flex items-center text-sm gap-2"><AiOutlineMail size={18} /> {offer.email}</p>
                                                <p className="flex items-center text-sm gap-2"><AiOutlinePhone size={18} /> {offer.phoneNumber}</p>
                                            </div>
                                            <div className="actions flex gap-2 items-center">
                                                <button className="p-2 rounded-md text-sm text-white bg-main/80 border border-main">Accept</button>
                                                {/* <button className="p-2 rounded-md text-sm text-white bg-red-500 border border-red-800">Refuse</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )) : <div>No Offers yet!</div>}
                        </div>
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