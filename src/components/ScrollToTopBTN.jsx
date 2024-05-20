import { useState, useEffect } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

const ScrollToTopBTN = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            if (currentPosition > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return visible ? (
        <button className="ScrollToTopBTN border border-main rounded-full p-2 text-main hover:text-slate-50 hover:bg-main duration-300 shadow-sm shadow-green-300 animate-bounce" onClick={handleClick}><MdKeyboardArrowUp size={30} /></button>
    ) : null;
};

export default ScrollToTopBTN;
