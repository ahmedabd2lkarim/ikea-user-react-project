import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BackToListButton() {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      onClick={() => navigate("/favourite-lists")}
      sx={{
        borderRadius: "25px",
        py: 0.8,
        textTransform: "none",
        fontWeight: "normal",
        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
        color: "black",
        px: {
          xs: 2,
          md: 3.5,
        },
        border: "1px solid black",
        backgroundColor: "transparent",
        transition: "box-shadow 0.1s ease, border-color 0.3s ease",
        "&:hover": {
          boxShadow: "0 0 0 1.3px black",
          borderColor: "black",
          backgroundColor: "transparent",
        },
      }}
    >
      Back to lists
    </Button>
  );
}

export default BackToListButton;
