import React from "react";
import "./styles/technologies.css"
import MagentoLogo from './image/magento-2-logo.svg';
import Xml from './image/xml.png';
import GptLogo from './image/gptLogo.webp';
import DeepSeck from './image/deepseek.svg';
import NodeJS from './image/nodeJS.png';
import Suparbase from './image/supabase.png';
import { useLanguage } from '../context/LanguageContext';


function Technologies() {
    const { translations } = useLanguage();
    return (
        <div className="tech-container">
            <div className="tech-title">
                <h1>{translations.technologies}</h1>
            </div>
            <div className="img-container">
                <img src="https://i.imgur.com/S3mmmfw.png" alt="html" />
                <img src="https://i.imgur.com/Yj7DNj8.png" alt="css" />
                <img src="https://i.imgur.com/IDFdqFJ.png" alt="javascript" />
                <img src="https://i.imgur.com/0FaVJay.png" alt="react" />
                <img src="https://i.imgur.com/NmKQPAz.png" alt="expressjs" />
                <img src="https://i.imgur.com/AmXk8Vi.png" alt="redux" />
                <img src={NodeJS} alt="nodejs" />
                <img src="https://i.imgur.com/4ggiK0U.png" alt="mongoDB" />
                <img src={Suparbase} alt="" />
                <img src="https://i.imgur.com/RVsMO1u.png" alt="git" />
                <img src={MagentoLogo} alt="Magento 2 Logo" />
                <img src={Xml} alt="xml-logo" />
                <img src={DeepSeck} alt="DeepSeck" />
                <img src={GptLogo} alt="gpt-logo" />
            </div>
        </div>
    )


}

export default Technologies