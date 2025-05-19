import { Fragment} from "react";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
function LoginButton() {
  const navigate = useNavigate();
  return (
    <Fragment>
      {/* Log In Chip Button */}
      <Chip
        label="Log In"
        onClick={() => navigate("/login")}
        clickable
        sx={{
          backgroundColor: "#fff",
          color: "#212529",
          px: { xs: 0.5, sm: 1.5, md: 1 },
          py: { xs: 0.5, sm: 1, md: 2.4 },
          fontSize: { xs: 11, sm: 13, md: 14 },
          fontWeight: "bold",
          borderRadius: 35,
          border: "2px solid #212529",
          transition: "all 0.1s ease-in-out",
          width: { md: "12%", sm: "30%", xs: "100%" },
          "&:hover": {
            borderWidth: "2.5px",
            backgroundColor: "#fff",
          },
        }}
      />
    </Fragment>
  );
}

export default LoginButton;
