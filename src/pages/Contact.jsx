import { useFormik } from 'formik';
import { object, string } from 'yup';
import { TbLoader } from 'react-icons/tb';
import contactImage from '../assets/contact.jpg'; // Ensure you have an image in this path

const Contact = () => {
    const validationSchema = object({
        name: string().required('Name is required'),
        email: string().email('Invalid email address').required('Email is required'),
        message: string().required('Message is required'),
    });

    const contactFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema,
        onSubmit: async (values) => {
        }
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="hidden md:block">
                <img src={contactImage} alt="Contact Us" className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={contactFormik.handleSubmit} className="flex flex-col justify-center gap-4 p-8 w-full">
                    <h1 className="text-4xl text-main font-bold mb-5 text-center">Contact Us</h1>
                    <label htmlFor="name" className='text-xl font-medium'>Name</label>
                    <input onBlur={contactFormik.handleBlur}
                        value={contactFormik.values.name}
                        onChange={contactFormik.handleChange} name='name' type="text" id='name' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Your name" />
                    {contactFormik.errors.name && contactFormik.touched.name ?
                        <div className="py-1 text-warning">{contactFormik.errors.name}</div>
                        : ""
                    }

                    <label htmlFor="email" className='text-xl font-medium'>Email</label>
                    <input onBlur={contactFormik.handleBlur}
                        value={contactFormik.values.email}
                        onChange={contactFormik.handleChange} name='email' type="email" id='email' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Your email address" />
                    {contactFormik.errors.email && contactFormik.touched.email ?
                        <div className="py-1 text-warning">{contactFormik.errors.email}</div>
                        : ""
                    }

                    <label htmlFor="message" className='text-xl font-medium'>Message</label>
                    <textarea onBlur={contactFormik.handleBlur}
                        value={contactFormik.values.message}
                        onChange={contactFormik.handleChange} name='message' id='message' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Your message" rows="5"></textarea>
                    {contactFormik.errors.message && contactFormik.touched.message ?
                        <div className="py-1 text-warning">{contactFormik.errors.message}</div>
                        : ""
                    }

                    <button disabled={contactFormik.isValid && contactFormik.dirty ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{contactFormik.isSubmitting ? <><TbLoader className="animate-spin mx-1" size={18} /> Submitting...</> : "Submit"}</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
