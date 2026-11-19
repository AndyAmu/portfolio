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
  const { language, toggleLanguage, translations } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState('home');

  const handleScroll = (id) => {
    setActiveId(id);
    const element = document.getElementById(id);
    const container = document.querySelector('.main-content-area');

    if (element && container) {
      container.scrollTo({
        top: Math.max(0, element.offsetTop - 32),
        behavior: 'smooth',
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.innerWidth <= 768) {
      setIsExpanded(false);
    }
  };

  return (
    <aside
      className={`slim-sidebar dark ${isExpanded ? 'expanded' : ''}`}
      aria-label={language === 'en' ? 'Sidebar navigation' : 'Barra de navegación lateral'}
    >
      <button
        type="button"
        className="sidebar-toggle-btn desktop-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isExpanded ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
      </button>

      <button
        type="button"
        className="sidebar-toggle-btn mobile-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Close navigation menu' : 'Open navigation menu'}
      >
        {isExpanded ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div className="sidebar-top">
        <div className="sidebar-logo">
          <img
            src={logoWhite}
            alt="Andrés Amuchástegui Logo"
            className="icon"
            width={24}
            height={24}
            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
          />
          <span className="nav-text">Andrés Amuchástegui</span>
        </div>

        <nav
          className="sidebar-nav"
          aria-label={language === 'en' ? 'Primary sections' : 'Secciones principales'}
        >
          <button
            type="button"
            className={`nav-item ${activeId === 'home' ? 'active' : ''}`}
            onClick={() => handleScroll('home')}
            aria-label={translations.home}
          >
            <HomeOutlinedIcon fontSize="small" className="icon" aria-hidden="true" />
            <span className="nav-text">{translations.home}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeId === 'about' ? 'active' : ''}`}
            onClick={() => handleScroll('about')}
            aria-label={translations.about}
          >
            <PersonOutlineOutlinedIcon fontSize="small" className="icon" aria-hidden="true" />
            <span className="nav-text">{translations.about}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeId === 'services' ? 'active' : ''}`}
            onClick={() => handleScroll('services')}
            aria-label={translations.services}
          >
            <SettingsOutlinedIcon fontSize="small" className="icon" aria-hidden="true" />
            <span className="nav-text">{translations.services}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeId === 'projects' ? 'active' : ''}`}
            onClick={() => handleScroll('projects')}
            aria-label={translations.projects}
          >
            <WorkOutlineOutlinedIcon fontSize="small" className="icon" aria-hidden="true" />
            <span className="nav-text">{translations.projects}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeId === 'contact' ? 'active' : ''}`}
            onClick={() => handleScroll('contact')}
            aria-label={translations.contact}
          >
            <MailOutlineOutlinedIcon fontSize="small" className="icon" aria-hidden="true" />
            <span className="nav-text">{translations.contact}</span>
          </button>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <a
          href="https://github.com/AndyAmu"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
          aria-label="GitHub"
        >
          <GitHubIcon fontSize="small" className="icon" aria-hidden="true" />
          <span className="nav-text">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
          aria-label="LinkedIn"
        >
          <LinkedInIcon fontSize="small" className="icon" aria-hidden="true" />
          <span className="nav-text">LinkedIn</span>
        </a>
        <a
          href="https://www.instagram.com/andres_amuchastegui/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
          aria-label="Instagram"
        >
          <InstagramIcon fontSize="small" className="icon" aria-hidden="true" />
          <span className="nav-text">Instagram</span>
        </a>
        <a
          href="https://www.youtube.com/@andresamuchastegui"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item"
          aria-label="YouTube"
        >
          <YouTubeIcon fontSize="small" className="icon" aria-hidden="true" />
          <span className="nav-text">YouTube</span>
        </a>

        <button
          type="button"
          className="nav-item lang-toggle"
          onClick={toggleLanguage}
          aria-label={language === 'en' ? 'Switch language to Spanish' : 'Cambiar idioma a Inglés'}
        >
          <span className="icon">{language === 'en' ? 'ES' : 'EN'}</span>
          <span className="nav-text">{language === 'en' ? 'Spanish' : 'English'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
