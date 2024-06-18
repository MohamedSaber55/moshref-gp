import { useState } from "react"
import RegisterAsNormalUser from "../components/Register/RegisterAsNormalUser"
import RegisterAsCraftsman from "../components/Register/RegisterAsCraftsman"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Register = () => {
    const [activeTab, setActiveTab] = useState("normalUser")
    const state = useSelector(state => state.user)
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    if (state.token) return <Navigate to="/" replace={true} />

    return (
        <div>
            <div className="flex gap-3 text-sm py-4 justify-center">
                <button onClick={() => setActiveTab("normalUser")} className={classNames(activeTab === "normalUser" ? 'border-main text-main  ' : '',
                    'p-3 rounded-md border text-center')}>
                    Normal User
                </button>
                <button onClick={() => setActiveTab("craftsman")} className={classNames(activeTab === "craftsman" ? 'border-main text-main' : '',
                    'p-3 rounded-md border text-center')}>
                    Crafts man
                </button>
            </div>
            <div className="">
                {activeTab === "normalUser" && <div className="my-3">
                    <RegisterAsNormalUser />
                </div>}
                {activeTab === "craftsman" && <div className="my-3">
                    <RegisterAsCraftsman />
                </div>}
            </div>
        </div>
    )
}

export default Register