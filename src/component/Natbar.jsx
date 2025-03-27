import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import { useLanguage } from '../context/LanguageContext';

const drawerWidth = 240;

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { language, toggleLanguage, translations } = useLanguage();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <Box sx={{ 
            textAlign: 'center',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)'
        }}>
            <Typography variant="h6" sx={{ my: 2, color: 'white', fontFamily: 'Bree Serif' }}>
                {translations.portfolio}
            </Typography>
            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                p: 3,
                alignItems: 'stretch'
            }}>
                <a href="#home" style={{ textDecoration: 'none' }} onClick={handleDrawerToggle}>
                    <Button 
                        fullWidth
                        sx={{ 
                            color: 'white',
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'flex-start',
                            padding: '12px 16px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <HomeIcon /> {translations.home}
                    </Button>
                </a>
                <a href="#chat" style={{ textDecoration: 'none' }} onClick={handleDrawerToggle}>
                    <Button 
                        fullWidth
                        sx={{ 
                            color: 'white',
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'flex-start',
                            padding: '12px 16px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <SmartToyIcon /> {translations.chat}
                    </Button>
                </a>
                <a href="#contact" style={{ textDecoration: 'none' }} onClick={handleDrawerToggle}>
                    <Button 
                        fullWidth
                        sx={{ 
                            color: 'white',
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'flex-start',
                            padding: '12px 16px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <EmailIcon /> {translations.contact}
                    </Button>
                </a>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLanguage();
                    }}
                    sx={{ 
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '8px',
                        marginTop: 2,
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.5)'
                        }
                    }}
                >
                    {language === 'en' ? 'ES' : 'EN'}
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar 
                component="nav" 
                sx={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ 
                            display: { xs: 'block', sm: 'block' },
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
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth,
                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                            backdropFilter: 'blur(10px)'
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
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
