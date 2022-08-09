import React from "react"
import { Box } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import '../index.css'


const header = () => {
    return (
        <Box className="header">
            <Avatar
                alt="Andrés Amuchástegui"
                src="./images/and.jpg"
                sx={{ width: 200, height: 200 }}
            />
        </Box>
    )
}

export default header