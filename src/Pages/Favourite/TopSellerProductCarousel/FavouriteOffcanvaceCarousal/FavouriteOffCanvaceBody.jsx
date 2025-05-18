import { useEffect, useState } from "react";
import axios from "axios";
import { Offcanvas } from "react-bootstrap";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateListOffcanvas from "../../Buttons/CreateNewListButton/CreateListOffcanvas";
import { useNavigate } from "react-router-dom";
import { clearSnackbarMessage } from "../../../../Store/Slices/createUpdateListSlice";
import { useSelector, useDispatch } from "react-redux";
function FavouriteOffCanvaceBody({
  show,
  handleClose,
  product,
  onAddToList,
  onBack,
  currentListId = null,
}) {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateList, setShowCreateList] = useState(false);
  const [favouritesVisible, setFavouritesVisible] = useState(show);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const snackbarMessage = useSelector(
    (state) => state.createUpdateList.snackbarMessage
  );
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token")
  useEffect(() => {
    if (snackbarMessage) {
      setOpen(true);
    }
  }, [snackbarMessage]);

  const handleSnackbarClose = () => {
    setOpen(false);
    dispatch(clearSnackbarMessage());
  };

  useEffect(() => {
    setFavouritesVisible(show);
  }, [show]);

  // Fetch favorites when visible
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/favourites", {
        headers: {
          Authorization: token,
        },
      });
      const lists = response.data.lists || response.data;
      setFavourites(lists);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (favouritesVisible) {
      fetchFavorites();
    }
  }, [favouritesVisible]);

  const isProductInList = (list) => {
    return list.items?.some((item) => item._id === "6827d89a1af3522bce002c2c");
  };

  

  const handleAddProductToList = async (listId, listName) => {
    if (onAddToList) {
      try {
        // Let the parent component handle the API call
        await onAddToList(listId, listName);

        localStorage.setItem(
          "snackbarMessage",
          `${product.name} has been added to "${listName}"`
        );
        localStorage.setItem("snackbarSeverity", "success");

        // Close the offcanvas
        handleFavouritesClose();

         if (location.pathname === "/favourite-lists") {
           window.location.reload(); // Reload the page
         } else {
           navigate("/favourite-lists");
         }


      } catch (error) {
        console.error("Error adding product to list:", error);
        // Show error messag
      }
    }
  };

 
  // Handle closing the favourites offcanvas
  const handleFavouritesClose = () => {
    setFavouritesVisible(false);
    if (handleClose) {
      handleClose();
    }
  };

  // Handler for opening the CreateListOffcanvas
  const handleCreateNewList = () => {
    setFavouritesVisible(false); // Hide favourites canvas
    setShowCreateList(true); // Show create list canvas
  };

  // Handler for when CreateListOffcanvas is closed without creating a list
  const handleCreateListClose = () => {
    setShowCreateList(false); // Hide create list canvas
    setFavouritesVisible(true); // Show favourites canvas again
  };


  // Handler for back button in CreateListOffcanvas
  const handleCreateListBack = () => {
    setShowCreateList(false);
    setFavouritesVisible(true);
  };

  // Filter out lists that should not be displayed
  const filteredFavourites = favourites.filter((list) => {
    return list._id !== currentListId && !isProductInList(list);
  });

  return (
    <>
      {/* Favourites Offcanvas */}
      <Offcanvas
        show={favouritesVisible}
        onHide={handleFavouritesClose}
        placement="end"
        backdrop={true}
        style={{
          width: "35%",
          padding: "20px",
          zIndex: 2000,
        }}
        className="favourite-offcanvas"
      >
        <Offcanvas.Header>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
        
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                flexGrow: 1,
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              Save {product?.name}
            </Typography>
            <IconButton onClick={handleFavouritesClose}>
              <CloseIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Offcanvas.Header>

        <Offcanvas.Body style={{ paddingBottom: "80px" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: 3 }}
          >
            Which list should we save {product?.name} to?
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
              <CircularProgress />
            </Box>
          ) : filteredFavourites.length === 0 ? (
            <Typography sx={{ textAlign: "center", fontSize: "1.2rem" }}>
              {favourites.length === 0
                ? "You have no favourite lists yet."
                : "No other lists available to add this product to."}
            </Typography>
          ) : (
            <Stack spacing={2}>
              {filteredFavourites.map((list) => (
                <Box
                  key={list._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    p: 2,
                    cursor: "pointer",
                    transition: "0.2s",
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  onClick={() => handleAddProductToList(list._id, list.name)}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "5px",
                      fontSize: "1.5rem",
                    }}
                  >
                    {list.items?.length > 0 ? "📋" : "🆕"}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">{list.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {list.items?.length || 0} items
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          )}

          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 0,
              width: "100%",
              px: 2,
            }}
          >
            <Chip
             
              label="Create new list"
              variant="outlined"
              clickable
              onClick={handleCreateNewList}
              sx={{
                width: "100%",
                borderRadius: "25px",
                fontSize: "1rem",
                border: "1px solid black",
                py: 3,
                "& .MuiChip-icon": {
                  color: "black",
                },
                "&:hover": {
                  backgroundColor: "white",
                  border: "2px solid black",
                },
              }}
            />
          </Box>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Create List Offcanvas */}
      <CreateListOffcanvas
        show={showCreateList}
        onHide={handleCreateListClose}
        mode="create"
        placement="end"

        onBack={handleCreateListBack}
        navigatingToAnotherList={true}
      />

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}

export default FavouriteOffCanvaceBody;
