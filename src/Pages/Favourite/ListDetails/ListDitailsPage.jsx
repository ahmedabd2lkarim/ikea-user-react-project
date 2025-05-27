import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFavourites,
  deleteProductFromList,
  selectListById,
} from "../../../Store/Slices/createUpdateListSlice";
import BackToListButton from "../Buttons/BackToListButton";
import ListOptionsButton from "../Buttons/ListOptions/ListOptionsButton";
import { toast } from "react-toastify";

function ListDetailsPage() {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const [open, setOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const list = useSelector((state) => selectListById(state, listId));
  const loading = useSelector(
    (state) => state.createUpdateList.status === "loading"
  );

  const handleClickOpen = (itemId) => {
    setItemIdToDelete(itemId);
    setOpen(true);
  };

  const handleAddToCard = async (productId) => {
    try {
      fetch("http://localhost:5000/api/cart/cartOP", {
        method: "PATCH",
        body: JSON.stringify({
          prdID: productId,
          quantity: 1,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding item to cart.");
    }
  }
  const handleClose = () => {
    setOpen(false);
    setItemIdToDelete(null);
  };

  const confirmDelete = () => {
    if (itemIdToDelete) {
      handleDelete(itemIdToDelete);
    }
    setOpen(false);
    setItemIdToDelete(null);
  };

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProductFromList({ listId, productId }));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!list) {
    return <Typography>Error loading list details.</Typography>;
  }

  if (!list.items || list.items.length === 0) {
    return (
      <>
        <Box sx={{ m: "4%" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: "2%" }}>
            {list.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              py: 3,
            }}
          >
            <BackToListButton />
            <ListOptionsButton list={list} />
          </Box>

          <Typography
            variant="body1"
            sx={{ color: "#555", maxWidth: 600, fontSize: "0.9rem" }}
          >
            This list is currently empty. Look around to find items you’d like
            to compare to save for your future home. We’ll keep them here until
            you’re ready for them.
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ m: "4%" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: "2%",
          fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        {list.name}
      </Typography>

      <Grid container spacing={4} sx={{ width: "100%" }}>
        {/* Left Column - Items */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            width: {
              xs: "100%",
              sm: "60%",
            },
          }}
        >
          {/* Back to Lists */}
          <Box
            sx={{
              mb: "4%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BackToListButton />
            <Box sx={{ flexGrow: 1 }} />
            <ListOptionsButton list={list} />
          </Box>

          {/* --------------------------------- */}

          {list.items.map((item) => (
            <Box key={item.id} sx={{ mb: 3 }}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Product Image */}
                <Grid item xs={4} sm={3} sx={{ m: "1%", mx: "0" }}>
                  <Box
                    component="img"
                    src={item.contextualImageUrl}
                    alt={item.name}
                    sx={{
                      width: "100%",
                      objectFit: "contain",
                      maxWidth: {
                        xs: "90px",
                        sm: "150px",
                        md: "180px",
                      },
                    }}
                  />
                </Grid>

                {/* Product Details */}
                <Grid
                  item
                  xs={8}
                  sm={9}
                  sx={{
                    flexGrow: "1",
                    my: "2%",
                    marginLeft: "0",
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: "4%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.9rem" },
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.9rem" },
                      }}
                    >
                      {item.price.currency}
                      {item.price.currentPrice}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.9rem" },
                      mb: 2,
                    }}
                  >
                    {item.short_description?.en}
                  </Typography>

                  {item.color && (
                    <Typography
                      variant="caption"
                      color="dark"
                      sx={{
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.8rem",
                          md: "0.9rem",
                        },
                        fontWeight: "bold",
                      }}
                    >
                      Color : {item.color.en}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      mt: "auto",
                      py: 0.5,
                    }}
                  >
                    <IconButton
                      sx={{
                        borderRadius: "30px",
                        backgroundColor: "white",
                        padding: "10px",
                        transition: "all 0.3s ease",
                        color: "black",
                        "&:hover": {
                          border: "1px solid black",
                          backgroundColor: "white",
                          transform: "translateY(-1px)",
                        },
                      }}
                      onClick={() => handleAddToCard(item.id)}
                    >
                      <ShoppingCartIcon style={{ fontSize: 22 }} />
                    </IconButton>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                        px: 1,
                        py: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }} />
                      <IconButton
                        onClick={() => handleClickOpen(item.id)}
                        sx={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "30px",
                          transition: "all 0.3s ease",
                          color: "black",
                          "&:hover": {
                            border: "1px solid black",
                            backgroundColor: "white",
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        <RiDeleteBin6Line style={{ fontSize: 22 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 3, borderColor: "black" }} />
            </Box>
          ))}

          {/* ------------------------------- */}
        </Grid>

        {/* Right Column - Summary */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            width: {
              xs: "100%",
              sm: "35%",
            },
            height: "100vh",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <Paper elevation={0} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", sm: "0.8rem", md: "1rem" },
                mb: 1,
                fontWeight: "bolder",
              }}
            >
              Summary
            </Typography>
            <Divider
              sx={{
                my: 3,
                borderColor: "black",
                borderBottomWidth: "2.5px",
                opacity: 1,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: { xs: "1rem", sm: "0.8rem", md: "1rem" },
                width: "100%",
                mb: 3,
              }}
            >
              <span>Products</span>
              <span>{list.items.length} in list</span>
            </Typography>
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
            >
              Add all items to bag
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            backgroundColor: "#fafafa",
            minWidth: { xs: 280, sm: 400 },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            color: "#333", // لون نص هادي داكن
            textAlign: "center",
            mb: 1,
          }}
        >
          Confirm Delete Product
        </DialogTitle>
        <DialogContent
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            color: "#555",
            textAlign: "center",
            mb: 1,
          }}
        >
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="dark"
            sx={{
              px: 6,
              py: 0.7,
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
          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              bgcolor: "#000",
              color: "#fff",
              px: 6,
              py: 1,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#333",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default ListDetailsPage;
