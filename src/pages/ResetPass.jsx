import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { object, ref, string } from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ResetPass = () => {
    const [passType, setPassType] = useState(true);
    const state = useSelector(state => state.user);

    const validationSchema = object({
        Code: string().required("Code is required"),
        Email: string().email("Invalid email address").required("Email is required"),
        NewPassword: string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)*([@$!%*#?&])*[A-Za-z\d@$!%*#?&.]{6,32}$/,
                "Password must be 6-32 characters long and can contain special characters"
            )
            .required("New Password is required"),
        ConfirmPassword: string()
            .oneOf([ref("NewPassword")], "Password and Confirm Password must match")
            .required("Confirm Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            NewPassword: "",
            ConfirmPassword: "",
            Code: "",
            Email: "",
        },
        validationSchema,
        onSubmit: async (values) => {
        },
    });

    if (state.token) return <Navigate to="/" replace={true} />;

    return (
        <div className='flex justify-center items-center flex-col py-5 min-h-screen'>
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-center gap-4 px-5 w-full md:w-1/2 m-auto"
            >
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Reset Password</h1>
                <label htmlFor="email" className='text-xl font-medium mt-5'>Email</label>
                <input
                    onBlur={formik.handleBlur}
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    id='Email'
                    name='Email'
                    type='email'
                    className="w-full p-3 rounded-2xl border border-black dark:border-light outline-none bg-transparent"
                    placeholder="Enter your email"
                />
                {formik.errors.Email && formik.touched.Email ? (
                    <div className="py-1 text-warning">{formik.errors.Email}</div>
                ) : ""}

                <label htmlFor="code" className='text-xl font-medium mt-5'>Verification Code</label>
                <input
                    onBlur={formik.handleBlur}
                    value={formik.values.Code}
                    onChange={formik.handleChange}
                    id='Code'
                    name='Code'
                    type='text'
                    className="w-full p-3 rounded-2xl border border-black dark:border-light outline-none bg-transparent"
                    placeholder="Enter your verification code"
                />
                {formik.errors.Code && formik.touched.Code ? (
                    <div className="py-1 text-warning">{formik.errors.Code}</div>
                ) : ""}

                <label htmlFor="newPassword" className='text-xl font-medium mt-5'>New Password</label>
                <div className="w-full relative">
                    <input
                        onBlur={formik.handleBlur}
                        value={formik.values.NewPassword}
                        onChange={formik.handleChange}
                        id='NewPassword'
                        name='NewPassword'
                        type={passType ? "password" : "text"}
                        className="w-full p-3 rounded-2xl border border-black dark:border-light outline-none bg-transparent"
                        placeholder="Enter your new password"
                    />
                    <button
                        type='button'
                        className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main'
                        onClick={() => setPassType(!passType)}
                    >
                        {!passType ? <BsEyeSlash /> : <BsEye />}
                    </button>
                </div>
                {formik.errors.NewPassword && formik.touched.NewPassword ? (
                    <div className="py-1 text-warning">{formik.errors.NewPassword}</div>
                ) : ""}

                <label htmlFor="confirmPassword" className='text-xl font-medium mt-5'>Confirm New Password</label>
                <div className="w-full relative">
                    <input
                        onBlur={formik.handleBlur}
                        value={formik.values.ConfirmPassword}
                        onChange={formik.handleChange}
                        id='ConfirmPassword'
                        name='ConfirmPassword'
                        type={passType ? "password" : "text"}
                        className="w-full p-3 rounded-2xl border border-black dark:border-light outline-none bg-transparent"
                        placeholder="Re-enter your new password"
                    />
                    <button
                        type='button'
                        className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main'
                        onClick={() => setPassType(!passType)}
                    >
                        {!passType ? <BsEyeSlash /> : <BsEye />}
                    </button>
                </div>
                {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword ? (
                    <div className="py-1 text-warning">{formik.errors.ConfirmPassword}</div>
                ) : ""}

                <button
                    disabled={!formik.isValid || !formik.dirty}
                    type='submit'
                    className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center ${!formik.isValid || !formik.dirty ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Confirm
                </button>
            </form>
        </div>
    );
}

export default ResetPass;
