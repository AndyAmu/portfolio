import React from "react"
import { Box, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import '../index.css'
import './styles/body.css'
import './styles/dashboardUI.css'
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import ChatComponent from './chatGPT';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ContactEmail from './ContactEmail';
import { useLanguage } from '../context/LanguageContext';
import ScrollFloat from './ScrollFloat';
import GoogleCalendar from './GoogleCalendar';
import profileImg from './image/patagonia-and.webp';
import recommendationsGif from './image/Recommendations.gif';

const Body = () => {
    const { translations, language } = useLanguage();
    
    // URLs de los CVs segun el idioma
    const cvUrls = {
        en: "https://drive.google.com/file/d/1iOtW9YSycHHFacSMtjLtw51ABcntr7aa/view?usp=drive_link",
        es: "https://drive.google.com/file/d/14-FGhRxK-rmz4bc6xiTsU7cX3yq5EbZf/view?usp=sharing"
    };

    return (
        <>

            <Box id="home" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="body">
                <Typography component="div" className="andresamutitle" sx={{ fontFamily: 'Bree Serif', zIndex: 10, color: 'white' }}>
                    <ScrollFloat
                        animationDuration={1}
                        ease='back.inOut(2)'
                        scrollStart='center bottom+=50%'
                        scrollEnd='bottom bottom-=40%'
                        stagger={0.03}
                    >
                        ANDRÉS AMUCHÁSTEGUI
                    </ScrollFloat>
                </Typography>
                <Typography component="div" className="andresamutitle2" sx={{ fontFamily: 'Bree Serif', zIndex: 10, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScrollFloat
                        animationDuration={1}
                        ease='back.inOut(2)'
                        scrollStart='center bottom+=50%'
                        scrollEnd='bottom bottom-=40%'
                        stagger={0.03}
                    >
                        Full Stack Developer | Web | Mobile&nbsp;
                        <ComputerIcon sx={{ fontSize: '2.5rem' }} /> + <PhoneIphoneIcon sx={{ fontSize: '2.2rem' }} />
                    </ScrollFloat>
                </Typography>
                <Box sx={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, gap: 2 }}>
                    <Typography sx={{ fontSize: 50 }}></Typography>
                </Box>
            </Box>
            <Box id="cv" sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} className='body2'>
                <Box sx={{ textAlign: 'center', width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{
                        fontFamily: 'Bree Serif',
                        color: 'white',
                        fontSize: 40
                    }}>
                        {translations.greeting}
                    </Typography>
                    <Typography sx={{
                        fontFamily: 'Bree Serif',
                        color: 'white'
                    }}>
                        {translations.introduction}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{
                            margin: 1,
                            marginTop: 2
                        }}>
                            <a target="_blank" rel="noreferrer" href={cvUrls[language]}>
                                <div className="button" data-tooltip="Size: 253Kb">
                                    <div className="button-wrapper">
                                        <div className="text">{language === 'en' ? translations.downloadEnglishCV : translations.downloadSpanishCV}</div>
                                        <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar
                        className="avatar"
                        alt="Andres Amuchastegui"
                        src={profileImg}
                    />
                    <Typography sx={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: 'white'
                    }}>

                    </Typography>
                </Box>
            </Box>
            {/* Sección de Interacción (Chat, Calendario y Contacto en Dashboard Unificado) */}
            <Box className="body3" sx={{ py: 6 }}>
                <div className="dashboard-container">
                    {/* Columna Izquierda: Chat */}
                    <div className="dashboard-main-col">
                        <ChatComponent />
                    </div>

                    {/* Columna Derecha: Calendario y Contacto */}
                    <div className="dashboard-side-col">
                        <GoogleCalendar />
                        <ContactEmail />
                    </div>
                </div>
            </Box>

            {/* Recomendaciones (Último componente antes del Footer) */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="body4">
                <Typography className="andresamutitle3" sx={{marginTop: 5, fontFamily: 'Bree Serif', paddingBottom: '2rem', display: 'flex', justifyContent: 'center', zIndex: 10, fontSize: 50, color: 'white' }}>
                    {translations.recommendations}
                </Typography>
                <a style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/details/recommendations/?detailScreenTabIndex=0">
                    <Card sx={{backgroundColor: 'black', color: 'white', marginBottom: '4rem' }}>
                        <CardActionArea>
                            <CardMedia
                                className="card-recommendations"
                                component="img"
                                image={recommendationsGif}
                                sx={{
                                    height: { xs: 200, sm: 400, md: 500 },
                                    width: { xs: '100%', sm: 400, md: 800 },
                                    objectFit: 'cover'
                                }}
                            />

                            <CardContent>
                                <Typography sx={{textAlign: 'center'}} variant="body2" color="white">
                                    {translations.recommendationsDesc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </a>
            </Box>

        </>
    )
}

export default Body

