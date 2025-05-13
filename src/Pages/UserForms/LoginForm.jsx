import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  InputLabel,
  Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../Store/Slices/userSlice";
// import "./UserForms.css";
import "../../Pages/UserForms/UserForms.css";
import { useTranslation } from "react-i18next";
import ErrorMsg from "./ErrorMsg";
const LoginForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm();

  const isTouchedOrDirty = (name) => touchedFields[name] || dirtyFields[name];
  const isTouchedAndDirty = (name) => touchedFields[name] && dirtyFields[name];
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 const SubmitErrorMsg="The email address or password you entered is incorrect or the account does not exist in IKEA Egypt"
const onSubmit = async (data,e) => {
  e.preventDefault();
  const loginData = {
            email: data.Email,
            password: data.Password
        };

  try {
     const res = await dispatch(loginUser(loginData)).unwrap();
      localStorage.setItem('token', res.token);
      localStorage.setItem('user',res.role);
      navigate('/');
  } catch {
      alert('Login failed');
  }
};
  const Label = "Email address or phone number";
  return (
    <div>
      <Grid className="login-form-page" marginTop={5} container spacing={2}>
        <Grid className="Content-login-Page" size={{ xs: 12, md: 5 }}>
          <h2>{t("Login.LoginAccount")}</h2>
          <Grid container className="Login-Link d-flex">
            <Grid
              fontSize={13}
              className="loginIntro"
              color="#616161"
              size={{ xs: 5, sm: 6, md: 8 }}
            >
             {t("Login.LoginAccount_details")}
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
                {t("Login.LoginIKEA")}
              </h4>
            </Grid>
            {/* <div>
              <ErrorMsg Msg={SubmitErrorMsg}/>
            </div> */}
            
            {/* Here for userName */}
            <InputLabel className="label" htmlFor="username">
            {t("Login.Email")}
            </InputLabel>
            <FormControl fullWidth style={{ marginBottom: "14px" }}>
              <input
                style={{
                  height: "32px",
                  paddingLeft: "8px",
                  borderColor: isTouchedOrDirty("Email")
                    ? errors.Email
                      ? "red"
                      : "green"
                    : "inherit",
                }}
                id="username"
                type="email"
                {...register("Email", {
                  required: {
                    value: true,
                    message: t("Login.EmailEmpty"),
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.±]+@gmail.com$/,
                    message: t("Login.EmailValid"),
                  },
                })}
              />
              {isTouchedOrDirty("Email") && errors.Email && (
                <div  style={{ display: "flex", color: "#ff1744" }}>
                  <InfoIcon fontSize="12px" />
                  <Typography fontSize="12px">
                    {errors.Email.message}
                  </Typography>
                </div>
              )}
              {isTouchedAndDirty("Email") && !errors.Email && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "green",
                  }}
                >
                  <CheckCircleIcon fontSize="6px" />
                  <Typography fontSize="12px" color="green" marginLeft="2px">
                  {t("Login.accept")}
                  </Typography>
                </div>
              )}
            </FormControl>

            {/* Here for password */}
            <InputLabel className="label">{t("Login.Password")}</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <input
                style={{
                  height: "32px",
                  paddingLeft: "8px",
                  borderColor: isTouchedOrDirty("Password")
                    ? errors.Password
                      ? "red"
                      : "green"
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
                <div style={{ display: "flex", color: "#ff1744" }}>
                  <InfoIcon fontSize="12px" />
                  <Typography fontSize="12px">
                    {errors.Password.message}
                  </Typography>
                </div>
              )}
              {isTouchedAndDirty("Password") && !errors.Password && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                     color:"green",

                  }}
                >
                  <CheckCircleIcon fontSize="6px" margin="0px" />
                  <Typography fontSize="12px" color="green" marginLeft="2px">
                  {t("Login.PasswordAccept")}
                  </Typography>
                </div>
              )}
            </FormControl>
            <a> {t("Login.Forget_password?")}</a>
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
                 {t("Login.login")}
              </Button>
            </div>
            <Grid
              className="SignWith"
              style={{ marginTop: "15px" }}
              size={{ xs: 12, md: 12 }}
            >
              <span>{t("Login.New_IKEA?")} </span>
            </Grid>
            <Grid size={{ sm: 12, md: 12 }} style={{}}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginTop: "18px",
                  color: "black",
                  className: "formButton",
                  backgroundColor: "white",
                  fontSize: "12px",
                  fontWeight: 660,
                  borderRadius: "20px",
                  padding: "12px ",
                  border: "1px solid black",
                  boxShadow: "none",
                  textTransform: "capitalize",
                }}
                onClick={() => navigate("/signup")}
              >
               {t("Login.Create_account")}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginForm;
