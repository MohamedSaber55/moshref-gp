
import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { TbLoader } from 'react-icons/tb'

const RegisterAsNormalUser = () => {
    const [passType, setPassType] = useState(true)
    const state = useSelector(state => state.user)

    const validationSchema = object({
        first_name: string().email().required(),
        last_name: string().email().required(),
        phone: string().email().required(),
        email: string().email().required(),
        password: string().required(),
    });

    const registerNormalUser = useFormik({
        initialValues: {
            first_name: "",
            second_name: "",
            phone: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    })


    return (
        <div className='flex justify-center items-center flex-col'>
            <form
                onSubmit={registerNormalUser.handleSubmit} className="flex flex-col justify-center gap-4 px-5 md:w-1/2 m-auto">
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Register As Normal User</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="firstName" className='text-xl font-medium'>First name</label>
                        <input onBlur={registerNormalUser.handleBlur}
                            value={registerNormalUser.values.firstName}
                            onChange={registerNormalUser.handleChange} name='firstName' type="text" id='firstName' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="First Name" />
                        {registerNormalUser.errors.firstName && registerNormalUser.touched.firstName ?
                            <div className=" py-1 text-warning">{registerNormalUser.errors.firstName}</div>
                            : ""
                        }
                    </div>
                    <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="secondName" className='text-xl font-medium'>Second name</label>
                        <input onBlur={registerNormalUser.handleBlur}
                            value={registerNormalUser.values.secondName}
                            onChange={registerNormalUser.handleChange} name='secondName' type="text" id='secondName' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="First Name" />
                        {registerNormalUser.errors.secondName && registerNormalUser.touched.secondName ?
                            <div className=" py-1 text-warning">{registerNormalUser.errors.secondName}</div>
                            : ""
                        }
                    </div>
                </div>
                <label htmlFor="phone" className='text-xl font-medium'>Phone</label>
                <input onBlur={registerNormalUser.handleBlur}
                    value={registerNormalUser.values.phone}
                    onChange={registerNormalUser.handleChange} name='phone' type="text" id='phone' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="First Name" />
                {registerNormalUser.errors.phone && registerNormalUser.touched.phone ?
                    <div className=" py-1 text-warning">{registerNormalUser.errors.phone}</div>
                    : ""
                }
                <label htmlFor="email" className='text-xl font-medium'>Email</label>
                <input onBlur={registerNormalUser.handleBlur}
                    value={registerNormalUser.values.email}
                    onChange={registerNormalUser.handleChange} name='email' type="email" id='email' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Email address" />
                {registerNormalUser.errors.email && registerNormalUser.touched.email ?
                    <div className=" py-1 text-warning">{registerNormalUser.errors.email}</div>
                    : ""
                }
                <label htmlFor="password" className='text-xl font-medium mt-5'>Password</label>
                <div className="w-full relative ">
                    <input onBlur={registerNormalUser.handleBlur}
                        value={registerNormalUser.values.password}
                        onChange={registerNormalUser.handleChange} id='password' name='password' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Enter your password" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {registerNormalUser.errors.password && registerNormalUser.touched.password ?
                    <div className=" py-1 text-warning">{registerNormalUser.errors.password}</div> : ""}
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