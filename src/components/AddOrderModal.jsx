import { useEffect, useState } from "react";
import propTypes from "prop-types";
import { TfiClose } from 'react-icons/tfi';
import { useDispatch, useSelector } from "react-redux";
import { mixed, object, string } from "yup";
import { useFormik } from "formik";
import { addPost, getPosts } from "../store/slices/postSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select"
const ProfileId = localStorage.getItem("moshProfileId")
const UserId = localStorage.getItem("moshUserId")
const AddOrderModal = ({ onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const state = useSelector(state => state.post);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            addPostFormik.setFieldValue("Image", file);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validationSchema = object({
        Image: mixed().required("Image is required")
            .test("fileType", "Unsupported File Format", value => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
            .test("fileSize", "File Size is too large", value => value && value.size <= 2000000),
        Title: string().required("Title is required"),
        Description: string().required("Description is required"),
        CategoryName: string().required("Category is required"),
    });

    const addPostFormik = useFormik({
        initialValues: {
            Image: null,
            Title: "",
            ClientId: UserId,
            ProfileId: ProfileId,
            Description: "",
            CategoryName: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(addPost(values));
            if (addPost.fulfilled.match(result)) {
                navigate('/');
                dispatch(getPosts())
                onClose();
            }
        }
    });

    const handleChange = (selectedOption) => {
        addPostFormik.setFieldValue("CategoryName", selectedOption.value);
    };

    const categoryOptions = [
        { value: "steal", label: "Steal" },
        { value: "wood", label: "Wood" },
        { value: "cars", label: "Cars" },
    ];

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

    const customStyles = {
        control: (provided) => ({
            ...provided,
            outline: "none",
            padding: "4px",
        }),
        singleValue: (provided) => ({
            ...provided,
        }),
        menubar: (provided) => ({
            ...provided,
        }),
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-[51]">
            <div className="modal-content w-11/12 md:w-2/3 bg-white border border-gray-300 bg-opacity-95 p-4 px-5 rounded-md shadow-2xl">
                <form onSubmit={addPostFormik.handleSubmit}>
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h2 className="font-semibold text-xl font-rubik text-gray-800">Add New Order</h2>
                        <button type="button" onClick={onClose} className="top-4 right-5 border p-2 rounded-md text-white bg-warning/75 hover:bg-warning duration-300">
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
                        {addPostFormik.errors.Image && addPostFormik.touched.Image && (
                            <div className="text-red-500 text-sm mt-2">{addPostFormik.errors.Image}</div>
                        )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="Title space-y-2 mb-4">
                            <label htmlFor="Title" className="">Title</label>
                            <input
                                onChange={addPostFormik.handleChange}
                                onBlur={addPostFormik.handleBlur}
                                value={addPostFormik.values.Title}
                                type="text" id="Title" name="Title" placeholder="Title" className="w-full rounded-md outline-none p-3 text-sm placeholder-gray-600 border border-gray-300" />
                            {addPostFormik.errors.Title && addPostFormik.touched.Title && (
                                <div className="text-red-500 text-sm mt-2">{addPostFormik.errors.Title}</div>
                            )}
                        </div>
                        <div className="Category space-y-2 mb-4">
                            <label htmlFor="Category" className="">Category</label>
                            <Select
                                styles={customStyles}
                                options={categoryOptions}
                                placeholder="Category"
                                onChange={handleChange}
                            />
                            {addPostFormik.errors.CategoryName && addPostFormik.touched.CategoryName && (
                                <div className="text-red-500 text-sm mt-2">{addPostFormik.errors.CategoryName}</div>
                            )}
                        </div>
                    </div>
                    <div className="desc space-y-2 mb-4">
                        <label htmlFor="Description" className="">Description</label>
                        <textarea
                            name="Description"
                            id="Description"
                            onChange={addPostFormik.handleChange}
                            onBlur={addPostFormik.handleBlur}
                            value={addPostFormik.values.Description}
                            className="w-full h-24 rounded-md outline-none p-3 text-sm placeholder-gray-600 border border-gray-300"
                            placeholder="Description"
                        ></textarea>
                        {addPostFormik.errors.Description && addPostFormik.touched.Description && (
                            <div className="text-red-500 text-sm mt-2">{addPostFormik.errors.Description}</div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 mr-2">Transfer to Section</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddOrderModal.propTypes = {
    onClose: propTypes.func.isRequired
};

export default AddOrderModal;
