import { Grid, Typography } from '@mui/material'
import React from 'react'
import BlockIcon from '@mui/icons-material/Block';
const ErrorMsg = ({Msg}) => {
  return (
    <div  style={{backgroundColor:"rgb(236, 27, 69)",boxShadow:"0 4px 16px #0000001a ",borderRadius:"3px",paddingLeft:"3px",height:"70px",marginBottom:"20px"}}>
        <Grid container style={{backgroundColor:"white",height:"70px",alignItems:"center" }}>
            <Grid  size={{ xs: 2, md: 1 }} px={1} style={{clear:"rgb(236, 27, 69)",fontSixe:"12px"}}>
                <BlockIcon style={{color:"rgb(236, 27, 69)",fontSize:"20px"}}/>
            </Grid>
            <Grid  size={{ xs: 9, md: 9 }}>
               <Typography style={{fontSize:"11px" , color:"rgb(100, 100, 100)", maxWidth:"100%", whiteSpace: "normal",overflowWrap: "break-word"}}>

                {Msg}
               </Typography>
            </Grid>
        </Grid>
    </div>
  )
}

export default ErrorMsg