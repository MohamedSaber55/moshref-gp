import { useDispatch, useSelector } from "react-redux";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { useEffect } from "react";
import { getTeamMembers } from "../store/slices/teamSlice";

const Team = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.team);
    const team = state.team;

    useEffect(() => {
        dispatch(getTeamMembers());
    }, [dispatch]);

    return (
        <div>
            <div className="container py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {team?.map((member) => (
                        <div key={member.id} className="member border shadow-lg">
                            <div className="image h-80">
                                <img src={`data:image/png;base64,${member.image}`} className="w-full h-full object-cover object-center" alt={member.name} />
                            </div>
                            <div className="content border-t px-4 py-2 text-center space-y-2">
                                <h2 className="text-xl font-medium">{member.name}</h2>
                                <p className="text-base text-gray-700">{member.specialty}</p>
                                <div className="social flex items-center gap-4 justify-center">
                                    {member.facebookAccount && (
                                        <a href={member.facebookAccount} className="bg-white p-2 rounded-full border border-blue-600">
                                            <FaFacebookF className="text-blue-600 hover:text-blue-700 transition duration-300" size={16} aria-label="facebook link" />
                                        </a>
                                    )}
                                    {member.linkedInAccount && (
                                        <a href={member.linkedInAccount} className="bg-white p-2 rounded-full border border-blue-700">
                                            <FaLinkedinIn className="text-blue-700 hover:text-blue-800 transition duration-300" size={16} aria-label="linkedin link" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;