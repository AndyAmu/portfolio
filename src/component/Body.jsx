import React from "react"
import { Box, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import '../index.css'
import './styles/body.css'
import Technologies from './Technologies'
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import ChatComponent from './chatGPT';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ContactEmail from './ContactEmail';
import { useLanguage } from '../context/LanguageContext';


const Body = () => {
    const { translations, language } = useLanguage();
    
    // URLs de los CVs según el idioma
    const cvUrls = {
        en: "https://drive.google.com/file/d/1BEMQj9VB7l3yvk5Jam9aAfZmnHxgIF96/view?usp=sharing",
        es: "https://drive.google.com/file/d/14-FGhRxK-rmz4bc6xiTsU7cX3yq5EbZf/view?usp=sharing"
    };

    return (
        <>

            <Box id="home" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="body">
                <Typography className="andresamutitle" sx={{ fontFamily: 'Bree Serif', zIndex: 10, color: 'white' }}>ANDRÉS AMUCHÁSTEGUI</Typography>
                <Typography className="andresamutitle2" sx={{ fontFamily: 'Bree Serif', zIndex: 10, color: 'white' }}>Full Stack Developer | Web | Mobile ㅤ<ComputerIcon sx={{ fontSize: '2.5rem' }} /> +<PhoneIphoneIcon sx={{ fontSize: '2.2rem' }} /></Typography>
                <Box sx={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                    <Typography sx={{ fontSize: 50 }}></Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} className='body2'>
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
                        alt="Andrés Amuchástegui"

                    />
                    <Typography sx={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: 'white'
                    }}>

                    </Typography>
                </Box>
            </Box>
            <Box id="chat" className="body">
                <Typography sx={{ 
                    fontFamily: 'Bree Serif', 
                    paddingTop: '5rem', 
                    paddingBottom: '2rem', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '1rem',
                    zIndex: 10, 
                    fontSize: 50, 
                    color: 'white',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        <SmartToyIcon sx={{ fontSize: '3rem' }} />
                        <span>{translations.virtualAssistant}</span>
                    </Box>
                </Typography>
                
                <Typography sx={{
                    fontFamily: 'Bree Serif',
                    color: 'white',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto 2rem auto',
                    fontSize: '1.2rem',
                    opacity: 0.9
                }}>
                    {translations.chatIntro}
                </Typography>

                <Box sx={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1rem'
                }}>
                    <ChatComponent />
                </Box>
            </Box>

            <Technologies />

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="body4">
                <Typography className="andresamutitle3" sx={{marginTop: 5, fontFamily: 'Bree Serif', paddingBottom: '2rem', display: 'flex', justifyContent: 'center', zIndex: 10, fontSize: 50, color: 'white' }}>
                    {translations.recommendations}
                </Typography>
                <a style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/details/recommendations/?detailScreenTabIndex=0">
                    <Card sx={{backgroundColor: 'black', color: 'white', marginBottom: '2rem' }}>
                        <CardActionArea>
                            <CardMedia
                                className="card-recommendations"
                                component="img"
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

            <section id="contact">
                <Box className="body" sx={{ paddingBottom: '3rem' }}>
                    <Typography sx={{ 
                        fontFamily: 'Bree Serif', 
                        paddingTop: '5rem', 
                        paddingBottom: '2rem', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        gap: '1rem',
                        zIndex: 10, 
                        fontSize: 50, 
                        color: 'white' 
                    }}>
                        {translations.contact}
                    </Typography>
                    <ContactEmail />
                </Box>
            </section>

        </>
    )
}

export default Body