import React from "react"
import '../index.css'
import './styles/project.css'
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from "@mui/system";


const Project = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} className="body">
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
        </>
    )
}

export default Project