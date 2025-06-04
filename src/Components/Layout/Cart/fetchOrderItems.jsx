import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Slide,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  decreaseQ,
  deleteItem,
  fetchCart,
  increaseQ,
} from "../../../Store/Slices/cartSlice";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const { VITE_API_URL } = import.meta.env;

function calculateTotal(items) {
  return (
    items.reduce(
      (acc, item) =>
        acc + (item.price?.currentPrice || 0) * (item.quantity || 0),
      0
    ) + 20
  );
}

function getItemDisplayName(item, lng) {
  if (item.isVariant) {
    const mainName = item.mainProductName || "Product";
    const variantName = item.name || "Variant";
    const color = item.color?.[lng()] || item.color?.en || item.color?.ar || "";
    const type =
      item.typeName?.[lng()] || item.typeName?.en || item.typeName?.ar || "";

    return `${mainName} - ${variantName}${color ? ` (${color})` : ""}${type ? ` - ${type}` : ""
      }`;
  } else {
    return item.name || "Product";
  }
}

function getItemIdentifier(item) {
  return item.isVariant ? `${item.variantId}-${item.mainPrdId}` : item._id;
}

const FetchOrderItems = ({ det, fun }) => {
  const navigate = useNavigate();
  const lng = () => {
    return localStorage.getItem("i18nextLng") || "en";
  };
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  let [items, setItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  if (localStorage.getItem("token")) {
    items = useSelector((state) => state.cart.items.cartItems);
  }
  const [favOpen, setFavOpen] = useState(false);
  const [favMessage, setFavMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [itemId, setItemId] = useState("");
  let [itemName, setItemName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  function decreaseQuantity(item) {
    const itemKey = getItemIdentifier(item);
    setItemId(itemKey);
    setIsLoading(true);

    setTimeout(() => {
      if (localStorage.getItem("token")) {
        dispatch(
          decreaseQ({
            itemId: item.isVariant ? item.variantId : item._id,
            isVariant: item.isVariant || false,
            mainPrdId: item.isVariant ? item.mainPrdId : item._id,
          })
        );
      } else {
        const updatedItems = items.map((cartItem) => {
          const isMatch = item.isVariant
            ? cartItem.isVariant &&
            cartItem.variantId === item.variantId &&
            cartItem.mainPrdId === item.mainPrdId
            : cartItem._id === item._id && !cartItem.isVariant;

          if (isMatch && cartItem.quantity > 1) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });

        localStorage.setItem("cart", JSON.stringify(updatedItems));
        setItems(updatedItems);
        fun({ orderItems: updatedItems, total: calculateTotal(updatedItems) });
      }
      setIsLoading(false);
    }, 1000);
  }

  function increaseQuantity(item) {
    const itemKey = getItemIdentifier(item);
    setItemId(itemKey);
    setIsLoading(true);

    setTimeout(() => {
      if (localStorage.getItem("token")) {
        dispatch(
          increaseQ({
            itemId: item.isVariant ? item.variantId : item._id,
            isVariant: item.isVariant || false,
            mainPrdId: item.isVariant ? item.mainPrdId : item._id,
          })
        );
      } else {
        const updatedItems = items.map((cartItem) => {
          const isMatch = item.isVariant
            ? cartItem.isVariant &&
            cartItem.variantId === item.variantId &&
            cartItem.mainPrdId === item.mainPrdId
            : cartItem._id === item._id && !cartItem.isVariant;

          if (isMatch) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });

        localStorage.setItem("cart", JSON.stringify(updatedItems));
        setItems(updatedItems);
        fun({ orderItems: updatedItems, total: calculateTotal(updatedItems) });
      }
      setIsLoading(false);
    }, 1000);
  }

  function deleteOrderItem(item) {
    const displayName = getItemDisplayName(item, lng);
    setOpen(true);
    setItemName(displayName);

    if (localStorage.getItem("token")) {
      dispatch(
        deleteItem({
          itemId: item.isVariant ? item.variantId : item._id,
          isVariant: item.isVariant || false,
          mainPrdId: item.isVariant ? item.mainPrdId : item._id,
        })
      );
    } else {
      const updatedItems = items.filter((cartItem) => {
        if (item.isVariant) {
          return !(
            cartItem.isVariant &&
            cartItem.variantId === item.variantId &&
            cartItem.mainPrdId === item.mainPrdId
          );
        } else {
          return !(cartItem._id === item._id && !cartItem.isVariant);
        }
      });

      localStorage.setItem("cart", JSON.stringify(updatedItems));
      setItems(updatedItems);
      fun([]);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFavClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFavOpen(false);
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const handleAddToFav = async (item) => {
    setFavMessage(`${item.name} ${t("cart.addedToFav")}`);
    setFavOpen(true);
    const response = await axios.get(`${VITE_API_URL}/api/favourites`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    const list = response.data.lists[0]._id
    await axios.put(
      `${VITE_API_URL}/api/favourites/add-product`,
      { listId: list, productId: item._id },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
  }



  return (
    <Grid>
      {items ?
        <>
          <Typography variant='subtitle1' color='rgb(72, 72, 72)'>{items?.length} {t("cart.TotalProducts")}</Typography>
          {items?.map((item) =>
            <Container disableGutters key={item?._id}>
              <hr />
              <Grid container py={3}>
                <Grid size={3} sx={{ cursor: 'pointer' }} onClick={() => { navigate("/productDetails/" + item?._id) }}>
                  <img src={item?.images[0]} alt="" width={'70%'} />
                </Grid>
                <Grid size={7} lineHeight={1.5}>
                  <Typography variant='subtitle2' fontWeight={'bold'} sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => { navigate("/productDetails/" + item?._id) }}>{item?.name}</Typography>
                  <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item?.typeName[lng()]}{item?.imageAlt[lng()].substring(item?.imageAlt[lng()].indexOf(','), item?.imageAlt[lng()].lastIndexOf(','))} </Typography>
                  <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item?.measurement?.length ? `${item?.measurement?.length} ${item?.measurement?.unit || 'cm'}` : item?.measurement?.width ? `${item?.measurement?.width}x${item?.measurement?.height} ${item?.measurement?.unit || 'cm'}` : ''}</Typography>
                  <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item?.id.substring(0, 8).match(/.{1,3}/g).join('.')}</Typography>
                  <Grid container pt={4}>
                    <Grid sx={{ borderRadius: '20px', border: 'grey solid 1px' }} size={{ xs: 6, sm: 3 }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                      <IconButton size='small' onClick={() => { decreaseQuantity(item) }} disabled={item?.quantity == 1} >
                        <RemoveIcon sx={{ color: 'black' }} fontSize='1px' />
                      </IconButton>
                      <Typography variant='subtitle2' fontWeight={'bold'}>{item?.quantity}</Typography>
                      <IconButton size='small' onClick={() => { increaseQuantity(item) }} disabled={item?.quantity == item?.stockQuantity}>
                        <AddIcon sx={{ color: 'black' }} fontSize='1px' />
                      </IconButton>
                    </Grid>
                    <Button color='inherit' sx={{ borderRadius: '20px', color: 'black', textTransform: 'none', fontWeight: 'bold', px: 2, py: 1, fontSize: '12px' }} onClick={() => { deleteOrderItem(item) }}>{t("cart.remove")}</Button>
                    <Button color='inherit' sx={{ borderRadius: '20px', color: 'black', textTransform: 'none', fontWeight: 'bold', px: 2, py: 1, fontSize: '12px' }} onClick={() => handleAddToFav(item)} >
                      {t("cart.addtoFav")}
                    </Button>
                  </Grid>
                </Grid>
                <Grid size={2} textAlign={'end'}>
                  {isLoading && itemId == item?._id ? <Skeleton variant='rectangular' /> : <Typography variant='subtitle2' fontWeight={'bold'}>{item?.price?.currentPrice * item?.quantity}{t("cart.EGP")}</Typography>}
                </Grid>
              </Grid>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={itemName + " " + t("cart.removed")}
                action={action}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              />
              <Snackbar
                open={favOpen}
                autoHideDuration={4000}
                onClose={handleFavClose}
                message={favMessage}
                action={action}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              />
            </Container>
          )}
        </>
        : []}
    </Grid>
  );
};

export default FetchOrderItems;
