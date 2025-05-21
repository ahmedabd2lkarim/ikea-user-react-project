import { Link } from "react-router-dom";
import {
  HiOutlineBuildingStorefront,
  GrDeliver,
} from "../../../common/react-icons/index";
import {
  FavoriteBorderIcon,
  NavigateNextIcon,
  RemoveIcon,
  AddIcon,
} from "../../../common/mui-icons/index";
import { IconButton, Button } from "../../../common/mui/index";
import OffCanvas from "../../OffCanvas/OffCanvas";
import VariantSelector from "../VariantSelector/VariantSelector";
import useViewport from "../../../hooks/useViewport";
import useProductViews from "../../../hooks/useProductViews";
import { forwardRef, useRef, useState, useEffect } from "react";
import CollapsibleSection from "./../../CollapsibleSection/CollapsibleSection";
import ProductRating from "../../ProductRating/ProductRating";
import styles from "./prdInfoSection.module.css";
import FavouriteManager from "../../../Pages/Favourite/TopSellerProductCarousel/FavouriteOffcanvaceCarousal/FavouriteManager";
const {VITE_API_URL} = import.meta.env;
const formatMeasurement = (measurement) => {
  if (!measurement) return "";

  const { width, length, depth, height, unit = "cm" } = measurement;

  if (length && !width && !height && !depth) return `${length} ${unit}`;

  if (width && height && !length && !depth) return `${width}x${height} ${unit}`;

  if (width && length && height) return `${width}x${length}x${height} ${unit}`;

  if (width && depth && height) return `${width}x${depth}x${height} ${unit}`;

  return `${width || ""}${width ? "x" : ""}${depth || length || ""}${
    depth || length ? "x" : ""
  }${height || ""} ${unit}`;
};

function addDotEvery3Chars(str) {
  const num = str.replace(/\D/g, "");
  return num.match(/.{1,3}/g).join(".");
}

