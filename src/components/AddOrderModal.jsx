import { useEffect } from "react";
import propTypes from "prop-types";
import { TfiClose } from 'react-icons/tfi';

const AddOrderModal = ({ onClose }) => {
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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[51]">
            <div className="relative modal-content w-11/12 md:w-2/3 grid grid-cols-1 gap-5 bg-slate-400 border border-gray-300 bg-opacity-50 p-4 px-5 backdrop-blur rounded-md shadow-2xl">
                <h2 className="font-semibold text-xl font-rubik">Add new Order</h2>
                <div className="uploadImage">
                    <input type="file" />
                </div>
                <button className="p-2 rounded-md text-white bg-main w-fit px-4">Check AI</button>
                <textarea name="" id="" cols="10" rows="5" className="rounded-md outline-none p-3 placeholder-main border border-main" placeholder="Comment for Check AI"></textarea>
                <button className="p-2 rounded-md text-white bg-main w-fit px-4">Transfer to Section</button>
                <button onClick={onClose} className=" absolute top-2 right-2 rounded-md  text-warning border border-warning p-2 hover:bg-warning hover:text-white"> <TfiClose /></button>
            </div>
        </div>
    );
};

AddOrderModal.propTypes = {
    onClose: propTypes.func.isRequired
};

export default AddOrderModal;
