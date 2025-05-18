import React, { useState } from "react";
import { Button, FormControl, Grid, InputLabel, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userProfile = useSelector((state) => state.user.items)?.user;

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm();

  const [isFocused, setIsFocused] = useState(false);

  const isTouchedOrDirty = (name) => touchedFields[name] || dirtyFields[name];
  const isTouchedAndDirty = (name) => touchedFields[name] && dirtyFields[name];

  const validationStatus = (() => {
    const password = watch("Password") || "";
    return {
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLength: password.length >= 8 && password.length <= 20,
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password),
    };
  })();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const changedData = {
      oldPassword: data.OldPassword,
      password: data.Password,
    };
console.log(changedData);
    try {
      // Dispatch change password action
      // const res = await dispatch(changePassword(changedData)).unwrap();
      // localStorage.setItem("token", res.token);

      toast.success(t("ChangePassword.succes"), {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    } catch {
      toast.error(t("ChangePassword.error"), {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="change-password">
      <h1 className="Content-Profile-Page" style={{ fontSize: "1.2rem" }}>
        {t("ChangePassword.title")}
      </h1>
      <Grid className="login-form-page" marginTop={2} container spacing={5}>
        <Grid className="Content-Profile-Page" size={{ xs: 12, md: 6 }}>
          <p style={{ marginBottom: ".75rem" }}>
            {t("ChangePassword.description")}
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Current Password */}
            <InputLabel className="label" style={{marginTop:"10px"}}>{t("ChangePassword.currentPassword")}</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <input
                style={{
                  height: "32px",
                  paddingLeft: "8px",
                  borderColor: isTouchedOrDirty("OldPassword")
                    ? errors.OldPassword
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
                <Typography color="#ff1744" fontSize="12px" marginTop="3px">
                  <InfoIcon fontSize="12px" /> {errors.OldPassword.message}
                </Typography>
              )}
            </FormControl>

            {/* New Password */}
            <InputLabel className="label" style={{marginTop:"10px"}}>{t("ChangePassword.newPassword")}</InputLabel>
            <FormControl fullWidth>
              <input
                style={{
                  height: "32px",
                  marginBottom: "13px",
                  paddingLeft: "8px",
                  borderColor: isTouchedOrDirty("Password")
                    ? errors.Password
                      ? "red"
                      : "green"
                    : "inherit",
                }}
                id="NewPassword"
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
              {isTouchedOrDirty("Password") && errors.Password && (
                <Typography color="#ff1744" fontSize="12px" marginTop="3px">
                  <InfoIcon fontSize="12px" /> {errors.Password.message}
                </Typography>
              )}
              {isTouchedAndDirty("Password") && !errors.Password && (
                <div style={{ color: "green", display: "flex", alignItems: "center", marginTop: "3px" }}>
                  <CheckCircleIcon fontSize="6px" />
                  <Typography fontSize="12px" marginLeft="2px">
                    {t("Register.accept")}
                  </Typography>
                </div>
              )}
            </FormControl>

            {/* Password Validation Messages */}
            {isFocused && (
              <div className="Error-Message" my={4}>
                <Typography fontSize={12} marginTop={2}>
                  {t("Register.password_Contain")}
                </Typography>
                <Typography fontSize={12} color={validationStatus.hasLowercase ? "blue" : "red"} marginTop={2}>
                  {validationStatus.hasLowercase && <CheckIcon fontSize="12px" />} {t("Register.lowercase")}
                </Typography>
                <Typography fontSize={12} color={validationStatus.hasUppercase ? "blue" : "red"} marginTop={2}>
                  {validationStatus.hasUppercase && <CheckIcon fontSize="12px" />} {t("Register.uppercase")}
                </Typography>
                <Typography fontSize={12} color={validationStatus.hasLength ? "blue" : "red"} marginTop={2}>
                  {validationStatus.hasLength && <CheckIcon fontSize="12px" />} {t("Register.8characters")}
                </Typography>
                <Typography fontSize={12} color={validationStatus.hasSpecial ? "blue" : "red"} marginTop={2}>
                  {validationStatus.hasSpecial && <CheckIcon fontSize="12px" />} {t("Register.Special_character")}
                </Typography>
                <Typography fontSize={12} color={validationStatus.hasNumber ? "blue" : "red"} marginTop={2}>
                  {validationStatus.hasNumber && <CheckIcon fontSize="12px" />} {t("Register.number")}
                </Typography>
              </div>
            )}

            {/* Confirm New Password */}
            <InputLabel className="label" style={{marginTop:"10px"}} >{t("ChangePassword.confirmPassword")}</InputLabel>
            <FormControl fullWidth style={{ marginBottom: "10px" }}>
              <input
                style={{
                  height: "32px",
                  paddingLeft: "8px",
                  borderColor: isTouchedOrDirty("confirmPassword")
                    ? errors.confirmPassword
                      ? "red"
                      : "black"
                    : "inherit",
                }}
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: t("ChangePassword.confirmPasswordRequired"),
                  },
                  validate: (value) => value === getValues("Password") || t("ChangePassword.passwordsDoNotMatch"),
                })}
              />
              {isTouchedOrDirty("confirmPassword") && errors.confirmPassword && (
                <Typography color="#ff1744" fontSize="12px" marginTop="3px">
                  <InfoIcon fontSize="12px" /> {errors.confirmPassword.message}
                </Typography>
              )}
            </FormControl>

            {/* Submit Button */}
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
                padding: "12px",
                textTransform: "capitalize",
                marginBottom: "20px",
              }}
            >
              {t("ChangePassword.changePasswordButton")}
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangePassword;