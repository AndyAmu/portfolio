import React, { useState } from 'react';
import './styles/Sidebar.css';
import { useLanguage } from '../context/LanguageContext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logoWhite from './image/white.png';

const Sidebar = () => {
  const { language, toggleLanguage } = useLanguage();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    const container = document.querySelector('.main-content-area');
    if (element && container) {
      container.scrollTo({
        top: element.offsetTop - 40,
        behavior: 'smooth'
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`slim-sidebar dark ${isExpanded ? 'expanded' : ''}`}>
      
      <button 
        className="sidebar-toggle-btn desktop-toggle" 
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        {isExpanded ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
      </button>

      <button 
        className="sidebar-toggle-btn mobile-toggle" 
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? "Close Menu" : "Open Menu"}
      >
        {isExpanded ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div className="sidebar-top">
        <div className="sidebar-logo">
          <img 
            src={logoWhite} 
            alt="Logo" 
            className="icon" 
            style={{ width: '24px', height: '24px', objectFit: 'contain' }} 
          />
          <span className="nav-text">Andrés Amuchástegui</span>
        </div>
        <div className="sidebar-nav">
          <button className="nav-item active" onClick={() => handleScroll('home')}>
            <HomeOutlinedIcon fontSize="small" className="icon" />
            <span className="nav-text">{language === 'en' ? 'Home' : 'Inicio'}</span>
          </button>
          <button className="nav-item" onClick={() => handleScroll('about')}>
            <PersonOutlineOutlinedIcon fontSize="small" className="icon" />
            <span className="nav-text">{language === 'en' ? 'About Me' : 'Sobre Mí'}</span>
          </button>
          <button className="nav-item" onClick={() => handleScroll('services')}>
            <SettingsOutlinedIcon fontSize="small" className="icon" />
            <span className="nav-text">{language === 'en' ? 'Services' : 'Servicios'}</span>
          </button>
          <button className="nav-item" onClick={() => handleScroll('projects')}>
            <WorkOutlineOutlinedIcon fontSize="small" className="icon" />
            <span className="nav-text">{language === 'en' ? 'Projects' : 'Proyectos'}</span>
          </button>
          <button className="nav-item" onClick={() => handleScroll('contact')}>
            <MailOutlineOutlinedIcon fontSize="small" className="icon" />
            <span className="nav-text">{language === 'en' ? 'Contact' : 'Contacto'}</span>
          </button>
        </div>
      </div>
      
      <div className="sidebar-bottom">
        <a href="https://github.com/AndyAmu" target="_blank" rel="noreferrer" className="nav-item">
          <GitHubIcon fontSize="small" className="icon" />
          <span className="nav-text">GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/" target="_blank" rel="noreferrer" className="nav-item">
          <LinkedInIcon fontSize="small" className="icon" />
          <span className="nav-text">LinkedIn</span>
        </a>
        <a href="https://www.instagram.com/andres_amuchastegui/" target="_blank" rel="noreferrer" className="nav-item">
          <InstagramIcon fontSize="small" className="icon" />
          <span className="nav-text">Instagram</span>
        </a>
        <a href="https://www.youtube.com/@andresamuchastegui" target="_blank" rel="noreferrer" className="nav-item">
          <YouTubeIcon fontSize="small" className="icon" />
          <span className="nav-text">YouTube</span>
        </a>

        <button className="nav-item lang-toggle" onClick={toggleLanguage}>
          <span className="icon">{language === 'en' ? 'ES' : 'EN'}</span>
          <span className="nav-text">{language === 'en' ? 'Spanish' : 'English'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
