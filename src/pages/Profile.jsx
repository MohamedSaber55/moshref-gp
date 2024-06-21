import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../store/slices/profileSlice";
import moment from "moment";
import { Link } from "react-router-dom";

const Profile = () => {
    const { profile, loading } = useSelector(state => ({
        profile: state.profile.profile,
        loading: state.profile.loading
    }));
    const authState = useSelector(state => state.user);
    const profileId = authState.ProfileId;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile(profileId));
    }, [dispatch, profileId]);

    if (loading || !profile) {
        return (
            <div className="container mx-auto mt-8 flex flex-col items-center justify-center h-screen">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-t-4 bg-gray-200 rounded-full border-main spin" role="status"></div>
                <div className="text-center text-gray-600 text-lg mt-4">Loading...</div>
            </div>
        )
    }

    return (
        <div className="bg-light dark:bg-dark-light text-dark dark:text-light min-h-screen transition-colors duration-500">
            <div className="container mx-auto py-5 space-y-5">
                <div className="bg-white dark:bg-dark p-3 rounded-md">
                    <div className="userInfo flex flex-col justify-center text-center items-center gap-3">
                        <div className="image h-28 aspect-square border-2 rounded-full overflow-hidden">
                            <img src={`data:image/png;base64,${profile.backgroundImage}`} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="info">
                            <h2 className="text-2xl font-bold">{profile?.posts && profile.posts.length > 0 ? profile.posts[0]?.fullName : ""}</h2>
                            <p className="text-gray">{profile.hintAboutMe}</p>
                            <p className="text-gray">{profile.profession}</p>
                            <p className="text-gray">{profile.age} years</p>
                            <p className="text-gray">{profile.address}</p>
                            <p className="text-gray">{profile.email}</p>
                        </div>
                    </div>
                </div>
                <div className="posts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {profile.posts?.length > 0 && profile.posts.map((post, i) => (
                        <Link to={`/orders/${post.id}`} key={i} className="relative overflow-hidden border rounded-lg bg-white dark:bg-dark p-3">
                            <img src={`data:image/png;base64,${post.image}`} className="w-full h-48 object-cover rounded-t-lg" alt="" />
                            <div className="p-4">
                                <p className="text-sm text-gray-600">{moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                <p className="text-lg font-semibold mb-2">{post.title}</p>
                                <p className="text-gray-700 line-clamp-2">{post.description}</p>
                                <div className="flex justify-between mt-4">
                                    <div className="flex items-center">
                                        <img src={`data:image/png;base64,${profile.backgroundImage}`} className="w-8 h-8 rounded-full mr-2 object-cover" alt="" />
                                        <p className="text-sm">{post.fullName}</p>
                                    </div>
                                    {/* <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-400">{post.likes} Likes</span>
                                        <span className="text-xs text-gray-400">{post.comments} Comments</span>
                                    </div> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
