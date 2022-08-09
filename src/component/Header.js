import React from "react"
import { Box, Typography } from "@mui/material"
import '../index.css'

const header = () => {
    return(
        <Box  className="header">
            <Typography sx={{color: 'white'}}>Aca va el cuerpo de la página</Typography>
        </Box>
    )
}

export default header