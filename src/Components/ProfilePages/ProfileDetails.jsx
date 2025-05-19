import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import PenSVG from "../../Pages/Profile/penSVG";
import EditModel from "./EditModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Store/Slices/userSlice";
import { useTranslation } from "react-i18next";
const ProfileDetails = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userProfile = useSelector((state) => state.user.items).user;
  // console.log(userProfile);

  const fullName = userProfile?.name || "";
  const [firstName = "", lastName = ""] = fullName.trim().split(" ");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch, userProfile]);

  return (
    <div>
      <div className="Content-Profile-Page" style={{marginTop:"80px"}}>
        <h4 style={{ fontSize: "1.2rem", marginBottom: "-5px" }}>
          {t("PD.profile_Details")}
        </h4>
      </div>
      <Grid className="login-form-page" marginTop={2} container spacing={5}>
        <Grid className="Content-Profile-Page" size={{ xs: 12, md: 5 }}>
          <div
            className="Profile-Details"
            style={{
              border: ".5px solid rgb(212, 211, 211)",
              borderRadius: "3px",
            }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 10, md: 9 }} marginTop={2}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: ".9rem",
                    marginBottom: "5px",
                  }}
                >
                  {t("PD.Personal-info")}
                </p>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <button
                  className="profile-edit-btn"
                  style={{
                    background: "white",
                    fontWeight: "bold",
                    fontSize: ".7rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <PenSVG fontSize="12px" />
                  <span style={{ marginLeft: "5px", marginTop: "5px" }}>
                    {t("PD.Edit")}
                  </span>
                </button>
              </Grid>
            </Grid>
            {/* Rest of the div */}
            <p className="Profile-details-info" style={{ fontSize: ".7rem" }}>
              {userProfile?.name}
            </p>
            <p
              className="Profile-details-info"
              style={{
                fontSize: ".7rem",
                paddingBottom: "20px",
                borderBottom: "1px solid rgb(212, 211, 211)",
              }}
            >
              {userProfile?.email}
            </p>
            <Grid container spacing={2}>
              <Grid size={{ xs: 10, md: 9 }} style={{ marginTop: "18px" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: ".9rem",
                    marginBottom: "5px",
                  }}
                >
                  {t("PD.Preferred_store")}
                </p>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <button
                  className="profile-edit-btn"
                  style={{
                    background: "white",
                    fontWeight: "bold",
                    fontSize: ".7rem",
                    cursor: "pointer",
                    marginBottom: "5px",
                  }}
                >
                  <PenSVG fontSize="12px" />
                  <span style={{ marginLeft: "5px", marginTop: "5px" }}>
                    {t("PD.Edit")}
                  </span>
                </button>
              </Grid>
            </Grid>

            <p
              style={{
                fontSize: ".7rem",
                fontWeight: "bold",
                textDecoration: "underline",
                color: "rgb(81, 81, 81)",
              }}
            >
              {t("PD.IKEA_Cairo")}
            </p>
            <p
              className="Profile-details-info"
              style={{ fontSize: ".7rem", marginBottom: "15px" }}
            >
              {t("PD.Ring_Road")}
            </p>
            <p className="Profile-details-info" style={{ fontSize: ".7rem" }}>
              {t("PD.Selecting_preferred")}
            </p>
          </div>
        </Grid>
        <Grid
          className="Content-Profile-Page"
          paddingLeft={2}
          size={{ xs: 12, md: 7 }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: ".9rem",
              marginBottom: "5px",
              marginTop: "-2px",
            }}
          >
            {t("PD.Addresses")}
          </p>
          <p
            className="Profile-details-info"
            style={{ fontSize: ".7rem", marginBottom: "5px" }}
          >
            {t("PD.Manage_your_addresses")}
          </p>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <button
                className="profile-edit-btn"
                style={{
                  background: "white",
                  padding: "10px 0px",
                  fontWeight: "bold",
                  fontSize: ".7rem",
                  cursor: "pointer",
                }}
              >
                {t("PD.Add_address")}
              </button>
            </Grid>
          </Grid>
          <p
            className="Profile-details-info "
            style={{
              fontSize: ".7rem",
              marginBottom: "5px",
              marginTop: "20px",
            }}
          >
            {userProfile?.homeAddress || "No addresses added"}{" "}
          </p>
        </Grid>
      </Grid>
      {/* Modal */}

      {isModalOpen && (
        <EditModel
          style={{ backgroundColor: "[rgba(0,0,0,0.2)" }}
          setIsModalOpen={setIsModalOpen}
          firstName={firstName}
          lastName={lastName}
          gender={userProfile?.gender}
        />
      )}
    </div>
  );
};

export default ProfileDetails;
