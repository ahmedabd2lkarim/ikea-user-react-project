// import React, { useState } from "react";
import {
  InputLabel,
  FormControl,
  Typography,Select,MenuItem,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../../Pages/UserForms/UserForms.css";
import { useForm } from "react-hook-form";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const EditModel = ({firstName , lastName ,setIsModalOpen }) => {
  const {
    register,
    handleSubmit,setValue,
    watch,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({
    defaultValues: {
      firstName:firstName,  
      lastName: lastName || "", // initial value
    },
  });

  const isTouchedOrDirty = (name) => touchedFields[name] || dirtyFields[name];
  const isTouchedAndDirty = (name) => touchedFields[name] && dirtyFields[name];
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      const updatedUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        // Add other fields if needed
      };
  
      // Assuming `userId` is available from props or state
      await dispatch(editUserInDB({ updatedUser })).unwrap();
  
      console.log("User updated successfully:", updatedUser);
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(false); // Close modal on cancel
  };


useEffect(() => {
    setValue("lastName", lastName || "");
    setValue("firstName", firstName || "");
  }, [firstName,lastName, setValue]);

  const selectedGender = watch("gender", "");
  return (
    <div className="modal" style={{borderRadius:"7px 0 7px 0",backgroundColor:"[rgba(0,0,0,0.2)"}}>
      <div className="modal-content">
        <div
          className="modal-header"
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <h5>Edit personal information</h5>
        </div>
        <form size={{ md: 10 }} onSubmit={handleSubmit(onSubmit)} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* First Name */}
          <InputLabel htmlFor="firstName" style={{fontSize:".7rem"}} className="label">First Name</InputLabel>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <input
              id="firstName"
              type="text"
              required
              {...register("firstName", {
                required: {
                  value: true,
                  message: "The first name field cannot be left empty",
                },
              })}
              style={{
                height: "32px",
                paddingLeft: "8px",
                borderColor: isTouchedOrDirty("firstName")
                  ? errors.firstName
                    ? "red"
                    : "green"
                  : "inherit",
              }}
            />
            {isTouchedOrDirty("firstName") && errors.firstName && (
              <Typography color="#ff1744" fontSize="12px">
                <InfoIcon fontSize="small" /> {errors.firstName.message}
              </Typography>
            )}
            {isTouchedAndDirty("firstName") && !errors.firstName && (
              <div style={{ display: "flex", alignItems: "center", color: "green" }}>
                <CheckCircleIcon fontSize="small" />
                <Typography fontSize="12px" marginLeft="2px">Approved!</Typography>
              </div>
            )}
          </FormControl>
          {/* Last Name */}
          <InputLabel htmlFor="lastName" style={{fontSize:".7rem"}} className="label">Last Name</InputLabel>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <input
              id="lastName"
              type="text"
              required
              {...register("lastName", {
                required: {
                  value: true,
                  message: "The last name field cannot be left empty",
                },
              })}
              style={{
                height: "32px",
                paddingLeft: "8px",
                borderColor: isTouchedOrDirty("lastName")
                  ? errors.lastName
                    ? "red"
                    : "green"
                  : "inherit",
              }}
            />
            {isTouchedOrDirty("lastName") && errors.lastName && (
              <Typography color="#ff1744" fontSize="12px">
                <InfoIcon fontSize="small" /> {errors.lastName.message}
              </Typography>
            )}
            {isTouchedAndDirty("lastName") && !errors.lastName && (
              <div style={{ display: "flex", alignItems: "center", color: "green" }}>
                <CheckCircleIcon fontSize="small" />
                <Typography fontSize="12px" marginLeft="2px">Approved!</Typography>
              </div>
            )}
          </FormControl>

          <InputLabel htmlFor="gender" style={{fontSize:".7rem"}} className="label">
            Gender
          </InputLabel>
          <FormControl fullWidth style={{ marginBottom: "50px" }}>
            <Select
              id="gender"
              value={selectedGender}
              onChange={(e) => setValue("gender", e.target.value)}
              displayEmpty
              style={{
                height: "32px",
                paddingLeft: "8px",
                fontSize:".8rem",
                border: ".5px solid rgb(43, 43, 43)",
                borderColor: isTouchedOrDirty("gender")
                  ? errors.gender
                    ? "red"
                    : "green"
                  : "inherit",
              }}
            >
              <MenuItem style={{fontSize:".8rem"}} value="" disabled>
                Choose an option
              </MenuItem>
              <MenuItem style={{fontSize:".8rem"}} value="male">Prefer not to say</MenuItem>
              <MenuItem style={{fontSize:".8rem"}} value="male">Male</MenuItem>
              <MenuItem style={{fontSize:".8rem"}} value="female">Female</MenuItem>
              <MenuItem style={{fontSize:".8rem"}} value="other">Other</MenuItem>
            </Select>
           
          </FormControl>

          <div style={{ borderTop: ".5px solid rgb(212, 211, 211)", paddingTop: "10px" }}>
            <Grid className="login-form-page" marginTop={2} container>
              <Grid size={{ xs: 12, md: 1 }}>
                <InfoOutlineIcon style={{ fontSize: "18px", color: "rgb(2, 107, 173)" }} />
              </Grid>
              <Grid size={{ xs: 12, md: 11 }} style={{ fontSize: ".7rem" }}>
                The information below is linked to your account and, for security reasons, cannot be changed.
              </Grid>
            </Grid>
            <div style={{ marginTop: "20px", backgroundColor: "rgb(238, 238, 238)", padding: "6px", borderRadius: "5px" }}>
              <label style={{ fontSize: ".8rem", marginLeft: "5px", color: "rgb(77, 77, 77)" }}>sohagamal@gmail.com</label>
            </div>
          </div>

          {/* Action Buttonsstyle={{ borderTop: ".5px solid rgb(212, 211, 211)", paddingTop: "10px" }} */}
       
          <Grid className="login-form-page" spacing={3} marginTop={2} container 
          style={{borderTop: ".5px solid rgb(212, 211, 211)", paddingTop: "10px" , marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
              <Grid size={{ xs: 12, md: 6 }}>
              <button
              type="submit" 
            //   className="modal-edit-btn"
            //   onClick={handleSubmit(onSubmit)}
              style={{
                backgroundColor:"black",
                color:"white",
                fontSize:".7rem",
                fontWeight:"bold",
                borderRadius:"60px",
                padding: "15px 20px",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Save
            </button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} style={{ fontSize: ".7rem" }}>
              <button
              onClick={handleCancelClick}
              style={{
                backgroundColor:"white",
                
                fontSize:".7rem",
                fontWeight:"bold",
                borderRadius:"60px",
                padding: "15px 20px",
                border: "1px solid black",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Cancel
            </button>
              </Grid>
            </Grid>
       
         
        </form>
      </div>
    </div>
  );
};

export default EditModel;
