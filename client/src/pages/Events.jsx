import React from 'react';
import Post from '../components/Post';
import Pagination from '../components/Pagination';

const Events = () => {
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

                <Post />
                <Post />
                <Post />
                <Post />
                <Post />

                <Pagination />
            </div>
        </div>
    );
};

export default Events;