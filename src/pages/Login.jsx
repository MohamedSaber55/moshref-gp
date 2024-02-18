import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { TbLoader } from 'react-icons/tb'

const Login = () => {
    const [passType, setPassType] = useState(true)
    const state = useSelector(state => state.user)

    const validationSchema = object({
        email: string().email().required(),
        password: string().matches(/^(?=.*[A-Za-z])(?=.*\d)*([@$!%*#?&])*[A-Za-z\d@$!%*#?&.]{6,32}$/, "password have to be 6 : 32 character and can contain special characters").required(),
    });

    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    })

    // if (state.token) return <Navigate to="/" replace={true} />

    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <form
                onSubmit={loginFormik.handleSubmit} className="flex flex-col justify-center gap-4 px-5 w-full md:w-1/2 m-auto">
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Login</h1>
                {/* {state.loginError && <div className='text-warning p-2'>{state.loginError}</div>} */}
                <label htmlFor="email" className='text-xl font-medium'>Email</label>
                <input onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.email}
                    onChange={loginFormik.handleChange} name='email' type="email" id='email' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Email address" />
                {loginFormik.errors.email && loginFormik.touched.email ?
                    <div className=" py-1 text-warning">{loginFormik.errors.email}</div>
                    : ""
                }
                <label htmlFor="password" className='text-xl font-medium mt-5'>Password</label>
                <div className="w-full relative ">
                    <input onBlur={loginFormik.handleBlur}
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange} id='password' name='password' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Enter your password" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {loginFormik.errors.password && loginFormik.touched.password ?
                    <div className=" py-1 text-warning">{loginFormik.errors.password}</div> : ""}
                <Link to="/forgetpass" className="text-main text-sm mb-4 hover:text-dark dark:hover:text-light text-right">Forgot your password?</Link>
                <button disabled={loginFormik.isValid && loginFormik.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Login"}</button>
                <div className="text-center mt-4">
                    <p>Don&apos;t have account ?</p>
                    <Link to={`/register`} className='text-main text-sm'>Sign up</Link>
                </div>
            </form>

        </div>
    )
}

export default Login