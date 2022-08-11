import React from "react"
import { Box, Typography } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import '../index.css'
import './styles/body.css'
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';


const Body = () => {
    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="body">
                <Typography sx={{ zIndex: 10, fontSize: 80, color: 'white' }}>ANDRÉS AMUCHÁSTEGUI</Typography>
                <Typography sx={{ zIndex: 10, fontSize: 30, color: 'white' }}>Full Stack Developer | Web | Mobile</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} className='body2'>
                <Box sx={{ textAlign: 'center', width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{
                        color: 'white',
                        fontSize: 40
                    }}>
                        Hi, I'm Andrés
                    </Typography>
                    <Typography sx={{
                        color: 'white'
                    }}>
                        I am a person with good predisposition, creative and passionate.
                        Here you can see my full CV.
                    </Typography>
                    <Box sx={{
                        marginTop: 2
                    }}>
                        <a href="https://drive.google.com/u/0/uc?id=1EFbRT3aAr8rCJQf-W2icp7Sw3sTdZV1k&export=download">
                            <div className="button" data-tooltip="Size: 253Kb">
                                <div className="button-wrapper">
                                    <div className="text">Download CV</div>
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                                    </span>
                                </div>
                            </div>
                        </a>
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
            <Typography sx={{paddingTop: '10rem', paddingBottom: '5rem', display: 'flex', justifyContent: 'center', zIndex: 10, fontSize: 50, color: 'white' }}>PROJECT</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >

                    <Box className="card">
                        <Box className="card-info1">
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
        </>
    )
}

export default Body