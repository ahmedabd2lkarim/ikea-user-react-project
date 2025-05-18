import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

function FavoriteToggleButton({ isFavorite, onToggle }) {
  return (
    <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
      <IconButton
        onClick={onToggle}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(61, 7, 7, 0.08)",
          },
          transition: "transform 0.2s",
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        {isFavorite ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <FavoriteBorder sx={{ color: "black" }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
export default FavoriteToggleButton;
