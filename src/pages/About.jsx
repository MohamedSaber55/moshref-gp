/* eslint-disable react/no-unescaped-entities */
import missionImage from '../assets/massion.jpg'; // Add path to your images
import howItWorksImage from './../assets/Processing-bro.svg'; // Add path to your images
import whyChooseUsImage from './../assets/Questions-bro.svg'; // Add path to your images

const About = () => {
    return (
        <div className="container mx-auto my-8 p-4">
            <h1 className="text-4xl font-bold text-main mb-6 text-center">About Us</h1>

            <div className="mb-10">
                <img src={missionImage} alt="Our Mission" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h2 className="text-3xl font-semibold text-second mb-2">Our Mission</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Welcome to our platform! We connect users who have items in need of repair with skilled craftsmen who can fix them. Our mission is to make the process of finding a reliable craftsman quick and easy. Whether it's a broken appliance, a piece of furniture that needs restoration, or any other item, our platform allows you to post details about what you need fixed and receive offers from local craftsmen.
                </p>
            </div>

            <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <img src={howItWorksImage} alt="How It Works" className="w-full h-80 object-fill rounded-lg" />
                <div className="">
                    <h2 className="text-3xl font-semibold text-second mb-2">How It Works</h2>
                    <ol className="list-decimal list-inside text-lg leading-relaxed mb-4 space-y-3">
                        <li>Create a post with details about the item you need fixed.</li>
                        <li>Local craftsmen will see your post and can offer their services.</li>
                        <li>Review offers and choose the best craftsman for the job.</li>
                        <li>Communicate with the chosen craftsman to finalize the details.</li>
                        <li>Schedule a time for the craftsman to complete the repair.</li>
                        <li>Leave a review to help others make informed decisions.</li>
                        <li>Pay securely through our platform once the job is completed to your satisfaction.</li>
                    </ol>

                </div>
            </div>

            <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="">
                    <h2 className="text-3xl font-semibold text-second mb-2">Why Choose Us?</h2>
                    <ul className="list-disc list-inside text-lg leading-relaxed mb-4">
                        <li>Easy to use platform</li>
                        <li>Connect with skilled local craftsmen</li>
                        <li>Transparent pricing and reviews</li>
                        <li>Secure and reliable service</li>
                    </ul>
                    <p className="text-lg leading-relaxed">
                        Thank you for choosing our platform. We are committed to providing the best service possible. If you have any questions or need assistance, please contact us.
                    </p>
                </div>
                <img src={whyChooseUsImage} alt="Why Choose Us" className="w-full h-80 object-fill rounded-lg " />
            </div>
        </div>
    );
};

export default About;
