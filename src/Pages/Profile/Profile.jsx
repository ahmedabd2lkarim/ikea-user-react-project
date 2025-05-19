import Grid from "@mui/material/Grid";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import './Profile.css';
import LockSVG from "./LockSVG";
import PenSVG from "./penSVG";
import Garbish from "./Garbish";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../Store/Slices/userSlice";
import { useTranslation } from "react-i18next";

const Profile = () => {

  const { t } = useTranslation();
  // const language = i18n.language; 

  const userProfile = useSelector((state) => state.user.items).user;
  console.log(userProfile);
  const userName= userProfile?.name.split(" ")[0] 
  
  console.log(userName)
  const dispatch = useDispatch();
  

  
    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);



    const navigate = useNavigate(); 
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    };
    // console.log(t("greetingProfileUserName", { name: "Test" }));
  return (
    <div>
  <div className="Content-Profile-Page" style={{marginTop:"80px"}}>
<h2 style={{fontSize:"1.8rem" , marginBottom:"-5px"}}> 
{t("profile.greetingProfileUserName", { name: userName })}
  </h2>

  </div>
 <Grid className="login-form-page profilePage" marginTop={2} container spacing={2}>
 <Grid className="Content-Profile-Page" size={{ xs: 12, md: 5}}>
<img style={{display:"block"}}  src="https://www.ikea.com/global/assets/commerce/profile/static/media/main-page-image.6d3edc639c833633e718.jpg" alt="Profile" width="100%" height="auto" />
<div className="Profile-img-info">
<h1 style={{lineHeight: "1.20"}}>{t("profile.welcomeIKEA")}</h1>
<p  >{t("profile.welcomeIKEADescription")}</p>
</div>

</Grid>
<Grid className="Content-Profile-Page" margin={0} padding={0} size={{ xs: 12, md: 7 }}>
  <Grid className="Right-Profile-side" size={{ xs: 12, md: 8 }}>
  <p  height="10px" style={{fontWeight:"bold"}} >{t("profile.Profile")}</p>
  <ul>
    <li>
      <NavLink to="/profile/details" style={{ textDecoration: 'none', color: 'inherit' }}>

      <Grid marginTop={2} container spacing={5} >
      <Grid  size={{ xs: 1, md: 1 }} style={{ display: 'flex', alignItems: 'center' }}> <PersonOutlineIcon/> </Grid>
      <Grid  size={{ xs: 8, md: 8 }} style={{ display: 'flex', flexDirection: 'column' }}>
      <p className="li-title"  height="10px" style={{fontWeight:"bold",marginBottom:"2px", fontSize:".9rem"}}>{t("profile.p_Details")}</p>
      <p className="li-details" style={{fontSize:".8rem"}} >{t("profile.p_Details_details")}</p>
      </Grid>
      <Grid  size={{ xs: 2, md: 2 }} style={{ display: 'flex',alignItems: 'center' ,justifyContent: 'flex-end' }}> <KeyboardArrowRightIcon/> </Grid>
      </Grid>
      </NavLink>
    </li>
    <li>
    <Grid marginTop={2} container spacing={5}>
      <Grid  size={{ xs: 1, md: 1 }} style={{ display: 'flex', alignItems: 'center' }}> 
      <PenSVG/>  
      </Grid>
      <Grid  size={{ xs: 8, md: 8 }} style={{ display: 'flex', flexDirection: 'column' }}>
      <p className="li-title" height="10px" style={{fontWeight:"bold",marginBottom:"2px", fontSize:".9rem"}}>{t("profile.p_Planner")}</p>
      <p className="li-details" style={{fontSize:".8rem"}} >{t("profile.p_Planner_details")}</p>
      </Grid>
      <Grid  size={{ xs: 2, md: 2 }} style={{ display: 'flex',alignItems: 'center' ,justifyContent: 'flex-end' }}> <KeyboardArrowRightIcon/> </Grid>
      </Grid>
    </li>
    <li>
    <NavLink to="/profile/change-password" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Grid marginTop={2} container spacing={5}>
      <Grid  size={{ xs: 1, md: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
      <LockSVG/>  
       </Grid>
      <Grid  size={{ xs: 8, md: 8 }} style={{ display: 'flex', flexDirection: 'column' }}>
      <p className="li-title" height="10px" style={{fontWeight:"bold",marginBottom:"2px", fontSize:".9rem"}}>{t("profile.p_Password")}</p>
      <p className="li-details" style={{fontSize:".8rem"}} >{t("profile.p_Password_details")}</p>
      </Grid>
      <Grid  size={{ xs: 2, md: 2 }} style={{ display: 'flex',alignItems: 'center' ,justifyContent: 'flex-end' }}> <KeyboardArrowRightIcon/> </Grid>
      </Grid>
    </NavLink>
    </li>
    <li>
    <NavLink to="/profile/delete-account" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Grid marginTop={2} container spacing={5}>
      <Grid  size={{ xs: 1, md: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
      <Garbish/>
       </Grid>
      <Grid  size={{ xs: 8, md: 8 }} style={{ display: 'flex', flexDirection: 'column' }}>
      <p className="li-title" height="10px" style={{fontWeight:"bold",marginBottom:"2px", fontSize:".9rem"}}>{t("profile.p_Delete")}</p>
      <p className="li-details" style={{fontSize:".8rem"}} >{t("profile.p_Delete_details")}</p>
      </Grid>
      <Grid  size={{ xs: 2, md: 2 }} style={{ display: 'flex',alignItems: 'center' ,justifyContent: 'flex-end' }}> <KeyboardArrowRightIcon/> </Grid>
      </Grid>
    </NavLink>
    </li>
    <li>

    <div style={{ fontSize:"1rem",marginTop:"30px",display:"flex",alignItems:"center"}}>
    <LogoutIcon />
    <button
  onClick={handleLogout}
  style={{
    marginTop: "5px",
    marginLeft: "20px",
    marginRight: "20px",
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer"
  }}
>
  {t("profile.Logout")}
</button>
    {/* <a onClick={handleLogout} style={{marginTop:"5px" , marginLeft:"20px",marginRight:"20px" , textDecoration:"underline"}} >{t("profile.Logout")}</a> */}
    </div>
    </li>
  </ul>
  </Grid>
</Grid>
</Grid>
    </div>
  )
}

export default Profile