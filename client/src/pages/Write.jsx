import React from 'react';

const Write = () => {
    return (
        <div className="write">
            <div className="writeContent">
                <div className="writeTop">
                    <div className="writeTopText">
                        <h3>ESPACE ADMINISTRATEUR</h3>
                    </div>
                    <div className="hr">
                        <hr />
                    </div>
{/*                    <div className="writeTopBlack">
                        <img src="/circleswhite.png" />
                    </div>*/}
                </div>

                <div className="writeMain">
                    <div className="mainContent">
                        <input type="text" placeholder="Titre" />
                    </div>
                    <div className="menu">
                        <div className="item">i1</div>
                        <div className="item">i2</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;