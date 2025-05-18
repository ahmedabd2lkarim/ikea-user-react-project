
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ListHeader({ listName, handleClose }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box sx={{ width: 24 }} />
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, flexGrow: 1, textAlign: "center" }}
      >
        {listName || "Unnamed List"}
      </Typography>
      <IconButton onClick={handleClose} sx={{ p: 0, color: "#000" }}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default ListHeader;
