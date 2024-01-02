import React, { useEffect } from 'react';
import Pagination from '../components/Pagination';
import GoBackButton from '../components/GoBackButton';

const Orientation = () => {
    useEffect(() =>{
        window.scrollTo(0,0);
    }, []);
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
                <GoBackButton />
                <Pagination />
            </div>
        </div>
    );
};

export default Orientation;