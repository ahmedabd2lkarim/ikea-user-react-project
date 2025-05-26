import { useRef, useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProductsCarousel.css";
import ProductRating from "../../ProductRating/ProductRating";
import { TbBasketPlus } from "../../../common/react-icons/index";
import { IconButton } from "../../../common/mui/index";
import {
  ArrowForwardIosIcon,
  ArrowBackIosNewIcon,
} from "../../../common/mui-icons/index";
import { Box } from "@mui/material";
import FavouriteManager from "../../../Pages/Favourite/TopSellerProductCarousel/FavouriteOffcanvaceCarousal/FavouriteManager";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const { VITE_API_URL } = import.meta.env;

const formatMeasurement = (measurement, language) => {
  const cmAr = "سم";
  if (!measurement) return "";

  const { unit = "cm" } = measurement;
  const unitLabel = language === "ar" ? cmAr : unit;

  const fieldsOrder = ["width", "length", "depth", "height"];

  const values = fieldsOrder
    .map((key) => measurement[key])
    .filter((val) => val !== undefined && val !== null && val !== "");

  if (values.length === 0) return "";

  return `${values.join("x")} ${unitLabel}`;
};

const handleAddToCart = async (product) => {
  const token = localStorage.getItem("token");

  let cartItem = {
    prdID: product._id,
    quantity: 1,
  };

  if (token) {
    try {
      const getOrderResponse = await fetch(
        `${VITE_API_URL}/api/cart/showAllMyOrders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let currentOrderItems = [];
      if (getOrderResponse.ok) {
        const currentOrder = await getOrderResponse.json();
        if (currentOrder.length > 0) {
          currentOrderItems = currentOrder[0].orderItems || [];
        }
      }

      const productIndex = currentOrderItems.findIndex(
        (item) => item.prdID === cartItem.prdID
      );

      if (productIndex !== -1) {
        currentOrderItems[productIndex].quantity += cartItem.quantity;
      } else {
        currentOrderItems.push(cartItem);
      }

      const response = await fetch(`${VITE_API_URL}/api/cart/newOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems: currentOrderItems,
          shippingFee: 20,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error("Failed to add to cart");

        return;
      }

      const data = await response.json();
      // console.log("Order created:", data);
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding item to cart.");
    }
  } else {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItem = { ...product, quantity: 1 };
    const productIndex = cart.findIndex((item) => item.id === cartItem.id);

    if (productIndex !== -1) {
      cart[productIndex].quantity += cartItem.quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Item added to guest cart");
  }
};

const ProductsCarousel = ({ products, formatPrice }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div className="carouselContainer  ">
      {canScrollLeft && (
        <Button
          className="carouselControl left bg-dark border-0"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          <ArrowBackIosNewIcon />
        </Button>
      )}

      <Box
        sx={{
          height: "102%",
          display: "flex",
          overflowX: "auto",
          paddingBlock: "24px",
          "&::-webkit-scrollbar": {
            height: 2,

            backgroundColor: "#ddd",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "black",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {},
          "&:hover::-webkit-scrollbar": {
            height: 5,
          },
        }}
        className="productsCarousel"
        ref={scrollRef}
      >
        {products.map((product) => (
          // console.log(product),
          <Card
            key={product._id}
            style={{
              minWidth: "10rem",
              marginRight: "10px",
              border: "none",
            }}
            className="flex-shrink-0"
          >
            <Card.Body className="p-0">
              <div onClick={() => navigate(`/productDetails/${product._id}`)}>
                <img
                  className="img img-card img-fluid mb-5"
                  variant="top"
                  style={{ maxWidth: "200px", objectFit: "contain" }}
                  src={product.images[0]}
                  alt={product.name}
                  onMouseEnter={(e) => {
                    if (product.images[1]) {
                      e.target.classList.add("switching");
                      setTimeout(() => {
                        e.target.src = product.images[1];
                        e.target.classList.remove("switching");
                      }, 150);
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.classList.add("switching");
                    setTimeout(() => {
                      e.target.src = product.images[0];
                      e.target.classList.remove("switching");
                    }, 150);
                  }}
                />

                <p
                  style={{
                    margin: "0",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {product.name}
                </p>
                <span style={{ color: "#484848" }}>
                  {product.typeName[language]}
                  {formatMeasurement(product.measurement, language) !== ""
                    ? ","
                    : ""}
                  <br />
                  {formatMeasurement(product.measurement, language)}
                </span>
                <div style={{ display: "flex" }}>
                  <p
                    className={language === "ar" ? "order-3" : ""}
                    style={{ fontWeight: "bold" }}
                  >
                    {language === "ar" ? t("cart.EGP") : product.price.currency}
                  </p>
                  <b className="order-1 fs-2">
                    {formatPrice(product.price.currentPrice)}
                  </b>
                </div>
                <ProductRating productPrice={product.price} />
              </div>
              <div>
                <IconButton
                  disabled={
                    product.inStock && !product.stockQuantity <= 0
                      ? false
                      : true
                  }
                  onClick={() => handleAddToCart(product)}
                  className="bg-primary text-light"
                  sx={{
                    borderRadius: "20px",
                    minWidth: 0,
                    width: 40,
                    height: 40,
                    padding: 0,
                    marginRight: "10px",
                  }}
                >
                  <TbBasketPlus fontSize={20} />
                </IconButton>
                <FavouriteManager
                  product={product}
                  onOffcanvasToggle={setIsOffcanvasOpen}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                  paddingTop: "10px",
                  color: "#888888",
                }}
              >
                <div
                  style={{
                    height: "8px",
                    width: "8px",
                    backgroundColor: `${
                      product.inStock && !product.stockQuantity <= 0
                        ? "green"
                        : "red"
                    }`,
                    borderRadius: "4px",
                  }}
                ></div>
                <p className="m-0">
                  {product.inStock && product.stockQuantity
                    ? `
                      ${t("product.inStock")} ${
                        language !== "ar" ? "in" : "في"
                      } ${t("product.IKEA_Cairo")}
                    `
                    : t("product.outOfStock")}
                </p>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Box>

      {canScrollRight && (
        <Button
          className="carouselControl right  bg-dark border-0"
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          <ArrowForwardIosIcon />
        </Button>
      )}
    </div>
  );
};

export default ProductsCarousel;
