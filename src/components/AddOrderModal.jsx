import { useEffect, useState } from "react";
import propTypes from "prop-types";
import { TfiClose } from 'react-icons/tfi';

const AddOrderModal = ({ onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [comment, setComment] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest(".modal-content")) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[51]">
            <div className="modal-content w-11/12 md:w-2/3 bg-white border border-gray-300 bg-opacity-95 p-4 px-5 rounded-md shadow-2xl">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="font-semibold text-xl font-rubik text-gray-800">Add New Order</h2>
                    <button onClick={onClose} className="top-4 right-5 border p-2 rounded-md text-white bg-warning/75 hover:bg-warning duration-300">
                        <TfiClose size={18} />
                    </button>
                </div>
                <div className="uploadImage mb-4">
                    <input type="file" onChange={handleImageChange} className="hidden" id="fileInput" />
                    <label htmlFor="fileInput" className="cursor-pointer block w-full h-40 border border-dashed border-gray-400 rounded-md overflow-hidden bg-gray-100 hover:bg-gray-200">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Selected" className="object-cover w-fit h-full" />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <span className="text-gray-600">Click to select an image</span>
                            </div>
                        )}
                    </label>
                </div>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    className="w-full h-24 rounded-md outline-none p-3 text-sm placeholder-gray-600 border border-gray-300 mb-4"
                    placeholder="Comment for Check AI"
                />
                <div className="flex justify-end">
                    <button className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 mr-2">Check AI</button>
                    <button className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 mr-2">Transfer to Section</button>
                </div>
            </div>
        </div>
    );
};

AddOrderModal.propTypes = {
    onClose: propTypes.func.isRequired
};

export default AddOrderModal;
