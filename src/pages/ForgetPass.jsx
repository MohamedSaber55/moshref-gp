import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { forgetPass } from "./../store/slices/userSlice";

const ForgetPass = () => {
    const state = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = object({
        email: string().email("Invalid email address").required("Email is required"),
    });

    const forgetPassFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(forgetPass(values.email));
            if (forgetPass.fulfilled.match(result)) {
                navigate('/resetPass');
            }
        }
    });

    if (state.token) return <Navigate to="/" replace={true} />;

    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <form
                onSubmit={forgetPassFormik.handleSubmit}
                className="flex flex-col justify-center gap-4 px-5 w-full md:w-1/2 m-auto"
            >
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Forget Password</h1>
                
                <label htmlFor="email" className='text-xl font-medium'>Email</label>
                <input
                    onBlur={forgetPassFormik.handleBlur}
                    value={forgetPassFormik.values.email}
                    onChange={forgetPassFormik.handleChange}
                    name='email'
                    type="email"
                    id='email'
                    className="p-3 border rounded-2xl border-black outline-none bg-transparent"
                    placeholder="Email"
                />
                {forgetPassFormik.errors.email && forgetPassFormik.touched.email ? (
                    <div className="py-1 text-warning">{forgetPassFormik.errors.email}</div>
                ) : ""}

                <button
                    disabled={!forgetPassFormik.isValid || !forgetPassFormik.dirty}
                    type="submit"
                    className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center ${!forgetPassFormik.isValid || !forgetPassFormik.dirty ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Send Code
                </button>
            </form>
        </div>
    );
}

export default ForgetPass;
