import React from "react"
import { Box, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import '../index.css'
import './styles/body.css'
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import Technologies from './Technologies'
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const Body = () => {
    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="body">
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

                        Hi, I'm Andrés
                    </Typography>
                    <Typography sx={{
                        fontFamily: 'Bree Serif',
                        color: 'white'
                    }}>
                        I am a person with good predisposition, creative and passionate.
                        Here you can see my full CV.
                    </Typography>

                    <Box sx= {{display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{
                            margin: 1,
                            marginTop: 2
                        }}>
                            <a href="https://drive.google.com/file/d/1EFbRT3aAr8rCJQf-W2icp7Sw3sTdZV1k/view?usp=sharing">
                                <div className="button" data-tooltip="Size: 253Kb">
                                    <div className="button-wrapper">
                                        <div className="text">Download Spanish CV</div>
                                        <span className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </Box>
                        <Box sx={{
                            margin: 1,
                            marginTop: 2
                        }}>
                            <a href="https://drive.google.com/file/d/1_bPYb6K89VsFLBqueHvRq3vL0bzCvXoH/view?usp=sharing">
                                <div className="button" data-tooltip="Size: 253Kb">
                                    <div className="button-wrapper">
                                        <div className="text">Download English CV</div>
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
            <Box className="body">
                <Typography sx={{ fontFamily: 'Bree Serif', paddingTop: '5rem', paddingBottom: '5rem', display: 'flex', justifyContent: 'center', zIndex: 10, fontSize: 50, color: 'white' }}>PROJECT</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >

                    <Box className="card">
                        <Box className="card-info1">
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <a style={{ textDecoration: 'none' }} href="http://my-tinerary-and-amu.herokuapp.com/">
                                <button className="cssbuttons-io">
                                    <span><LanguageIcon />Web</span>
                                </button>
                            </a>
                            <a style={{ textDecoration: 'none' }} href="https://github.com/AndresAmu/my-tinerary">
                                <button className="cssbuttons-io">
                                    <span><GitHubIcon />Code</span>
                                </button>
                            </a>
                        </Box>
                    </Box>
                    <Box className="card">
                        <Box className="card-info2">
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <a style={{ textDecoration: 'none' }} href="https://my-industrial-home-challange-mind-hub.vercel.app/">
                                <button className="cssbuttons-io">
                                    <span><LanguageIcon /> Web</span>
                                </button>
                            </a>
                            <a style={{ textDecoration: 'none' }} href="https://github.com/AndresAmu/my-industrial-home">
                                <button className="cssbuttons-io">
                                    <span><GitHubIcon />Code</span>
                                </button>
                            </a>
                        </Box>
                    </Box>
                    <Box className="card">
                        <Box className="card-info4">
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <a style={{ textDecoration: 'none' }} href="https://andresamu.github.io/PETSHOP_MINDY_GRUPO_11/index.html">
                                <button className="cssbuttons-io">
                                    <span><LanguageIcon /> Web</span>
                                </button>
                            </a>
                            <a style={{ textDecoration: 'none' }} href="https://github.com/AndresAmu/PETSHOP_MINDY_GRUPO_11">
                                <button className="cssbuttons-io">
                                    <span><GitHubIcon />Code</span>
                                </button>
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Box>


            <Technologies />

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="body4">
                <Typography className="andresamutitle3" sx={{marginTop: 5, fontFamily: 'Bree Serif', paddingBottom: '2rem', display: 'flex', justifyContent: 'center', zIndex: 10, fontSize: 50, color: 'white' }}>RECOMMENDATIONS LINKEDIN</Typography>
                <a style={{ textDecoration: 'none' }} href="https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/details/recommendations/?detailScreenTabIndex=0">
                    <Card sx={{backgroundColor: 'black', color: 'white', maxWidth: 765, marginBottom: '2rem' }}>
                        <CardActionArea>
                            <CardMedia
                                className="card-recommendations"
                                component="img"
                                height="340"
                            />

                            <CardContent>
                                <Typography sx={{textAlign: 'center'}} variant="body2" color="white">
                                    These are recommendations on Linkedin ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
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