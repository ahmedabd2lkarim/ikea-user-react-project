import { Chip } from "@mui/material";
function CreateListButton({ onClick }) {
  return (
    <Chip
      label="Create a new list"
      onClick={onClick}
      clickable
      sx={{
        backgroundColor: "black",
        color: "#fff",
        px: { xs: 0.5, sm: 1.5, md: 1 },
        py: { xs: 1, sm: 1.5, md: 2.7 },
        fontSize: { xs: 10, sm: 12, md: 13},
        fontWeight: "bold",
        borderRadius: 35,
        width: { md: "12%", sm: "30%", xs: "100%" },
        "&:hover": {
          backgroundColor: "#343a40",
        },
        "& .MuiChip-icon": {
          color: "#fff",
        },
      }}
    />
  );
}

export default CreateListButton;
