
import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { TbLoader } from 'react-icons/tb'

const RegisterAsCraftsman = () => {
    const [passType, setPassType] = useState(true)
    const state = useSelector(state => state.user)

    const validationSchema = object({
        first_name: string().email().required(),
        last_name: string().email().required(),
        phone: string().email().required(),
        email: string().email().required(),
        password: string().required(),
        profession: string().required(),
    });

    const registerCraftsman = useFormik({
        initialValues: {
            first_name: "",
            second_name: "",
            phone: "",
            email: "",
            password: "",
            profession: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    })


    return (
        <div className='flex justify-center items-center flex-col'>
            <form
                onSubmit={registerCraftsman.handleSubmit} className="flex flex-col justify-center gap-4 px-5 md:w-1/2 m-auto">
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Register As Craftsman</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="first_name" className='text-xl font-medium'>First name</label>
                        <input onBlur={registerCraftsman.handleBlur}
                            value={registerCraftsman.values.first_name}
                            onChange={registerCraftsman.handleChange} name='first_name' type="text" id='first_name' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="First Name" />
                        {registerCraftsman.errors.first_name && registerCraftsman.touched.first_name ?
                            <div className=" py-1 text-warning">{registerCraftsman.errors.first_name}</div>
                            : ""
                        }
                    </div>
                    <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="last_name" className='text-xl font-medium'>Last name</label>
                        <input onBlur={registerCraftsman.handleBlur}
                            value={registerCraftsman.values.last_name}
                            onChange={registerCraftsman.handleChange} name='last_name' type="text" id='last_name' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="First Name" />
                        {registerCraftsman.errors.last_name && registerCraftsman.touched.last_name ?
                            <div className=" py-1 text-warning">{registerCraftsman.errors.last_name}</div>
                            : ""
                        }
                    </div>
                </div>
                <label htmlFor="phone" className='text-xl font-medium'>Phone</label>
                <input onBlur={registerCraftsman.handleBlur}
                    value={registerCraftsman.values.phone}
                    onChange={registerCraftsman.handleChange} name='phone' type="text" id='phone' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="First Name" />
                {registerCraftsman.errors.phone && registerCraftsman.touched.phone ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.phone}</div>
                    : ""
                }
                <label htmlFor="email" className='text-xl font-medium'>Email</label>
                <input onBlur={registerCraftsman.handleBlur}
                    value={registerCraftsman.values.email}
                    onChange={registerCraftsman.handleChange} name='email' type="email" id='email' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Email address" />
                {registerCraftsman.errors.email && registerCraftsman.touched.email ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.email}</div>
                    : ""
                }
                <label htmlFor="password" className='text-xl font-medium mt-5'>Password</label>
                <div className="w-full relative ">
                    <input onBlur={registerCraftsman.handleBlur}
                        value={registerCraftsman.values.password}
                        onChange={registerCraftsman.handleChange} id='password' name='password' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Enter your password" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {registerCraftsman.errors.password && registerCraftsman.touched.password ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.password}</div> : ""}
                <label htmlFor="profession" className='text-xl font-medium'>Profession</label>
                <input onBlur={registerCraftsman.handleBlur}
                    value={registerCraftsman.values.profession}
                    onChange={registerCraftsman.handleChange} name='profession' type="text" id='profession' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Profession" />
                {registerCraftsman.errors.profession && registerCraftsman.touched.profession ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.profession}</div>
                    : ""
                }
                <button disabled={registerCraftsman.isValid && registerCraftsman.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Register"}</button>
                <div className="text-center mt-4">
                    <p>have account ?</p>
                    <Link to={`/login`} className='text-main text-sm'>Sign in</Link>
                </div>
            </form>

        </div>
    )
}


export default RegisterAsCraftsman