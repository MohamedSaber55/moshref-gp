import { team } from "./../data/team.json"
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6"

const Team = () => {
    return (
        <div>
            <div className="container py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {team?.map(member => (
                        <div key={member.id} className="member border shadow-lg">
                            <div className="image">
                                <img src={member.image} className="w-full" alt="" />
                            </div>
                            <div className="content border-t px-4 py-2 text-center space-y-2">
                                <h2 className="text-xl font-medium">{member.name}</h2>
                                <p className="text-base text-gray-700">{member.work}</p>
                                <div className="social flex items-center gap-4 justify-center">
                                    <a href={member?.social?.facebook} className='bg-white p-2 rounded-full border border-blue-600'>
                                        <FaFacebookF className='text-blue-600 hover:text-blue-700 transition duration-300' size={16} aria-label="facebook link" />
                                    </a>
                                    <a href={member?.social?.linkedin} className="bg-white p-2 rounded-full border border-blue-700">
                                        <FaLinkedinIn className='text-blue-700 hover:text-blue-800 transition duration-300' size={16} aria-label="facebook link" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Team