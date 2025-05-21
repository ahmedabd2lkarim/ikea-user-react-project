import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  Rating,
  Button,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "swiper/css";
import "swiper/css/navigation";
import FavouriteManager from "./FavouriteOffcanvaceCarousal/FavouriteManager";
const {VITE_API_URL} = import.meta.env;

function TopSellerCarousel() {
  const [products, setProducts] = useState([]);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const apiUrl = "http://localhost:3000";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/topSellerProducts`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Disable/enable swiper navigation when offcanvas state changes
  useEffect(() => {
    if (swiperRef.current) {
      if (isOffcanvasOpen) {
        swiperRef.current.allowSlideNext = false;
        swiperRef.current.allowSlidePrev = false;
        swiperRef.current.mousewheel.disable();
      } else {
        swiperRef.current.allowSlideNext = true;
        swiperRef.current.allowSlidePrev = true;
        swiperRef.current.mousewheel.enable();
      }
    }
  }, [isOffcanvasOpen]);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width < 576) setSlidesPerView(1);
    else if (width < 992) setSlidesPerView(2);
    else if (width < 1200) setSlidesPerView(3);
    else setSlidesPerView(4);
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

 const handleAddToCart = async (product) => {
   try {
     console.log("Adding product to cart:", product.id);

     // Use query param to check if product is already in cart
     const response = await axios.get(`${VITE_API_URL}/cart`, {
       params: { id: product.id },
     });

     if (response.data.length > 0) {
       setAlertMessage(`${product.name} is already in your cart.`);
       setAlertSeverity("error");
     } else {
       // Add the full product to cart
       await axios.post(`${VITE_API_URL}/cart`, {
         ...product,
         quantity: 1, // Add default quantity
       });
       setAlertMessage(`${product.name} has been added to your cart.`);
       setAlertSeverity("success");
     }

     setOpenSnackbar(true);
   } catch (error) {
     console.error("Error adding product to cart:", error);
     setAlertMessage("Something went wrong. Please try again.");
     setAlertSeverity("error");
     setOpenSnackbar(true);
   }
 };

  // Function to handle navigation arrow clicks
  const handleNavClick = (direction) => {
    if (isOffcanvasOpen) return; // Prevent navigation when offcanvas is open

    if (direction === "prev" && swiperRef.current) {
      swiperRef.current.slidePrev();
    } else if (direction === "next" && swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <Box className="my-5 mx-auto" sx={{ maxWidth: "1300px", px: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        You may also like
      </Typography>

      <Box sx={{ position: "relative" }}>
        <IconButton
          ref={prevRef}
          onClick={() => handleNavClick("prev")}
          sx={{
            position: "absolute",
            left: 0,
            top: 260,
            paddingLeft: 2,
            transform: "translateY(-50%)",
            backgroundColor: isOffcanvasOpen ? "#666" : "#000",
            color: "#fff",
            "&:hover": { backgroundColor: isOffcanvasOpen ? "#666" : "#333" },
            zIndex: 2,
            width: 40,
            height: 40,
            display: activeIndex > 0 ? "flex" : "none",
            pointerEvents: isOffcanvasOpen ? "none" : "auto",
            opacity: isOffcanvasOpen ? 0.5 : 1,
          }}
          disabled={isOffcanvasOpen}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          ref={nextRef}
          onClick={() => handleNavClick("next")}
          sx={{
            position: "absolute",
            right: 0,
            top: 260,
            transform: "translateY(-50%)",
            backgroundColor: isOffcanvasOpen ? "#666" : "#000",
            color: "#fff",
            "&:hover": { backgroundColor: isOffcanvasOpen ? "#666" : "#333" },
            zIndex: 2,
            width: 40,
            height: 40,
            display:
              activeIndex + slidesPerView < products.length ? "flex" : "none",
            pointerEvents: isOffcanvasOpen ? "none" : "auto",
            opacity: isOffcanvasOpen ? 0.5 : 1,
          }}
          disabled={isOffcanvasOpen}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <div style={{ pointerEvents: isOffcanvasOpen ? "none" : "auto" }}>
          <Swiper
            modules={[Navigation, Mousewheel]}
            spaceBetween={10}
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerView}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 0.1,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.activeIndex);
            }}
            speed={600}
            allowTouchMove={!isOffcanvasOpen}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    cursor: isOffcanvasOpen ? "default" : "pointer",
                    borderRadius: 0,
                    opacity: isOffcanvasOpen ? 0.7 : 1,
                    transition: "opacity 0.3s",
                  }}
                  onClick={() => {
                    if (!isOffcanvasOpen) {
                      navigate(`/product/${product.id}`);
                    }
                  }}
                >
                  {product.isTopSeller && (
                    <Chip
                      label="Top seller"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: "#e91e63",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                        borderRadius: 0,
                        height: 24,
                      }}
                    />
                  )}

                  <CardMedia
                    component="img"
                    image={
                      hoveredImageId === product.id && product.hoverImageUrl
                        ? product.hoverImageUrl
                        : product.imageUrl
                    }
                    alt={product.name}
                    onMouseEnter={() =>
                      !isOffcanvasOpen && setHoveredImageId(product.id)
                    }
                    onMouseLeave={() =>
                      !isOffcanvasOpen && setHoveredImageId(null)
                    }
                    sx={{
                      height: { xs: 160, sm: 200, md: 230, lg: 270 },
                      objectFit: "fill",
                      width: "100%",
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1, px: 0.7, py: 0 }}>
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        py: 1.3,
                        visibility: product.hasNewLowerPrice
                          ? "visible"
                          : "hidden",
                      }}
                    >
                      New Lower Price
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        transition: "text-decoration 0.1s",
                        "&:hover": {
                          textDecoration: isOffcanvasOpen
                            ? "none"
                            : "underline",
                        },
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ py: 0.3 }}
                    >
                      {product.description}
                    </Typography>

                    <Box
                      sx={{ display: "flex", alignItems: "baseline", mb: 1 }}
                    >
                      <span
                        style={{
                          background: "#FFDB00",
                          display: "flex",
                          alignItems: "center",
                          padding: "0.2rem 0.5rem",
                          boxShadow: "2px 2px 0 red",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
                        >
                          EGP{product.currentPrice}
                        </Typography>
                        {product.unit && (
                          <Typography
                            variant="h4"
                            sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
                          >
                            / {product.unit}
                          </Typography>
                        )}
                      </span>
                    </Box>

                    {product.previousPrice && (
                      <Typography variant="body2" color="text.secondary">
                        Previous price: EGP{product.previousPrice}/
                        {product.unit}
                      </Typography>
                    )}
                    {product.unitPrice && (
                      <Typography variant="body2" color="text.secondary">
                        Unit price: EGP{product.unitPrice}/{product.unitType}
                      </Typography>
                    )}

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Rating
                        value={product.rating}
                        precision={0.5}
                        size="small"
                        readOnly
                        sx={{ color: "black" }}
                      />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        ({product.reviewCount})
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        mt: 1,
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          borderRadius: "50%",
                          minWidth: "unset",
                          width: 40,
                          height: 40,
                          py: 0,
                          paddingLeft: 3.3,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isOffcanvasOpen) {
                            handleAddToCart(product);
                          }
                        }}
                        disabled={isOffcanvasOpen}
                      />

                      <FavouriteManager
                        product={product}
                        onOffcanvasToggle={setIsOffcanvasOpen}
                      />
                    </Box>

                    {product.inStock && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 0 }}
                      >
                        <CircleIcon
                          sx={{ color: "success.main", fontSize: 12, mr: 0.5 }}
                        />
                        <Typography variant="body2">
                          In stock in {product.location}
                        </Typography>
                      </Box>
                    )}

                    {product.runningLow && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 0 }}
                      >
                        <CircleIcon
                          sx={{ color: "warning.main", fontSize: 12, mr: 0.5 }}
                        />
                        <Typography variant="body2" color="warning.main">
                          Running low at {product.location}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertSeverity}
          sx={{
            width: "100%",
            backgroundColor: "#111111",
            color: "white",
            padding: "17px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          {alertMessage}
          <Link
            href="#"
            sx={{
              color: "primary.main",
              ml: 1.5,
              fontWeight: "bold",
              textDecoration: "underline",
              fontSize: "0.8rem",
            }}
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </Link>
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TopSellerCarousel;
