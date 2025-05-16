import { Grid } from '@mui/material'
import React from 'react'
const DeleteProfile = () => {
  return (
    <div className='delete-profile'>
        <h1 className='Content-Profile-Page'>Delete account</h1>
        <Grid className="login-form-page" marginTop={2} container spacing={5}>
        <Grid className="Content-Profile-Page delete-info" size={{ xs: 12, md: 6 }}>
        <p style={{marginBottom: ".75rem"}} > Time to say goodbye? We miss you already! The following happens when you delete your account:</p>
        <ul>
            <li>You delete all personal information and your shopping lists.</li>
            <li>You will no longer have access to your account or be able to enjoy any member benefits.</li>
            <li>For tax and other legal reasons, we will keep your purchase history.</li>
        </ul>
       <p>Remember that you are always welcome back!</p>
       <h2 style={{color:'black',fontSize:"1rem"}}>Any questions?</h2>
       <span >Contact</span> 
       <span style={{textDecoration:'underline',marginLeft:'4px',marginRight:"4px"}} >customer service</span>
       <h3 style={{color:'black',fontSize:".9rem" , borderTop:"1px solid #6f5c52"}}>Password</h3>
        </Grid>
        </Grid>
    </div>
  )
}

export default DeleteProfile