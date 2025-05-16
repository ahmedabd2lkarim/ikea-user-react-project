import Grid from "@mui/material/Grid";
import "../../Pages/UserForms/UserForms.css";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from '@mui/icons-material/Check';
import {
  Button,
  Typography,
  InputLabel,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../../Store/Slices/userSlice";
import { useTranslation } from "react-i18next";
import ErrorMsg from "./ErrorMsg";
import { toast } from 'react-toastify';
const RegisterForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    watch,
  } = useForm();

  const isTouchedOrDirty = (name) => touchedFields[name] || dirtyFields[name];
  const isTouchedAndDirty = (name) => touchedFields[name] && dirtyFields[name];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerFailed, setregisterFailed] = useState(false);

  const SubmitErrorMsg= t("Register.SubmitErrorMsg");
  const onSubmit = async (data,e) => {
    e.preventDefault();
    const newUser = {
          name: data.firstName + " " + data.lastName,
          email: data.Email,
          password: data.Password,
          mobileNumber:"No phone added",
          homeAddress:"No addresses added",
          gender:null
        }
  
    try {
        await dispatch(registerUser(newUser)).unwrap();
        toast.success(t("Register.Account_created_successfully"), {
                position: 'top-right',
                autoClose: 3000,
              });
        navigate('/login');
      } catch {
        setregisterFailed(true);
      
    }
  };

  const Label = "Email address or phone number";
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
  
  return (
    <div>
      <Grid className="login-form-page" marginTop={5} container spacing={2}>
        <Grid className="Content-login-Page" size={{ xs: 12, md: 5 }}>
          <h2>{t("Register.Create_account_Form")}</h2>
          <Grid container className="Login-Link d-flex">
            <Grid
              fontSize={13}
              className="loginIntro"
              color="#616161"
              size={{ xs: 5, sm: 6, md: 8 }}
            >
             {t("Register.Already_account")}
              <a
                href="/login"
                style={{ textDecoration: "underline", marginLeft: "4px" }}
              >
                {t("Register.Log_here")}
              </a>
            </Grid>
          </Grid>
        </Grid>

        <Grid container size={{ xs: 12, md: 7 }}>
          <form size={{ md: 10 }} onSubmit={handleSubmit(onSubmit)}>
            <Grid size={{ md: 10 }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 650,
                  marginBottom: "30px",
                }}
              >
               {t("Register.RegisterForm")}
              </h4>
              {/* <h4 style={{fontSize: "14px",fontWeight: 650,marginBottom: "30px"}}>And it’s free to join!</h4>  */}
            </Grid>
            {registerFailed && (
            <div>
              <ErrorMsg Msg={SubmitErrorMsg}/>
            </div>
            )}
            <InputLabel className="label">{t("Register.First_name")}</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
              <input
                style={{ height: "32px",paddingLeft:"8px" ,borderColor: isTouchedOrDirty("firstName")
                  ? errors.firstName
                    ? "red"
                    : "green"
                  : "inherit", }}
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: t("Register.F_Name_empty"),
                  },
                })}
              />
              {isTouchedOrDirty("firstName") && errors.firstName && (
                <Typography color="#ff1744" fontSize="12px" marginTop={"3px"}>
                  <InfoIcon fontSize="12px" />
                  {errors.firstName.message}
                </Typography>
              )}
              {isTouchedAndDirty("firstName") && !errors.firstName && (
                <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color:"green",
                  marginTop:"3px"
                  }}
                >
                  <CheckCircleIcon fontSize="6px" />
                  <Typography fontSize="12px" marginLeft="2px">
                  {t("Register.Approved!")}
                  </Typography>
                </div>
              )}
            </FormControl>

            <InputLabel className="label">{t("Register.Last_name")}</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
              <input
               style={{ height: "32px",paddingLeft:"8px" ,borderColor: isTouchedOrDirty("lastName")
                ? errors.lastName
                  ? "red"
                  : "green"
                : "inherit"}}
                id="lastName"
                type="text"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: t("Register.L_Name_empty"),
                  },
                })}
              />
              {isTouchedOrDirty("lastName") && errors.lastName && (
                <Typography color="#ff1744" fontSize="12px" marginTop={"3px"}>
                  <InfoIcon fontSize="12px" />
                  {errors.lastName.message}
                </Typography>
              )}
              {isTouchedAndDirty("lastName") && !errors.lastName && (
               <div
               style={{
                 display: "flex",
                 alignItems: "center",
                 color:"green",
                 marginTop:"3px"
                 }}
               >
                 <CheckCircleIcon fontSize="6px" />
                 <Typography fontSize="12px" marginLeft="2px">
                 {t("Register.Approved!")}
                 </Typography>
               </div>
              )}
            </FormControl>

            {/* Here for userName */}
            <InputLabel className="label" htmlFor="username">
            {t("Register.Email_address")}
            </InputLabel>
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
              <input
               style={{ height: "32px",paddingLeft:"8px" ,borderColor: isTouchedOrDirty("Email")
                ? errors.Email
                  ? "red"
                  : "green"
                : "inherit", }}
                id="username"
                type="email"
                {...register("Email", {
                  required: {
                    value: true,
                    message: t("Register.Email_Empty"),
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.±]+@gmail.com$/,
                    message: t("Register.Email_Valid"),
                  },
                })}
              />
              {isTouchedOrDirty("Email") &&  errors.Email &&(
                
                <Typography color="#ff1744" fontSize="12px" marginTop={"3px"}>
                  <InfoIcon fontSize="12px" />
                  {errors.Email.message}
                </Typography>
              )}
              {isTouchedAndDirty("Email") &&  !errors.Email  &&(
                <div
                  style={{color:"green",display: "flex",alignItems: "center" , marginTop:"3px"}}
                >
                  <CheckCircleIcon fontSize="6px" />
                  <Typography fontSize="12px" color="green" marginLeft="2px">
                  {t("Register.Success!")}
                  </Typography>
                </div>
              )}
            </FormControl>

            {/* Here for password */}
            <InputLabel className="label" htmlFor="username">
            {t("Register.Password")}
            </InputLabel>
            <FormControl fullWidth>
              <input
                style={{ height: "32px", marginBottom: "13px",paddingLeft:"8px" ,borderColor: isTouchedOrDirty("Password")
                  ? errors.Password
                    ? "red"
                    : "green"
                  : "inherit"}}
                id="password"
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

<div
            className="checkbox"
            style={{ fontSize: "13px", color: "rgb(79, 78, 78)" }}
        >
            <Checkbox
                {...register("privacyPolicy", {
                    required: {
                        value: true,
                        message: t("Register.privacy_policy_ErrorMsg"),
                    },
                })}
            />
            {t("Register.Accept_privacy_policy")}
            <a style={{ margin: "5px" }} href="/privacy-policy">{t("Register.privacy_policy")}</a>
            {errors.privacyPolicy && (
                <Typography color="red" fontSize={12}>
                    {errors.privacyPolicy.message}
                </Typography>
            )}
        </div>
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
                }}
              >
                {t("Register.Create_account")}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterForm;
