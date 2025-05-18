import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
function FavouriteButton({ onClick }) {
  return (
    <IconButton onClick={onClick}>
      <FavoriteBorderIcon />
    </IconButton>
  );
}
export default FavouriteButton;
