import React, { useRef, useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProductsCarousel.css";
import ProductRating from "../../ProductRating/ProductRating";
import { TbBasketPlus } from "../../../common/react-icons/index";
import { IconButton } from "../../../common/mui/index";
import {
  FavoriteBorderIcon,
  ArrowForwardIosIcon,
  ArrowBackIosNewIcon
} from "../../../common/mui-icons/index";

const formatMeasurement = (measurement) => {
  if (!measurement) return "";

  const { width, length, depth, height, unit = "cm" } = measurement;

  if (length && !width && !height && !depth) return `${length} ${unit}`;

  if (width && height && !length && !depth) return `${width}x${height} ${unit}`;

  if (width && length && height) return `${width}x${length}x${height} ${unit}`;

  if (width && depth && height) return `${width}x${depth}x${height} ${unit}`;

  return `${width || ""}${width ? "x" : ""}${depth || length || ""}${
    depth || length ? " " : ""
  }${height || ""} ${unit}`;
};

const Recommendedproducts = ({ products }) => {
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
    <div className="carouselContainer ">
      {canScrollLeft && (
        <Button
          className="carouselControl left bg-dark border-0"
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          <ArrowBackIosNewIcon />
        </Button>
      )}

      <div className="productsCarousel" ref={scrollRef}>
        {products.map((product) => (
          <Card
            key={product._id}
            onClick={() => navigate(`/productDetails/${product._id}`)}
            style={{ minWidth: "10rem", marginRight: "10px", border: "none" }}
            className="flex-shrink-0"
          >
            <img
              className="img img-fluid"
              variant="top"
              style={{ maxWidth: "200px", objectFit: "contain" }}
              src={product.images[0]}
              alt={product.name}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                {product.typeName.en}
                {formatMeasurement(product.measurement) !== "" ? "," : ""}
                <br />
                {formatMeasurement(product.measurement)}
              </Card.Text>
              <Card.Text>
                <sup className="fw-bold">{product.price.currency}</sup>
                <strong className="fs-3 ">{product.price.currentPrice}</strong>
              </Card.Text>
              <ProductRating productPrice={product.price} />
              <div className={{}}>
                <IconButton
                  className="bg-primary text-light"
                  sx={{
                    borderRadius: "20px",
                    minWidth: 0,
                    width: 40,
                    height: 40,
                    padding: 0,
                  }}
                >
                  <TbBasketPlus fontSize={20} />
                </IconButton>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

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

export default Recommendedproducts;
