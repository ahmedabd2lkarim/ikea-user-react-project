import { Button, FormControl, Grid, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUserAccount, loginUser } from '../../Store/Slices/userSlice';
import InfoIcon from "@mui/icons-material/Info";
import { toast } from 'react-toastify';

const DeleteProfile = () => {
    const { t } = useTranslation();

      const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, dirtyFields },
      } = useForm();
      const [errorMsg, seterrorMsg] = useState(false)
    const dispatch = useDispatch();
  const navigate = useNavigate();  
  const userProfile = useSelector((state) => state.user.items).user;
      const onSubmit = async (data,e) => {
        e.preventDefault();
        const loginData = {
                  email: userProfile?.email,
                  password: data.Password
              };
              try {
                const loginResponse = await dispatch(loginUser(loginData)).unwrap();
                if (loginResponse) {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                   toast.success(t("Login.loggedin_Successfyly"), {
                          position: 'top-right',
                          autoClose: 3000,
                        });
                  navigate('/');
                  await dispatch(deleteUserAccount(userProfile._id)).unwrap();
                }
              } catch {
            seterrorMsg(true);
        }
      };

    const isTouchedOrDirty = (name) => touchedFields[name] || dirtyFields[name];
  return (
    <div className='delete-profile' style={{marginTop:"80px",marginRight:"30px"}}>
        <h1 className='Content-Profile-Page'>{t("Delete_Account.Delete_account")}</h1>
        <Grid className="login-form-page" marginTop={2} container spacing={5}>
        <Grid className="Content-Profile-Page delete-info" size={{ xs: 12, md: 6 }}>
        <p style={{marginBottom: ".75rem"}} >{t("Delete_Account.Delete_account_details")}</p>
        <ul>
            <li>{t("Delete_Account.P_Li1")}</li>
            <li>{t("Delete_Account.P_Li2")}</li>
            <li>{t("Delete_Account.P_Li3")}</li>
        </ul>
       <p>{t("Delete_Account.delete_warning")}</p>
       <h2 style={{color:'black',fontSize:"1rem"}}>{t("Delete_Account.Any_questions")}</h2>
       <span >{t("Delete_Account.Contact")}</span> 
       <span style={{textDecoration:'underline',marginLeft:'4px',marginRight:"4px"}} >{t("Delete_Account.customer_service")}</span>
       <h3 style={{color:'black',fontSize:".9rem",fontWeight:"bold" ,marginTop:"20px",paddingTop:"14px", borderTop:"1px solid rgb(185, 185, 185)"}}>{t("Delete_Account.Password")}</h3>
       <p>{t("Delete_Account.ConfirmDelete")}</p>
       <form onSubmit={handleSubmit(onSubmit)}>
       <InputLabel className="label">{t("Login.Password")}</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <input
                style={{
                  height: "32px",
                  paddingLeft: "8px",
                  borderColor: isTouchedOrDirty("Password")
                    ? errors.Password
                      ? "red"
                      : "black"
                    : "inherit",
                }}
                id="password"
                type="password"
                {...register("Password", {
                  required: {
                    value: true,
                    message: t("Login.PasswordEmpty"),
                  },
                })}
              />

              {isTouchedOrDirty("Password") && errors.Password && (
                <div style={{ marginTop:"3px",display: "flex", color: "#ff1744" }}>
                  <InfoIcon fontSize="12px" />
                  <Typography fontSize="12px">
                    {errors.Password.message}
                  </Typography>
                </div>
              )}
                {errorMsg && !errors.Password && (
                    <div style={{ marginTop:"3px",display: "flex", color: "#ff1744" }}>
                    <InfoIcon fontSize="12px" />
                    <Typography fontSize="12px">
                    {t("Delete_Account.Password_mismatch")}
                    </Typography>
                    </div>
                )}
              </FormControl>
              <div>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  marginTop: "18px",
                  backgroundColor: "black",
                  fontSize: "12px",
                  fontWeight: 660,
                  borderRadius: "20px",
                  padding: "12px ",
                  textTransform: "capitalize",
                  marginBottom: "20px",
                }}
              >
                 {t("Delete_Account.Delete_account_Btn")}
              </Button>
            </div>
       </form>
        </Grid>
        </Grid>
    </div>
  )
}

export default DeleteProfile