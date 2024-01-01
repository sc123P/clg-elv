import React, { useEffect } from 'react';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import GoBackButton from '../components/GoBackButton';

const Events = () => {
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);


    return (
        <div className="events">
            <div className="eventsContainer">
                <div className="eventsTop">
                    <div className="eventsTopText">
                        <h1>EVENEMENTS</h1>
                    </div>
                    <div className="eventsTopBlack">
                        <img src="/trianglebgcopie2.png" alt="" />
                    </div>
                </div>
                <GoBackButton />
                <Pagination />
            </div>
        </div>
    );
};

export default Events;