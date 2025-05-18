import { Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function ListActions({ listIsEmpty, showFavouriteBody, handleAddAllToCart }) {
  if (listIsEmpty || showFavouriteBody) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Button
        fullWidth
        variant="contained"
        startIcon={<ShoppingCartIcon />}
        sx={{
          py: 1.5,
          borderRadius: 8,
          backgroundColor: "#0066c0",
          textTransform: "none",
          fontSize: 16,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#005499",
          },
        }}
        onClick={handleAddAllToCart}
      >
        Add all items to bag
      </Button>
    </Box>
  );
}

export default ListActions;
