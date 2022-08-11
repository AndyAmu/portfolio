import React from "react"
import '../index.css'
import './styles/project.css'
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from "@mui/system";


const Project = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} className="header">
                <a style={{ textDecoration: 'none' }} href="https://github.com/AndresAmu/my-tinerary">
                    <Box className="card">
                        <Box className="card-info1">
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className="cssbuttons-io">
                                <span><LanguageIcon /> Web</span>
                            </button>

                            <button className="cssbuttons-io">
                                <span><GitHubIcon />Code</span>
                            </button>
                        </Box>
                    </Box>
                </a>
                <a style={{ textDecoration: 'none' }} href="https://github.com/AndresAmu/my-industrial-home">

                    <Box className="card">
                        <Box className="card-info2">
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className="cssbuttons-io">
                                <span><LanguageIcon /> Web</span>
                            </button>

                            <button className="cssbuttons-io">
                                <span><GitHubIcon />Code</span>
                            </button>
                        </Box>
                    </Box>

                </a>
                <a style={{ textDecoration: 'none' }} href="https://github.com/AndresAmu/Amazing_Events">
                    <Box className="card">
                        <Box className="card-info3">

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className="cssbuttons-io">
                                <span><LanguageIcon /> Web</span>
                            </button>

                            <button className="cssbuttons-io">
                                <span><GitHubIcon />Code</span>
                            </button>
                        </Box>
                    </Box>
                </a>
                <a style={{ textDecoration: 'none' }} href="https://github.com/AndresAmu/PETSHOP_MINDY_GRUPO_11">
                    <Box className="card">
                        <Box className="card-info4">
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className="cssbuttons-io">
                                <span><LanguageIcon /> Web</span>
                            </button>

                            <button className="cssbuttons-io">
                                <span><GitHubIcon />Code</span>
                            </button>
                        </Box>
                    </Box>
                </a>
            </Box>



        </>


    )
}

export default Project