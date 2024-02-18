import { useFormik } from "formik";
import { object, string } from "yup";

const ForgetPass = () => {

    const validationSchema = object({
        phone: string().required(),
        code: string().required(),
    });

    const forgetPassFormik = useFormik({
        initialValues: {
            phone: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    })

    return (
        <div className='flex justify-center items-center flex-col h-screen'>
            <form
                onSubmit={forgetPassFormik.handleSubmit} className="flex flex-col justify-center gap-4 px-5 w-full md:w-1/2 m-auto">
                <h1 className="text-4xl text-main font-bold mb-5 text-center">Forget Password</h1>
                <label htmlFor="phone" className='text-xl font-medium'>Phone</label>
                <input onBlur={forgetPassFormik.handleBlur}
                    value={forgetPassFormik.values.phone}
                    onChange={forgetPassFormik.handleChange}
                    name='phone' type="string" id='phone' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Phone" />
                {forgetPassFormik.errors.phone && forgetPassFormik.touched.phone ?
                    <div className=" py-1 text-warning">{forgetPassFormik.errors.phone}</div>
                    : ""
                }
                <button type="button" className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>Send Code</button>
                <label htmlFor="code" className='text-xl font-medium'>Code</label>
                <input onBlur={forgetPassFormik.handleBlur}
                    value={forgetPassFormik.values.code}
                    onChange={forgetPassFormik.handleChange}
                    name='code' type="string" id='code' className="p-3 border rounded-2xl border-black outline-none bg-transparent" placeholder="Code" />
                {forgetPassFormik.errors.code && forgetPassFormik.touched.code ?
                    <div className=" py-1 text-warning">{forgetPassFormik.errors.code}</div>
                    : ""
                }
                <button type='button' className={`p-3 w-56 m-auto text-sm bg-main hover:bg-transparent  text-white rounded-3xl border border-main uppercase font-medium hover:text-main duration-150 flex justify-center`}>Done</button>
            </form>

        </div >
    )
}

export default ForgetPass