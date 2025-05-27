import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Language } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavouriteManager from "../../Pages/Favourite/TopSellerProductCarousel/FavouriteOffcanvaceCarousal/FavouriteManager";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { VITE_API_URL } = import.meta.env;
const ProductScroller = ({
  deals,
  title,
  categories,
  products,
  cardWidth = 170,
  cardHight = 180,
}) => {
  const { t, i18n } = useTranslation();
  // const currentLang = i18n.language;
  const [selectedCategory, setSelectedCategory] = useState(
    categories ? Object.keys(categories)[0] : null
  );

  const renderProducts = () => {
    if (categories) {
      const selected = categories[selectedCategory];
      const deal = selected?.deal;

      if (!selected?.products || !Array.isArray(selected.products)) {
        // maybe render nothing or a placeholder
        return null;
      }

      return selected.products.map((product, index) => (
        <HoverCard
          key={index}
          product={product}
          cardWidth={cardWidth}
          cardHight={cardHight}
          deals={deal}
        />
      ));
    } else if (products) {
      return products.map((product, index) => (
        <HoverCard
          key={index}
          product={product}
          cardHight={cardHight}
          cardWidth={cardWidth}
          deals={deals}
        />
      ));
    } else {
      return null;
    }
  };

  if (!categories && !products) return null;

  return (
    <Box sx={{ my: 4 }}>
      {title && (
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}

      {categories && Object.keys(categories).length > 1 && (
        <Box sx={{ position: "relative", mb: 3 }}>
          <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
            {Object.keys(categories).map((category) => (
              <Typography
                key={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  cursor: "pointer",
                  color: selectedCategory === category ? "black" : "gray",
                  fontWeight: selectedCategory === category ? "bold" : "normal",
                  borderBottom:
                    selectedCategory === category
                      ? "3px solid #007bff"
                      : "none",
                  pb: 0.5,
                  transition: "all 0.3s ease",
                }}
              >
                {category}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              height: "1px",
              width: "100%",
              bgcolor: "lightgray",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 2,
          "&::-webkit-scrollbar": {
            height: 4,
            width: 10,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "black",
          },
          "&:hover::-webkit-scrollbar": {
            height: 5,
            width: 10,
          },
        }}
      >
        {renderProducts()}
      </Box>
    </Box>
  );
};

const HoverCard = ({ product, cardWidth, deals, cardHight }) => {
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    let cartItem = {
      prdID: product._id,
      quantity: 1,
    };

    if (token) {
      try {
        // const getOrderResponse = await fetch(
        //   `${VITE_API_URL}/api/cart/showMyCart`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        // let currentOrderItems = [];
        // if (getOrderResponse.ok) {
        //   const currentOrder = await getOrderResponse.json();
        //   if (currentOrder.length > 0) {
        //     currentOrderItems = currentOrder[0].cartItems || [];
        //   }
        // }

        // const productIndex = currentOrderItems.findIndex(
        //   (item) => item.prdID === cartItem.prdID
        // );

        // if (productIndex !== -1) {
        //   currentOrderItems[productIndex].quantity += cartItem.quantity;
        // } else {
        //   currentOrderItems.push(cartItem);
        // }

        const response = await fetch(`${VITE_API_URL}/api/cart/cartOP`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prdID:product._id,
            quantity:1
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          toast.error("Failed to add to cart");

          return;
        }

        const data = await response.json();
        console.log("Order created:", data);
        toast.success("Item added to cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Error adding item to cart.");
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartItem = {...product, quantity: 1 };
      const productIndex = cart.findIndex(
        (item) => item.id === cartItem.id
      );

      if (productIndex !== -1) {
        cart[productIndex].quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      toast.success("Item added to guest cart");
    }
  };
  const { _, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: cardWidth,
        maxWidth: cardWidth,
        flex: "0 0 auto",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardMedia
        onClick={(e) => {
          if (!e.target.closest("button")) {
            navigate(`/productDetails/${product._id}`);
          }
        }}
        component="img"
        image={hovered ? product.contextualImageUrl : product.images[0]}
        alt={product.imageAlt?.[currentLang] || product.name}
        sx={{
          width: "100%",
          height: cardHight,
          objectFit: "cover",
          p: 1,
        }}
      />

      {/* <CardMedia
        component="img"
        image={hovered ? product.contextualImageUrl : product.image[0]}
        alt={product.imageAlt || product.name}
        sx={{ objectFit: "cover", p: 1 }}
      /> */}

      <CardContent sx={{ px: 2, pb: 2 }}>
        {deals && (
          <Typography
            variant="body1"
            color="red"
            fontWeight={"bold"}
            fontSize={12}
            sx={{ mb: 2 }}
          >
            {deals}
          </Typography>
        )}
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            height: 38,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 0.5,
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.typeName?.[currentLang] || product.typeName?.en}
        </Typography>
        <Box>
          {product.price.discounted ? (
            <>
              <Typography
                variant="body2"
                color="black"
                sx={{ textDecoration: "line-through", fontSize: "1rem" }}
              >
                <Typography variant="span" fontSize=".8rem">
                  {product.price?.currency}
                </Typography>{" "}
                {(
                  (product.price?.currentPrice + Math.floor(15 * 50) + 10) *
                  0.8
                ).toFixed(2)}
              </Typography>
              <Typography color="error" fontWeight="bold" fontSize="1.2rem">
                <Typography variant="span" fontSize=".8rem">
                  {product.price?.currency}
                </Typography>{" "}
                {product.price?.currentPrice}
              </Typography>
            </>
          ) : (
            <Typography color="black" fontWeight="bold" fontSize="1.2rem">
              <Typography variant="span" fontSize=".8rem">
                {product.price?.currency}
              </Typography>{" "}
              {product.price?.currentPrice}
            </Typography>
          )}
        </Box>

        <Tooltip></Tooltip>
        <Tooltip></Tooltip>
      </CardContent>
      <Box sx={{ gap: 1 }}>
        <IconButton
          size="small"
          sx={{
            bgcolor: "#004F93",
            borderRadius: "50%",
            p: "0.3rem",
            ":hover": { bgcolor: "rgb(11, 23, 65)" },
          }}
          onClick={handleAddToCart}
        >
          <span className="pip-btn__inner">
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              width="25"
              height="20"
              aria-hidden="true"
              className="pip-svg-icon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9997 4C10.2948 4 9.019 5.122 8.5418 6.7127 8.2172 7.7946 7.97 8.9013 7.7083 10H1.5566l3.7501 10h9.6931v-2h-8.307l-2.2501-6h3.3251c.6634 2.1065 1.7665 4 4.2319 4 2.4653 0 3.5685-1.8935 4.2318-4h3.3252l-.375 1h2.136l1.125-3H16.291c-.2617-1.0987-.5089-2.2054-.8335-3.2873C14.9803 5.122 13.7045 4 11.9997 4zm2.2348 6c-.2293-.9532-.5299-2.1701-.6927-2.7127C13.3155 6.533 12.8255 6 11.9997 6s-1.3159.533-1.5422 1.2873C10.2947 7.83 9.9941 9.0468 9.7648 10h4.4697zm-4.361 2h4.2523c-.3635 1.0612-.8841 2-2.1261 2-1.2421 0-1.7627-.9388-2.1262-2z"
              ></path>
              <path
                fill="white"
                d="M19.9998 14h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"
              ></path>
            </svg>
          </span>
        </IconButton>
        <IconButton size="small" sx={{ bgcolor: "white" }}>
          <FavouriteManager
            product={product}
            onOffcanvasToggle={setIsOffcanvasOpen}
          />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProductScroller;
