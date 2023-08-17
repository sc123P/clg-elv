import React from 'react';
import Post from '../components/Post';
import Pagination from '../components/Pagination';

const Orientation = () => {
    return (
        <div className="orientation">
            <div className="orientationContainer">
                <div className="orientationTop">
                    <div className="orientationTopText">
                        <h1>ORIENTATION</h1>
                    </div>
                    <div className="orientationTopBlack">
                        <img src="/trianglebgcopie2.png" alt="" />
                    </div>
                </div>

                {/* <Post /> */}

                <Pagination />
            </div>
        </div>
    );
};

export default Orientation;