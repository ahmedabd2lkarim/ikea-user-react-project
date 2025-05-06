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

const RegisterForm = () => {
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
 
  const onSubmit = async (data,e) => {
    e.preventDefault();
    const newUser = {
          name: data.firstName + " " + data.lastName,
          email: data.Email,
          password: data.Password,
          mobileNumber:"1111",
          homeAddress:"Egypt"
        }
  
    try {
       const res = await dispatch(registerUser(newUser)).unwrap();
        localStorage.setItem('token', res.token);
        localStorage.setItem('user',res.role);
        navigate('/');
    } catch {
        alert('Register failed');
    }
  };

  const Label = "Email address or phone number";
  // const checkbox = { inputProps: { "aria-label": "Checkbox demo" } };
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
          <h2>Create an IKEA account</h2>
          <Grid container className="Login-Link d-flex">
            <Grid
              fontSize={13}
              className="loginIntro"
              color="#616161"
              size={{ xs: 5, sm: 6, md: 8 }}
            >
              Already have an account?
              <a
                href="/login"
                style={{ textDecoration: "underline", marginLeft: "4px" }}
              >
                Log in here
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
                From your profile, you will find all information connected to
                your account.
              </h4>
              {/* <h4 style={{fontSize: "14px",fontWeight: 650,marginBottom: "30px"}}>And it’s free to join!</h4>  */}
            </Grid>

            <InputLabel className="label">First name</InputLabel>
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
                    message: "The first name field cannot be left empty",
                  },
                })}
              />
              {isTouchedOrDirty("firstName") && errors.firstName && (
                <Typography color="#ff1744" fontSize="12px">
                  <InfoIcon fontSize="12px" />
                  {errors.firstName.message}
                </Typography>
              )}
              {isTouchedAndDirty("firstName") && !errors.firstName && (
                <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color:"green"
                  }}
                >
                  <CheckCircleIcon fontSize="6px" />
                  <Typography fontSize="12px" marginLeft="2px">
                    Approved!
                  </Typography>
                </div>
              )}
            </FormControl>

            <InputLabel className="label">Last name</InputLabel>
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
                    message: "The last name field cannot be left empty",
                  },
                })}
              />
              {isTouchedOrDirty("lastName") && errors.lastName && (
                <Typography color="#ff1744" fontSize="12px">
                  <InfoIcon fontSize="12px" />
                  {errors.lastName.message}
                </Typography>
              )}
              {isTouchedAndDirty("lastName") && !errors.lastName && (
               <div
               style={{
                 display: "flex",
                 alignItems: "center",
                 color:"green"
                 }}
               >
                 <CheckCircleIcon fontSize="6px" />
                 <Typography fontSize="12px" marginLeft="2px">
                   Approved!
                 </Typography>
               </div>
              )}
            </FormControl>

            {/* Here for userName */}
            <InputLabel className="label" htmlFor="username">
              Email address
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
                    message: "The email (username) field cannot be left empty",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.±]+@gmail.com$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {isTouchedOrDirty("Email") &&  errors.Email &&(
                
                <Typography color="#ff1744" fontSize="12px">
                  <InfoIcon fontSize="12px" />
                  {errors.Email.message}
                </Typography>
              )}
              {isTouchedAndDirty("Email") &&  !errors.Email  &&(
                <div
                  style={{color:"green",display: "flex",alignItems: "center"}}
                >
                  <CheckCircleIcon fontSize="6px" />
                  <Typography fontSize="12px" color="green" marginLeft="2px">
                  Success!
                  </Typography>
                </div>
              )}
            </FormControl>

            {/* Here for password */}
            <InputLabel className="label" htmlFor="username">
              Password
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
                    message: "The password field cannot be left empty",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                    message: "Password must contain at least one lowercase letter, one uppercase letter, and one special character.",
                },
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must not exceed 20 characters",
                  },
                })}
              onFocus={() => setIsFocused(true)}
              />
              {isTouchedOrDirty("Password") &&  errors.Password &&(
                
                <Typography color="#ff1744" fontSize="12px">
                  <InfoIcon fontSize="12px" />
                  {errors.Password.message}
                </Typography>
              )}
              {isTouchedAndDirty("Password") &&  !errors.Password  &&(
                <div
                  color="green"
                  style={{color:"green",display: "flex",alignItems: "center"}}
                >
                  <CheckCircleIcon fontSize="6px" />
                  <Typography fontSize="12px" marginLeft="2px">
                  Way to go!
                  </Typography>
                </div>
              )}
            </FormControl>
           {isFocused && (
                <div className="Error-Message">
                    <Typography fontSize={12} marginTop={2}>Your password must contain</Typography>
                    <Typography fontSize={12} color={validationStatus.hasLowercase.textColor} marginTop={2}>
                        {validationStatus.hasLowercase.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        A lowercase letter (a-z)
                    </Typography>
                    <Typography fontSize={12} color={validationStatus.hasUppercase.textColor} marginTop={2}>
                        {validationStatus.hasUppercase.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        A uppercase letter (A-Z)
                    </Typography>
                    <Typography fontSize={12} color={validationStatus.hasLength.textColor} marginTop={2}>
                        {validationStatus.hasLength.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        8-20 characters
                    </Typography>
                    <Typography fontSize={12} color={validationStatus.hasSpecial.textColor} marginTop={2}>
                        {validationStatus.hasSpecial.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        Special character
                    </Typography>
                    <Typography fontSize={12} color={validationStatus.hasNumber.textColor} marginTop={2}>
                        {validationStatus.hasNumber.iconVisible && <CheckIcon fontSize="12px" color="green" />}
                        A number
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
                        message: "You must have read and accepted the privacy policy",
                    },
                })}
            />
            I have read and understood the
            <a style={{ margin: "5px" }} href="/privacy-policy">privacy policy</a>
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
                Create account
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterForm;
