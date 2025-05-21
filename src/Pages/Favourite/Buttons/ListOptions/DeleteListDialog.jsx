import { useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteListDialog({ open, onClose, onDelete, listName }) {
  const navigate = useNavigate();
   const location = useLocation();

  const handleDelete = async () => {
    try {
      // Call the original onDelete function
      await onDelete();

      // Store the notification message in localStorage
      localStorage.setItem(
        "snackbarMessage",
        `List "${listName}" has been deleted successfully!`
      );
      localStorage.setItem("snackbarSeverity", "success");

      // Close the dialog
      onClose()
        // Otherwise navigate to FavouriteWithLists component
        if (location.pathname === "/favourite-lists") {
          // window.location.reload(); // Reload the page
        } else {
          navigate("/favourite-lists");
        }
    } catch (error) {
      console.error("Error deleting list:", error);

      // Store error message in sessionStorage
      localStorage.setItem(
        "snackbarMessage",
        "Failed to delete list. Please try again."
      );
      localStorage.setItem("snackbarSeverity", "error");
      // Close the dialog
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: "300px",
          px: 1,
          py: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem", pb: 1 }}>
        Should we remove your list?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#333", pb: 0 }}>
          The list named '<strong>{listName}</strong>' with all items will be
          removed. Once the list is removed it can't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-evenly",
          pt: 0,
          mb: 1,
        }}
      >
        <Button
          onClick={handleDelete}
          variant="contained"
          sx={{
            bgcolor: "#000",
            color: "#fff",
            px: 10,
            py: 1.4,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          Remove
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            px: 10,
            py: 1.4,
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: "bold",
            color: "black",
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
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteListDialog;
