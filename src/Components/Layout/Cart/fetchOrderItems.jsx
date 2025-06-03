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

    return `${mainName} - ${variantName}${color ? ` (${color})` : ""}${
      type ? ` - ${type}` : ""
    }`;
  } else {
    return item.name || "Product";
  }
}

function getCartItemKey(item) {
  if (item.isVariant) {
    return `variant-${item.variantId}-${item.mainPrdId}`;
  } else {
    return `product-${item._id}`;
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

  const getNavigationUrl = (item) => {
    if (item.isVariant) {
      return `/productDetails/${item.mainPrdId}`;
    } else {
      return `/productDetails/${item._id}`;
    }
  };

  const getItemDescription = (item) => {
    const language = lng();
    let description = "";

    if (item.isVariant) {
      if (item.color && item.color[language]) {
        description += item.color[language];
      }
      if (item.typeName && item.typeName[language]) {
        description += description
          ? `, ${item.typeName[language]}`
          : item.typeName[language];
      }
    } else {
      if (item.typeName && item.typeName[language]) {
        description += item.typeName[language];
      }
      if (item.imageAlt && item.imageAlt[language]) {
        const altText = item.imageAlt[language];
        const commaIndex = altText.indexOf(",");
        const lastCommaIndex = altText.lastIndexOf(",");
        if (
          commaIndex !== -1 &&
          lastCommaIndex !== -1 &&
          commaIndex !== lastCommaIndex
        ) {
          description += altText.substring(commaIndex, lastCommaIndex);
        }
      }
    }

    return description;
  };

  const getMeasurementDisplay = (item) => {
    if (!item.measurement) return "";

    if (item.measurement.length) {
      return `${item.measurement.length} ${item.measurement.unit || "cm"}`;
    } else if (item.measurement.width && item.measurement.height) {
      return `${item.measurement.width}x${item.measurement.height} ${
        item.measurement.unit || "cm"
      }`;
    }

    return "";
  };

  const getProductIdDisplay = (item) => {
    const id = item.isVariant ? item.variantId : item._id;
    if (!id) return "";

    return (
      id
        .substring(0, 8)
        .match(/.{1,3}/g)
        ?.join(".") || ""
    );
  };

  return (
    <Grid>
      <Typography variant="subtitle1" color="rgb(72, 72, 72)">
        {items?.length} {t("cart.TotalProducts")}
      </Typography>

      {items?.map((item) => {
        const itemKey = getCartItemKey(item);
        const navigationUrl = getNavigationUrl(item);
        const displayName = getItemDisplayName(item, lng);
        const description = getItemDescription(item);
        const measurementDisplay = getMeasurementDisplay(item);
        const productIdDisplay = getProductIdDisplay(item);
        const currentItemId = getItemIdentifier(item);

        return (
          <Container disableGutters key={itemKey}>
            <hr />
            <Grid container py={3}>
              <Grid
                size={3}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(navigationUrl)}
              >
                <img
                  src={item.images?.[0] || item.image}
                  alt={displayName}
                  width={"70%"}
                />
              </Grid>

              <Grid size={7} lineHeight={1.5}>
                <Typography
                  variant="subtitle2"
                  fontWeight={"bold"}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => navigate(navigationUrl)}
                >
                  {displayName}
                </Typography>

                {description && (
                  <Typography variant="subtitle2" color="rgb(72, 72, 72)">
                    {description}
                  </Typography>
                )}

                {measurementDisplay && (
                  <Typography variant="subtitle2" color="rgb(72, 72, 72)">
                    {measurementDisplay}
                  </Typography>
                )}

                {productIdDisplay && (
                  <Typography variant="subtitle2" color="rgb(72, 72, 72)">
                    {productIdDisplay}
                  </Typography>
                )}

                <Grid container pt={4}>
                  <Grid
                    sx={{ borderRadius: "20px", border: "grey solid 1px" }}
                    size={{ xs: 6, sm: 3 }}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <IconButton
                      size="small"
                      onClick={() => decreaseQuantity(item)}
                      disabled={
                        item.quantity <= 1 ||
                        (isLoading && itemId === currentItemId)
                      }
                    >
                      <RemoveIcon sx={{ color: "black" }} fontSize="small" />
                    </IconButton>

                    <Typography variant="subtitle2" fontWeight={"bold"}>
                      {item.quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => increaseQuantity(item)}
                      disabled={
                        item.quantity >= (item.stockQuantity || 99) ||
                        (isLoading && itemId === currentItemId)
                      }
                    >
                      <AddIcon sx={{ color: "black" }} fontSize="small" />
                    </IconButton>
                  </Grid>

                  <Button
                    color="inherit"
                    sx={{
                      borderRadius: "20px",
                      color: "black",
                      textTransform: "none",
                      fontWeight: "bold",
                      px: 2,
                      py: 1,
                      fontSize: "12px",
                    }}
                    onClick={() => deleteOrderItem(item)}
                  >
                    {t("cart.remove")}
                  </Button>

                  <Button
                    color="inherit"
                    sx={{
                      borderRadius: "20px",
                      color: "black",
                      textTransform: "none",
                      fontWeight: "bold",
                      px: 2,
                      py: 1,
                      fontSize: "12px",
                    }}
                  >
                    {t("cart.addtoFav")}
                  </Button>
                </Grid>
              </Grid>

              <Grid size={2} textAlign={"end"}>
                {isLoading && itemId === currentItemId ? (
                  <Skeleton variant="rectangular" width={60} height={20} />
                ) : (
                  <Typography variant="subtitle2" fontWeight={"bold"}>
                    {((item.price?.currentPrice || 0) * item.quantity).toFixed(
                      2
                    )}
                    {t("cart.EGB")}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Container>
        );
      })}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`${itemName} ${t("cart.removed")}`}
        action={action}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Grid>
  );
};

export default FetchOrderItems;
