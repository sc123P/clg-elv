import React from 'react';
import Post from '../components/Post';
import Pagination from '../components/Pagination';

const Projects = () => {
    return (
        <div className="projects">
            <div className="projectsContainer">
                <div className="projectsTop">
                    <div className="projectsTopText">
                        <h1>PROJETS</h1>
                    </div>
                    <div className="projectsTopBlack">
                        <img src="/trianglebgcopie2.png" alt="" />
                    </div>
                </div>

                <Post />

                <Pagination />
            </div>
        </div>
    );
};

export default Projects;