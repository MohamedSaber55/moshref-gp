import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { object, ref, string } from 'yup'
import { useFormik } from 'formik'

const ResetPass = () => {
    const [passType, setPassType] = useState(true)

    const validationSchema = object({
        newPassword: string().matches(/^(?=.*[A-Za-z])(?=.*\d)*([@$!%*#?&])*[A-Za-z\d@$!%*#?&.]{6,32}$/, "password have to be 6 : 32 character and can contain special characters").required(),
        rePassword: string().oneOf([ref("newPassword")], "Password and Confirm Password must be the same").required(),
    });

    const loginFormik = useFormik({
        initialValues: {
            newPassword: "",
            rePassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    })


    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <form
                onSubmit={loginFormik.handleSubmit} className="flex flex-col justify-center gap-4 px-5 w-full md:w-1/2 m-auto">
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Reset Password</h1>
                <label htmlFor="newPassword" className='text-xl font-medium mt-5'>New Password</label>
                <div className="w-full relative ">
                    <input onBlur={loginFormik.handleBlur}
                        value={loginFormik.values.newPassword}
                        onChange={loginFormik.handleChange} id='newPassword' name='newPassword' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Enter your new password" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {loginFormik.errors.newPassword && loginFormik.touched.newPassword ?
                    <div className=" py-1 text-warning">{loginFormik.errors.newPassword}</div> : ""}
                <label htmlFor="rePassword" className='text-xl font-medium mt-5'>Confirm new Password</label>
                <div className="w-full relative ">
                    <input onBlur={loginFormik.handleBlur}
                        value={loginFormik.values.rePassword}
                        onChange={loginFormik.handleChange} id='rePassword' name='rePassword' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Re-enter your new password again" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {loginFormik.errors.rePassword && loginFormik.touched.rePassword ?
                    <div className=" py-1 text-warning">{loginFormik.errors.rePassword}</div> : ""}
                <button disabled={loginFormik.isValid && loginFormik.dirty ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>Confirm</button>
            </form>
        </div>
    )
}

export default ResetPass