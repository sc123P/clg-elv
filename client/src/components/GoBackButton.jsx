import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IoIosArrowBack } from 'react-icons/io';

const GoBackButton = () => {
    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
            <button onClick={goBack} className={`gbButton ${isScrolled ? 'scrolled' : ''}`}>
                <IoIosArrowBack />
            </button>
    );
};

export default GoBackButton;