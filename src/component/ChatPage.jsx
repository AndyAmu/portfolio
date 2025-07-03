import React from 'react';
import { Box, Typography } from "@mui/material";
// Cambiamos esta importación
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ChatComponent from './chatGPT';
import { useLanguage } from '../context/LanguageContext';

const ChatPage = () => {
    const { translations } = useLanguage();
    
    return (
        <Box className="body" sx={{ 
            minHeight: '100vh', 
            paddingTop: '100px',
            paddingBottom: '2rem',
        }}>
            <Typography sx={{ 
                fontFamily: 'Bree Serif', 
                paddingBottom: '2rem', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '1rem',
                fontSize: '2.5rem', 
                color: 'white' 
            }}>
                <PrecisionManufacturingIcon sx={{ fontSize: '2.5rem' }} />
                {translations.virtualAssistant}
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
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                <ChatComponent />
            </Box>
        </Box>
    );
};

export default ChatPage;