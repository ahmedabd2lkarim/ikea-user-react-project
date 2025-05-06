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
const LoginFormEnglish = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm();

  const isTouchedOrDirty = (name) => touchedFields[name] || dirtyFields[name];
  const isTouchedAndDirty = (name) => touchedFields[name] && dirtyFields[name];
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
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
          <h2>Log in to your account</h2>
          <Grid container className="Login-Link d-flex">
            <Grid
              fontSize={13}
              className="loginIntro"
              color="#616161"
              size={{ xs: 5, sm: 6, md: 8 }}
            >
              Get a more personalised experience where you don’t need to fill in
              your information every time
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
                Log in or join IKEA today to benefit from a more personalized
                experience
              </h4>
            </Grid>
            {/* Here for userName */}
            <InputLabel className="label" htmlFor="username">
              Email(username)
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
                    message: "The email (username) field cannot be left empty",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.±]+@gmail.com$/,
                    message: "Please enter a valid email",
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
                    Way to go!
                  </Typography>
                </div>
              )}
            </FormControl>

            {/* Here for password */}
            <InputLabel className="label">Password</InputLabel>
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
                    message: "The password field cannot be left empty",
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
                    Well done!
                  </Typography>
                </div>
              )}
            </FormControl>
            <a>Forget your password?</a>
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
                Log in
              </Button>
            </div>
            <Grid
              className="SignWith"
              style={{ marginTop: "15px" }}
              size={{ xs: 12, md: 12 }}
            >
              <span>New at IKEA? </span>
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
              >
                Create account
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginFormEnglish;
