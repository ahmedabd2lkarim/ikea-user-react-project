import { Fragment} from "react";
import { Box, Typography, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreateListManager from "../Buttons/CreateNewListButton/CreateListManager";

import LoginButton from '../Buttons/LoginButton'
function EmptyOrNotLogin() {

  const isLoggedIn = !!localStorage.getItem("token");
  const features = [
    {
      icon: <FavoriteBorderIcon fontSize="medium" />,
      text: "Use the heart icon to save products",
    },
    {
      icon: <ListAltIcon fontSize="medium" />,
      text: "Save your products to different lists",
    },
    {
      icon: <PersonOutlineIcon fontSize="medium" />,
      text: "Join or log in to view saved lists on different devices",
    },
  ];

  return (
    <Fragment>
      <Box sx={{ m: { xs: 3, sm: 4, md: 5, lg: 6 } }}>
        {/* Main Heading */}
        <Typography variant="h4" fontWeight={700} gutterBottom>
          You don’t seem to have any favourites yet
        </Typography>

        {/* Subheading */}
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          mt={2}
          maxWidth={600}
        >
          Save and arrange the best bits of your future home here until you’re
          ready for them.
        </Typography>

        {/* Features List */}
        <Stack spacing={3}>
          {features.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <span className="me-3">{item.icon}</span>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Action Buttons */}
        <Stack
          spacing={{ xs: 2, sm: 3, md: 4 }}
          direction={"row"}
          sx={{
            marginTop: "40px",
            justifyContent: "flex-start",
          }}
        >
          {!isLoggedIn && <LoginButton />}
          <CreateListManager />
        </Stack>
      </Box>
    </Fragment>
  );
}

export default EmptyOrNotLogin;