const formatPrice = (price) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PrdInfoSection = forwardRef((props, ref) => {
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const {
    mainProduct,
    currentProduct,
    onVariantSelect,
    onImageHover,
    addToBagRef,
  } = props;

  const measureRef = useRef();
  const storeRef = useRef();
  const storeInfoRef = useRef();

  useEffect(() => {
    if (ref) {
      ref.current = {
        measureRef: measureRef.current,
        storeRef: storeRef.current,
        storeInfoRef: storeInfoRef.current,
      };
    }
  }, [ref]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = async (prd, quantity) => {
    try {
      const existingItem = cart.find((item) => item.id === prd.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = cart.map((item) => {
          if (item.id === prd.id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      } else {
        updatedCart = [...cart, { ...prd, quantity: quantity }];
      }
      setCart(updatedCart);
      console.log(localStorage.getItem("token"));

      if (localStorage.getItem("token")) {
        updatedCart = updatedCart.map((item) => {
          return { prdID: item.id, quantity: item.quantity };
        });

        await fetch(`${VITE_API_URL}/api/cart/newOrder`, {
          method: "POST",
          body: JSON.stringify({ orderItems: updatedCart }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const openOffCanvas = (ref) => {
    ref.current?.handleShow();
  };
  const viewWidth = useViewport();
  const viewCount = useProductViews(currentProduct.id);

  const handleType = (str) => {
    const str2 = str.indexOf(" ");
    return str2 === -1 ? str : str.substring(0, str2);
  };
  const [addToBag, setAddToBag] = useState(1);

  const MeasurementsContent = ({ product }) => {
    const {
      width,
      depth,
      height,
      length,
      unit = "cm",
    } = { ...product?.measurement };
    console.log(product);
    return (
      <div className="pb-5">
        <p className="fs-3 px-4 fw-bold">Measurements</p>
        <div
          className="px-4 d-flex flex-column pb-3"
          style={{ fontSize: "14px", color: "rgb(74,74,74)" }}
        >
          {width && (
            <span>
              <b>Width: </b>
              {`${width} ${unit}`}
            </span>
          )}
          {depth && (
            <span>
              <b>Depth: </b>
              {`${depth} ${unit}`}
            </span>
          )}
          {height && (
            <span>
              <b>Height: </b>
              {`${height} ${unit}`}
            </span>
          )}
          {length && (
            <span>
              <b>Length: </b>
              {`${length} ${unit}`}
            </span>
          )}
          <div>
            <br />
          </div>
          <img
            className="mb-5"
            src={product.images[product.images.length - 1]}
            alt=""
          />
          <hr className="mt-5" />

          <CollapsibleSection
            title={"Packaging"}
            children={
              <>
                <div className="mt-4">
                  <b>{product.name}</b>
                  <p>{handleType(product.typeName.en)}</p>
                </div>
                <p
                  style={{ fontSize: "14px", opacity: "0.9" }}
                  className="m-0  mb-2"
                >
                  Article number
                </p>
                <span
                  style={{ fontSize: "14px" }}
                  className=" text-light p-1 px-3 me-4  fw-bold bg-black"
                >
                  {addDotEvery3Chars(product.id)}
                </span>
                <div className="d-flex flex-column my-4 mb-5">
                  {" "}
                  {width && (
                    <span>
                      <b>Width: </b>
                      {`${width} ${unit}`}
                    </span>
                  )}
                  {depth && (
                    <span>
                      <b>Depth: </b>
                      {`${depth} ${unit}`}
                    </span>
                  )}
                  {height && (
                    <span>
                      <b>Height: </b>
                      {`${height} ${unit}`}
                    </span>
                  )}
                </div>
              </>
            }
          />
        </div>
      </div>
    );
  };

  return (
    <div className="prd-description mb-5">
      <div className="d-flex justify-content-between  flex-column">
        <div>
          <div>
            {viewWidth > 900 && mainProduct.variants.length > 0 && (
              <hr className="" />
            )}
            {mainProduct.variants.length > 0 && (
              <VariantSelector
                product={mainProduct}
                selectedVariant={
                  currentProduct.id !== mainProduct.id ? currentProduct : null
                }
                onVariantSelect={onVariantSelect}
                onImageHover={onImageHover}
              />
            )}
          </div>
        </div>
        <div className={`d-flex ${viewWidth > 900 ? "order-first" : ""}`}>
          <div className="w-100">
            <b className="d-block">{currentProduct.name}</b>
            <p className="text-secondary">
              {currentProduct.typeName.en + ", "}
              {currentProduct.color.en + ", "}
              <Link
                className="hoverLink"
                onClick={() => openOffCanvas(measureRef)}
              >
                {formatMeasurement(currentProduct.measurement)}
              </Link>
              <OffCanvas
                ref={measureRef}
                content={<MeasurementsContent product={currentProduct} />}
              />
            </p>

            {currentProduct.price.discounted && (
              <p className="text-decoration-line-through fw-bold m-0">
                {currentProduct.price.currency}
                {formatPrice(currentProduct.price.currentPrice * 0.6)}
              </p>
            )}
            <b className=" fs-2">
              <sup>{currentProduct.price.currency}</sup>
              {formatPrice(currentProduct.price.currentPrice)}
            </b>
            <div className={"my-2"}>
              <ProductRating productPrice={currentProduct.price} />
            </div>
          </div>

          <div>
            <FavouriteManager
            product={currentProduct}
            onOffcanvasToggle={setIsOffcanvasOpen}
          />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between my-2">
        <b>How to get it</b>
        <Link className="hoverLink" onClick={() => openOffCanvas(storeRef)}>
          Change store
        </Link>
        <OffCanvas ref={storeRef} content={"hello every body"} />
      </div>
      <div className="card px-3 py-3">
        <div className="d-flex flex-column mb-1">
          <div className="d-flex align-items-center  ">
            <GrDeliver fontSize={"22px"} className="me-3" />
            <p style={{ fontSize: "14px" }} className="m-0 fw-bold">
              Delivery
            </p>
          </div>
          <div
            style={{
              fontSize: "14px",
              paddingLeft: "40px",
              marginBottom: "10px",
            }}
          >
            <div
              className="d-inline-block  me-1"
              style={{
                width: "12px",
                height: "12px",
                background: "#0A8A00",
                borderRadius: "50%",
              }}
            ></div>
            Available
          </div>
        </div>
        <hr className="m-1" />
        <div
          className="d-flex justify-content-between align-items-center pointer"
          onClick={() => openOffCanvas(storeInfoRef)}
        >
          <div className="d-flex flex-column mt-1 mb-1">
            <div className="d-flex align-items-center">
              <HiOutlineBuildingStorefront fontSize={"24px"} className="me-3" />
              <p style={{ fontSize: "14px" }} className="m-0 fw-bold">
                IKEA Cairo Festival City
              </p>
            </div>
            <div
              style={{
                fontSize: "14px",
                paddingLeft: "40px",
              }}
            >
              <div
                className="d-inline-block  me-1"
                style={{
                  width: "12px",
                  height: "12px",
                  background: "#0A8A00",
                  borderRadius: "50%",
                }}
              ></div>
              Store - In stock
            </div>
          </div>
          <NavigateNextIcon />
        </div>
        <OffCanvas ref={storeInfoRef} content={"hello store info"} />
      </div>

      <div className={styles.addToBagContainer}>
        <div className={`rounded-pill ${styles.counter}`}>
          <IconButton
            style={{ color: "black" }}
            className="btn "
            disabled={addToBag <= 1 ? true : false}
            onClick={() => setAddToBag(addToBag - 1)}
          >
            <RemoveIcon />
          </IconButton>

          <span>{addToBag}</span>

          <IconButton
            style={{ color: "black" }}
            onClick={() => setAddToBag(addToBag + 1)}
          >
            <AddIcon />
          </IconButton>
        </div>
        <Button
          onClick={() => {
            openOffCanvas(addToBagRef);
            addToCart(currentProduct, addToBag);
          }}
          className={styles.addButton + " rounded-pill  py-3 my-4"}
          style={{ backgroundColor: "#0058A3", color: "white" }}
        >
          {addToBag === 1 ? "Add to bag" : `Add ${addToBag} items to cart`}
        </Button>
      </div>
      <div className="border mb-3 ">
        <p className="py-2 text-center mb-0">
          <span className="text-primary fw-bold">{viewCount}</span> people have
          viewed this product today
        </p>
      </div>
    </div>
  );
});

export default PrdInfoSection;
