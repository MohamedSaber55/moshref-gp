import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { TbLoader } from 'react-icons/tb'
import { register } from '../../store/slices/userSlice'

const RegisterAsNormalUser = () => {
    const [passType, setPassType] = useState(true)
    const dispatch = useDispatch(); // Initialize dispatch
    const state = useSelector(state => state.user)
    const navigate = useNavigate()
    const validationSchema = object({
        FName: string().required(),
        LName: string().required(),
        UserName: string().required(),
        PhoneNumber: string().required(),
        Email: string().email().required(),
        Password: string().required(),
        ConfirmPassword: string().required(),
    });

    const registerNormalUser = useFormik({
        initialValues: {
            FName: "",
            LName: "",
            UserName: "",
            PhoneNumber: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            RegisteredAs: "User",
        },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(register(values));
            if (register.fulfilled.match(result)) {
                navigate('/confirmEmail');
            }
        }
    });

    return (
        <div className='flex justify-center items-center flex-col'>
            <form
                onSubmit={registerNormalUser.handleSubmit} className="flex flex-col justify-center gap-4 px-5 md:w-1/2 m-auto">
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Register As Normal User</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="FName" className='text-xl font-medium'>First name</label>
                        <input onBlur={registerNormalUser.handleBlur}
                            value={registerNormalUser.values.FName}
                            onChange={registerNormalUser.handleChange} name='FName' type="text" id='FName' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="First Name" />
                        {registerNormalUser.errors.FName && registerNormalUser.touched.FName ?
                            <div className=" py-1 text-warning">{registerNormalUser.errors.FName}</div>
                            : ""
                        }
                    </div>
                    <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="LName" className='text-xl font-medium'>Second name</label>
                        <input onBlur={registerNormalUser.handleBlur}
                            value={registerNormalUser.values.LName}
                            onChange={registerNormalUser.handleChange} name='LName' type="text" id='LName' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Second Name" />
                        {registerNormalUser.errors.LName && registerNormalUser.touched.LName ?
                            <div className=" py-1 text-warning">{registerNormalUser.errors.LName}</div>
                            : ""
                        }
                    </div>
                </div>
                <label htmlFor="UserName" className='text-xl font-medium'>UserName</label>
                <input onBlur={registerNormalUser.handleBlur}
                    value={registerNormalUser.values.UserName}
                    onChange={registerNormalUser.handleChange} name='UserName' type="text" id='UserName' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="UserName" />
                {registerNormalUser.errors.UserName && registerNormalUser.touched.UserName ?
                    <div className=" py-1 text-warning">{registerNormalUser.errors.UserName}</div>
                    : ""
                }
                <label htmlFor="PhoneNumber" className='text-xl font-medium'>PhoneNumber</label>
                <input onBlur={registerNormalUser.handleBlur}
                    value={registerNormalUser.values.PhoneNumber}
                    onChange={registerNormalUser.handleChange} name='PhoneNumber' type="text" id='PhoneNumber' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="PhoneNumber" />
                {registerNormalUser.errors.PhoneNumber && registerNormalUser.touched.PhoneNumber ?
                    <div className=" py-1 text-warning">{registerNormalUser.errors.PhoneNumber}</div>
                    : ""
                }
                <label htmlFor="Email" className='text-xl font-medium'>Email</label>
                <input onBlur={registerNormalUser.handleBlur}
                    value={registerNormalUser.values.Email}
                    onChange={registerNormalUser.handleChange} name='Email' type="email" id='Email' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Email address" />
                {registerNormalUser.errors.Email && registerNormalUser.touched.Email ?
                    <div className=" py-1 text-warning">{registerNormalUser.errors.Email}</div>
                    : ""
                }
                <label htmlFor="Password" className='text-xl font-medium mt-5'>Password</label>
                <div className="w-full relative ">
                    <input onBlur={registerNormalUser.handleBlur}
                        value={registerNormalUser.values.Password}
                        onChange={registerNormalUser.handleChange} id='Password' name='Password' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Enter your Password" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {registerNormalUser.errors.Password && registerNormalUser.touched.Password ?
                    <div className=" py-1 text-warning">{registerNormalUser.errors.Password}</div> : ""}
                <label htmlFor="ConfirmPassword" className='text-xl font-medium mt-5'>ConfirmPassword</label>
                <div className="w-full relative ">
                    <input onBlur={registerNormalUser.handleBlur}
                        value={registerNormalUser.values.ConfirmPassword}
                        onChange={registerNormalUser.handleChange} id='ConfirmPassword' name='ConfirmPassword' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Enter your ConfirmPassword" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {registerNormalUser.errors.ConfirmPassword && registerNormalUser.touched.ConfirmPassword ?
                    <div className=" py-1 text-warning">{registerNormalUser.errors.ConfirmPassword}</div> : ""}
                <button disabled={registerNormalUser.isValid && registerNormalUser.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Register"}</button>
                <div className="text-center mt-4">
                    <p>have account ?</p>
                    <Link to={`/login`} className='text-main text-sm'>Sign in</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterAsNormalUser
