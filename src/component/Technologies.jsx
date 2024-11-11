import React from "react";
import "./styles/technologies.css"
import MagentoLogo from './image/magento-2-logo.svg';
import Xml from './image/xml.png';


function Technologies() {
    return (
        <div className="tech-container">
            <div className="tech-title">
                <h1>Technologies</h1>
            </div>
            <div className="img-container">
                <img src="https://i.imgur.com/0FaVJay.png" alt="react" />
                <img src="https://i.imgur.com/S3mmmfw.png" alt="html" />
                <img src="https://i.imgur.com/Yj7DNj8.png" alt="css" />
                <img src="https://i.imgur.com/4pBXhIi.png" alt="react-native" />
                <img src="https://i.imgur.com/IDFdqFJ.png" alt="javascript" />
                <img src="https://i.imgur.com/AmXk8Vi.png" alt="redux" />
                <img src="https://i.imgur.com/2THVOP5.png" alt="nodejs" />
                <img src="https://i.imgur.com/NmKQPAz.png" alt="expressjs" />
                <img src="https://i.imgur.com/4ggiK0U.png" alt="mongoDB" />
                <img src="https://i.imgur.com/RVsMO1u.png" alt="git" />
                <img src="https://i.imgur.com/u1cm4oO.png" alt="github" />
                <img src="https://i.imgur.com/my2LijG.png" alt="bootstrap" />
                <img src={MagentoLogo} alt="Magento 2 Logo" />
                <img src={Xml} alt="xml-logo" />
            </div>
        </div>
    )


}

export default Technologies