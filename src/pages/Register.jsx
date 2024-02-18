import { useState } from "react"
import RegisterAsNormalUser from "../components/Register/RegisterAsNormalUser"
import RegisterAsCraftsman from "../components/Register/RegisterAsCraftsman"

const Register = () => {
    const [activeTab, setActiveTab] = useState("normalUser")

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
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