import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useLanguage } from '../context/LanguageContext';

function DrawerAppBar(props) {
    const { window } = props;
    const [value, setValue] = React.useState(0);
    const { language, toggleLanguage, translations } = useLanguage();

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Barra de navegación superior (solo visible en pantallas sm y superiores) */}
            <AppBar 
                component="nav" 
                sx={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)',
                    display: { xs: 'block', sm: 'block' }
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ 
                            fontFamily: 'Bree Serif',
                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                    >
                        {translations.portfolio}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
                        <a href="#home" style={{ textDecoration: 'none' }}>
                            <Button sx={{ 
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}>
                                <HomeIcon sx={{ mr: 1 }} /> {translations.home}
                            </Button>
                        </a>
                        <a href="#chat" style={{ textDecoration: 'none' }}>
                            <Button sx={{ 
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}>
                                <SmartToyIcon sx={{ mr: 1 }} /> {translations.chat}
                            </Button>
                        </a>
                        <a href="#contact" style={{ textDecoration: 'none' }}>
                            <Button sx={{ 
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}>
                                <EmailIcon sx={{ mr: 1 }} /> {translations.contact}
                            </Button>
                        </a>
                        <Button 
                            onClick={toggleLanguage}
                            sx={{ 
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                minWidth: '80px',
                                ml: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.5)'
                                }
                            }}
                        >
                            {language === 'en' ? 'ES' : 'EN'}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Barra de navegación inferior para móviles */}
            <Paper 
                sx={{ 
                    position: 'fixed', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    display: { xs: 'block', sm: 'none' },
                    zIndex: 1100,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)'
                }} 
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{
                        backgroundColor: 'transparent',
                        '& .MuiBottomNavigationAction-root': {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        '& .Mui-selected': {
                            color: 'white'
                        }
                    }}
                >
                    <BottomNavigationAction 
                        label={translations.home} 
                        icon={<HomeIcon />} 
                        component="a"
                        href="#home"
                    />
                    <BottomNavigationAction 
                        label={translations.chat} 
                        icon={<SmartToyIcon />} 
                        component="a"
                        href="#chat"
                    />
                    <BottomNavigationAction 
                        label={translations.contact} 
                        icon={<EmailIcon />} 
                        component="a"
                        href="#contact"
                    />
                    <BottomNavigationAction 
                        label={language === 'en' ? 'ES' : 'EN'} 
                        onClick={(e) => {
                            e.preventDefault();
                            toggleLanguage();
                        }}
                    />
                </BottomNavigation>
            </Paper>

            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
