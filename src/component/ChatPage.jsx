import React from 'react';
import { Box, Typography } from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatComponent from './chatGPT';

const ChatPage = () => {
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
                <SmartToyIcon sx={{ fontSize: '2.5rem' }} />
                ASISTENTE VIRTUAL
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
                ¡Hola! Soy tu asistente virtual. Puedes preguntarme sobre Andrés, sus proyectos, tecnologías o cualquier otra cosa. ¡Estoy aquí para ayudarte!
            </Typography>

            <Box sx={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                <ChatComponent />
            </Box>
        </Box>
    );
};

export default ChatPage; 