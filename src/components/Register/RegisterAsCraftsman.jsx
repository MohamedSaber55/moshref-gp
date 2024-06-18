import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { TbLoader } from 'react-icons/tb';
import { register } from '../../store/slices/userSlice'; // Assuming you have a Redux slice for user actions

const RegisterAsCraftsman = () => {
    const [passType, setPassType] = useState(true);
    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    const navigate = useNavigate();

    const validationSchema = object({
        FName: string().required(),
        LName: string().required(),
        UserName: string().required(),
        PhoneNumber: string().required(),
        Email: string().email().required(),
        Password: string().required(),
        ConfirmPassword: string().required(),
    });

    const registerCraftsman = useFormik({
        initialValues: {
            FName: "",
            LName: "",
            UserName: "",
            PhoneNumber: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            RegisteredAs: "CraftMan",
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
                onSubmit={registerCraftsman.handleSubmit} className="flex flex-col justify-center gap-4 px-5 md:w-1/2 m-auto">
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Register As Normal User</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="FName" className='text-xl font-medium'>First name</label>
                        <input onBlur={registerCraftsman.handleBlur}
                            value={registerCraftsman.values.FName}
                            onChange={registerCraftsman.handleChange} name='FName' type="text" id='FName' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="First Name" />
                        {registerCraftsman.errors.FName && registerCraftsman.touched.FName ?
                            <div className=" py-1 text-warning">{registerCraftsman.errors.FName}</div>
                            : ""
                        }
                    </div>
                    <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="LName" className='text-xl font-medium'>Second name</label>
                        <input onBlur={registerCraftsman.handleBlur}
                            value={registerCraftsman.values.LName}
                            onChange={registerCraftsman.handleChange} name='LName' type="text" id='LName' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Second Name" />
                        {registerCraftsman.errors.LName && registerCraftsman.touched.LName ?
                            <div className=" py-1 text-warning">{registerCraftsman.errors.LName}</div>
                            : ""
                        }
                    </div>
                </div>
                <label htmlFor="UserName" className='text-xl font-medium'>UserName</label>
                <input onBlur={registerCraftsman.handleBlur}
                    value={registerCraftsman.values.UserName}
                    onChange={registerCraftsman.handleChange} name='UserName' type="text" id='UserName' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="UserName" />
                {registerCraftsman.errors.UserName && registerCraftsman.touched.UserName ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.UserName}</div>
                    : ""
                }
                <label htmlFor="PhoneNumber" className='text-xl font-medium'>PhoneNumber</label>
                <input onBlur={registerCraftsman.handleBlur}
                    value={registerCraftsman.values.PhoneNumber}
                    onChange={registerCraftsman.handleChange} name='PhoneNumber' type="text" id='PhoneNumber' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="PhoneNumber" />
                {registerCraftsman.errors.PhoneNumber && registerCraftsman.touched.PhoneNumber ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.PhoneNumber}</div>
                    : ""
                }
                <label htmlFor="Email" className='text-xl font-medium'>Email</label>
                <input onBlur={registerCraftsman.handleBlur}
                    value={registerCraftsman.values.Email}
                    onChange={registerCraftsman.handleChange} name='Email' type="email" id='Email' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Email address" />
                {registerCraftsman.errors.Email && registerCraftsman.touched.Email ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.Email}</div>
                    : ""
                }
                <label htmlFor="Password" className='text-xl font-medium mt-5'>Password</label>
                <div className="w-full relative ">
                    <input onBlur={registerCraftsman.handleBlur}
                        value={registerCraftsman.values.Password}
                        onChange={registerCraftsman.handleChange} id='Password' name='Password' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Enter your Password" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {registerCraftsman.errors.Password && registerCraftsman.touched.Password ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.Password}</div> : ""}
                <label htmlFor="ConfirmPassword" className='text-xl font-medium mt-5'>ConfirmPassword</label>
                <div className="w-full relative ">
                    <input onBlur={registerCraftsman.handleBlur}
                        value={registerCraftsman.values.ConfirmPassword}
                        onChange={registerCraftsman.handleChange} id='ConfirmPassword' name='ConfirmPassword' type={passType ? "password" : "text"} className="w-full p-3 rounded-2xl  border border-black dark:border-light outline-none bg-transparent" placeholder="Enter your ConfirmPassword" />
                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 hover:text-main' onClick={() => setPassType(!passType)}>{!passType ? <BsEyeSlash /> : <BsEye />}</button>
                </div>
                {registerCraftsman.errors.ConfirmPassword && registerCraftsman.touched.ConfirmPassword ?
                    <div className=" py-1 text-warning">{registerCraftsman.errors.ConfirmPassword}</div> : ""}
                <button disabled={registerCraftsman.isValid && registerCraftsman.dirty && !state.loading ? false : true} type='submit' className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>{state.loading ? <><TbLoader className="animate-spin mx-1" size={18} /> Loading...</> : "Register"}</button>
                <div className="text-center mt-4">
                    <p>have account ?</p>
                    <Link to={`/login`} className='text-main text-sm'>Sign in</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterAsCraftsman;
