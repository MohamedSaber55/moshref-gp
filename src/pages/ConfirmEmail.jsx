import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { TbLoader } from 'react-icons/tb';
import { confirmEmail } from '../store/slices/userSlice';

const ConfirmEmail = () => {
    const state = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = object({
        Email: string().email().required('Email is required'),
        code: string().required('Confirmation code is required'),
    });

    const confirmEmailFormik = useFormik({
        initialValues: {
            Email: "",
            code: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(confirmEmail(values));
                if (confirmEmail.fulfilled.match(result)) {
                    navigate('/login');
                }
            } catch (error) {
            }
        }
    });

    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <form
                onSubmit={confirmEmailFormik.handleSubmit}
                className="flex flex-col justify-center gap-4 px-5 w-full md:w-1/2 m-auto">
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Confirm Email</h1>
                <label htmlFor="email" className='text-xl font-medium'>Email</label>
                <input
                    onBlur={confirmEmailFormik.handleBlur}
                    value={confirmEmailFormik.values.email}
                    onChange={confirmEmailFormik.handleChange}
                    name='Email'
                    type="email"
                    id='Email'
                    className="p-3 border rounded-2xl border-black outline-none bg-transparent"
                    placeholder="Email address" />
                {confirmEmailFormik.errors.Email && confirmEmailFormik.touched.Email &&
                    <div className="py-1 text-warning">{confirmEmailFormik.errors.Email}</div>
                }
                <label htmlFor="code" className='text-xl font-medium mt-5'>Confirmation Code</label>
                <input
                    onBlur={confirmEmailFormik.handleBlur}
                    value={confirmEmailFormik.values.code}
                    onChange={confirmEmailFormik.handleChange}
                    id='code'
                    name='code'
                    type="text"
                    className="w-full p-3 rounded-2xl border border-black outline-none bg-transparent"
                    placeholder="Enter your confirmation code" />
                {confirmEmailFormik.errors.code && confirmEmailFormik.touched.code &&
                    <div className="py-1 text-warning">{confirmEmailFormik.errors.code}</div>
                }
                <button
                    disabled={!(confirmEmailFormik.isValid && confirmEmailFormik.dirty) || state.loading}
                    type='submit'
                    className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>
                    {state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Confirm Email"}
                </button>
                <div className="text-center mt-4">
                    <p>Back to</p>
                    <Link to={`/login`} className='text-main text-sm'>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default ConfirmEmail;
