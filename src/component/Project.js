import React from "react"
import '../index.css'
import './styles/project.css'
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from "@mui/system";


const Project = () => {
    return (
        <>
        <div class="container">
			<div class="card">
				<div class="content">
					<div class="imgBx">
						<img src="../image/MyIndustrial.PNG" />
					</div>
					<div class="contentBx">
						<h3>Lion</h3>
					</div>
				</div>
				<ul class="sci">
					<li>
						<a href="">happy</a>
					</li>
					<li>
						<a href="">birth</a>
					</li>
					<li>
						<a href="">day</a>
					</li>
				</ul>
			</div>
			<div class="card">
				<div class="content">
					<div class="imgBx">
						<img src="https://image.flaticon.com/icons/png/256/4213/4213736.png" />
					</div>
					<div class="contentBx">
						<h3>Frog</h3>
					</div>
				</div>
				<ul class="sci">
					<li>
						<a href="">happy</a>
					</li>
					<li>
						<a href="">birth</a>
					</li>
					<li>
						<a href="">day</a>
					</li>
				</ul>
			</div>
			<div class="card">
				<div class="content">
					<div class="imgBx">
						<img src="https://image.flaticon.com/icons/png/256/4213/4213641.png" />
					</div>
					<div class="contentBx">
						<h3>Giraffe</h3>
					</div>
				</div>
				<ul class="sci">
					<li>
						<a href="">happy</a>
					</li>
					<li>
						<a href="">birth</a>
					</li>
					<li>
						<a href="">day</a>
					</li>
				</ul>
			</div>
		</div>
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