import { Button, FormControl, Grid, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'react-toastify';
const ChangePassword = () => {
    const { t } = useTranslation();

      const {
        register,
        watch,
        getValues,
        handleSubmit,
        formState: { errors, touchedFields, dirtyFields },
      } = useForm();
      const [isFocused, setIsFocused] = useState(false);

  const getPasswordValidationStatus = () => {
    const password = watch("Password") || "";
    return {
      hasLowercase: {
          iconVisible: /[a-z]/.test(password), 
          textColor: password === "" ? "black" : (/[a-z]/.test(password) ? "blue" : "red"),
      },
      hasUppercase: {
          iconVisible: /[A-Z]/.test(password),
          textColor: password === "" ? "black" : (/[A-Z]/.test(password) ? "blue" : "red"),
      },
      hasLength: {
          iconVisible: password.length >= 8 && password.length <= 20,
          textColor: password === "" ? "black" : (password.length >= 8 && password.length <= 20 ? "blue" : "red"),
      },
      hasSpecial: {
          iconVisible: /[!@#$%^&*(),.?":{}|<>]/.test(password),
          textColor: password === "" ? "black" : (/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "blue" : "red"),
      },
      hasNumber: {
          iconVisible: /\d/.test(password),
          textColor: password === "" ? "black" : (/\d/.test(password) ? "blue" : "red"),
      },
  };
};

const validationStatus = getPasswordValidationStatus();



      const [errorMsg, seterrorMsg] = useState(false)
    const dispatch = useDispatch();
  const navigate = useNavigate();  
  const userProfile = useSelector((state) => state.user.items).user;
  console.log(userProfile);

      const onSubmit = async (data,e) => {
        e.preventDefault();
        const changedData = {
                  oldPassword: data.OldPassword,
                  password: data.Password
              };
      console.log(changedData);
        try {
          toast.success(t("Login.loggedin_Successfyly"), {
                  position: 'top-right',
                  autoClose: 3000,
                });
          // const res = await dispatch(changePassword(changedData)).unwrap();
          // localStorage.setItem('token', res.token);
        } catch {
          toast.error("error", {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      };
      const watchPWD = watch("confirmPassword");
      const isTouchedAndDirty = (name) => touchedFields[name] && dirtyFields[name];
    const isTouchedOrDirty = (name) => touchedFields[name] || dirtyFields[name];
  return (
    <div className='delete-profile'>
        <h1 className='Content-Profile-Page' style={{fontSize:"1.2rem"}}>Change password</h1>
        <Grid className="login-form-page" marginTop={2} container spacing={5}>
        <Grid className="Content-Profile-Page delete-info" size={{ xs: 12, md: 6 }}>
        <p style={{marginBottom: ".75rem"}} >It's a good idea to update your password regularly and to make sure it's unique from other passwords you use.</p>
       <form onSubmit={handleSubmit(onSubmit)}>
       <InputLabel className="label">Current password</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <input
                style={{
                  height: "32px",
                  paddingLeft: "8px",
                  borderColor: isTouchedOrDirty("OldPassword")
                    ? errors.Password
                      ? "red"
                      : "black"
                    : "inherit",
                }}
                id="OldPassword"
                type="password"
                {...register("OldPassword", {
                  required: {
                    value: true,
                    message: t("Login.PasswordEmpty"),
                  },
                })}
              />

              {isTouchedOrDirty("OldPassword") && errors.OldPassword && (
                <div style={{ marginTop:"3px",display: "flex", color: "#ff1744" }}>
                  <InfoIcon fontSize="12px" />
                  <Typography fontSize="12px">
                    {errors.OldPassword.message}
                  </Typography>
                </div>
              )}
              </FormControl> 

              <InputLabel className="label" htmlFor="username">
              New password
            </InputLabel>
            <FormControl fullWidth>
              <input
                style={{ height: "32px", marginBottom: "13px",paddingLeft:"8px" ,borderColor: isTouchedOrDirty("Password")
                  ? errors.Password
                    ? "red"
                    : "green"
                  : "inherit"}}
                id="Newpassword"
                type="password"
                {...register("Password", {
                  required: {
                    value: true,
                    message: t("Register.password_empty"),
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                    message: t("Register.password_valid"),
                },
                minLength: {
                    value: 8,
                    message: t("Register.password_minlen"),
                  },
                  maxLength: {
                    value: 20,
                    message: t("Register.password_maxlen"),
                  },
                })}
              onFocus={() => setIsFocused(true)}
              />
              {isTouchedOrDirty("Password") &&  errors.Password &&(
                
                <Typography color="#ff1744" fontSize="12px" marginTop={"3px"}>
                  <InfoIcon fontSize="12px" />
                  {errors.Password.message}
                </Typography>
              )}
              
              {isTouchedAndDirty("Password") &&  !errors.Password  &&(
                <div
                  color="green"
                  style={{color:"green",display: "flex",alignItems: "center" , marginTop:"3px"}}
                >
                  <CheckCircleIcon fontSize="6px" />
                  <Typography fontSize="12px" marginLeft="2px">
                  {t("Register.accept")}
                  </Typography>
                </div>
              )} 
            </FormControl>
           {isFocused && (
                <div className="Error-Message">
                    <Typography fontSize={12} marginTop={2}>{t("Register.password_Contain")}</Typography>
                    <Typography fontSize={12} color={validationStatus.hasLowercase.textColor} marginTop={2}>
                        {validationStatus.hasLowercase.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        {t("Register.lowercase")}
                    </Typography>
                    <Typography fontSize={12} color={validationStatus.hasUppercase.textColor} marginTop={2}>
                        {validationStatus.hasUppercase.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        {t("Register.uppercase")}
                    </Typography>
                    <Typography fontSize={12} color={validationStatus.hasLength.textColor} marginTop={2}>
                        {validationStatus.hasLength.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        {t("Register.8characters")}
                    </Typography>
                    <Typography fontSize={12} color={validationStatus.hasSpecial.textColor} marginTop={2}>
                        {validationStatus.hasSpecial.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        {t("Register.Special_character")}
                    </Typography>
                    <Typography fontSize={12} color={validationStatus.hasNumber.textColor} marginTop={2}>
                        {validationStatus.hasNumber.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        {t("Register.number")}
                    </Typography>
                </div>
            )}

<InputLabel className="label">Confirm new password</InputLabel>
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
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  validate: (value) => value == watchPWD || " Passwords do not match",
                })}
              />
              {isTouchedOrDirty("confirmPassword") && errors.confirmPassword && (
                <div style={{ marginTop:"3px",display: "flex", color: "#ff1744" }}>
                  <InfoIcon fontSize="12px" />
                  <Typography fontSize="12px">
                    {errors.confirmPassword.message}
                  </Typography>
                </div>
              )}
              {
        isTouchedOrDirty("confirmPassword") && getValues('confirmPassword')!=getValues('Password') && (
          <div style={{ marginTop:"3px",display: "flex", color: "#ff1744" }}>
            <InfoIcon fontSize="12px" />
            <Typography fontSize="12px">
              Passwords do not match
            </Typography>
          </div>
        ) }
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
               change password
              </Button>
            </div>
       </form>
        </Grid>
        </Grid>
    </div>
  )
}

export default ChangePassword