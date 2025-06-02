import { Link } from "react-router-dom";
import {
  HiOutlineBuildingStorefront,
  GrDeliver,
} from "../../../common/react-icons/index";
import { RemoveIcon, AddIcon } from "../../../common/mui-icons/index";
import { IconButton, Button } from "../../../common/mui/index";
import OffCanvas from "../../OffCanvas/OffCanvas";
import VariantSelector from "../VariantSelector/VariantSelector";
import useViewport from "../../../hooks/useViewport";
import useProductViews from "../../../hooks/useProductViews";
import { forwardRef, useRef, useState, useEffect } from "react";
import MeasurementsContent from "./MeasurementsContent/MeasurmentContent";
import ProductRating from "../../ProductRating/ProductRating";
import styles from "./PrdInfoSection.module.css";
import FavouriteManager from "../../../Pages/Favourite/TopSellerProductCarousel/FavouriteOffcanvaceCarousal/FavouriteManager";
import { useTranslation } from "react-i18next";
const { VITE_API_URL } = import.meta.env;
const cmAr = "سم";

const ChangeStore = ({ currentProduct, t }) => {
  return (
    <>
      <strong style={{ padding: "8px", fontSize: "18px" }}>
        {t("selectStore")}
      </strong>
      <div style={{ height: "100%", padding: "20px", fontSize: "14px" }}>
        <div
          style={{
            borderRadius: "4px",
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <strong>{t("CairoFestivalCity")}</strong>
          <p style={{ margin: 0, fontSize: "14px" }}>{t("RingRoad")}</p>
          <div className="d-flex align-items-baseline">
            <div
              style={{
                height: "10px",
                width: "10px",
                alignSelf: "center",
                backgroundColor:
                  currentProduct.inStock && currentProduct.stockQuantity > 0
                    ? "#0A8A00"
                    : "red",
                borderRadius: "5px",
                marginRight: "6px",
              }}
            ></div>
            <span>
              {t("product.store")} - {t("product.orderInStore")}
            </span>
          </div>
        </div>
        <div
          style={{
            borderRadius: "4px",
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <strong>{t("MallOfArabia")}</strong>
          <p style={{ margin: 0 }}>{t("mallOfArabiaAddress")}</p>
          <div className="d-flex align-items-baseline">
            <div
              style={{
                height: "10px",
                width: "10px",
                backgroundColor:
                  currentProduct.inStock && currentProduct.stockQuantity > 0
                    ? "#0A8A00"
                    : "red",
                borderRadius: "5px",
                marginRight: "6px",
              }}
            ></div>
            <span>
              {t("product.store")} - {t("product.orderInStore")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const PrdInfoSection = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const {
    mainProduct,
    currentProduct,
    onVariantSelect,
    onImageHover,
    addToBagRef,
    addDotEvery3Chars,
    formatPrice,
    addToBagCounter: { addToBagCounter, setAddToBagCounter },
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
        console.log("Adding to cart:", prd, quantity);

        await fetch(`${VITE_API_URL}/api/cart/cartOP`, {
          method: "PATCH",
          body: JSON.stringify({ prdID: prd._id, quantity }),
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
  const formatMeasurement = (measurement) => {
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

  const openOffCanvas = (ref) => {
    ref.current?.handleShow();
  };
  const viewWidth = useViewport();
  const viewCount = useProductViews(currentProduct.id);

  const handleType = (str) => {
    const str2 = str.indexOf(" ");
    return str2 === -1 ? str : str.substring(0, str2);
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
              {currentProduct.typeName[language] + ", "}
              {currentProduct.color[language]}{" "}
              <Link
                className="hoverLink"
                onClick={() => openOffCanvas(measureRef)}
              >
                {formatMeasurement(currentProduct.measurement)}
              </Link>
              <OffCanvas
                ref={measureRef}
                content={
                  <MeasurementsContent
                    addDotEvery3Chars={addDotEvery3Chars}
                    product={currentProduct}
                  />
                }
              />
            </p>

            {currentProduct.price.discounted && (
              <p className="text-decoration-line-through fw-bold m-0">
                {currentProduct.price.currency}
                {formatPrice(currentProduct.price.currentPrice * 0.6)}
              </p>
            )}
            <div style={{ display: "flex" }}>
              <p
                className={language === "ar" ? "order-3" : ""}
                style={{ fontWeight: "bold" }}
              >
                {" "}
                {language === "ar"
                  ? t("cart.EGP")
                  : currentProduct.price.currency}
              </p>
              <b className="order-1 fs-2">
                {formatPrice(currentProduct.price.currentPrice)}
              </b>
            </div>
            <div className={"my-2"}>
              <ProductRating productPrice={currentProduct.price} />
            </div>
          </div>

          <div className={styles.hideBtn}>
            <FavouriteManager
              product={currentProduct}
              onOffcanvasToggle={setIsOffcanvasOpen}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between my-2">
        <b>{t("product.howToGetIt")}</b>
        <Link className="hoverLink" onClick={() => openOffCanvas(storeRef)}>
          {t("product.changeStore")}
        </Link>
        <OffCanvas
          ref={storeRef}
          content={<ChangeStore currentProduct={currentProduct} t={t} />}
        />
      </div>
      <div className="card px-3 py-3">
        <div className="d-flex flex-column mb-1">
          <div className="d-flex  gap-3 ">
            <GrDeliver fontSize={"22px"} className="me-1" />
            <div>
              <p style={{ fontSize: "14px" }} className="m-0 fw-bold">
                {t("product.delivery")}
              </p>
              <div
                style={{
                  fontSize: "14px",
                  marginBottom: "px",
                }}
              >
                <div
                  className="d-inline-block  ms-1"
                  style={{
                    width: "12px",
                    height: "12px",
                    background: "#0A8A00",
                    borderRadius: "50%",
                    verticalAlign: "middle",
                    marginInlineEnd: "6px",
                  }}
                ></div>
                {t("product.inStock")}
              </div>
            </div>
          </div>
        </div>
        <hr className="m-1" />
        <div
          className="d-flex justify-content-between align-items-center 
          dpointer
          "
          // onClick={() => openOffCanvas(storeInfoRef)}
        >
          <div className="d-flex flex-column mt-1 mb-1">
            <div className="d-flex align-items-center">
              <HiOutlineBuildingStorefront
                fontSize={"24px"}
                className=""
                style={{ marginInlineEnd: "20px" }}
              />
              <p style={{ fontSize: "14px" }} className="m-0 fw-bold">
                {t("PD.IKEA_Cairo")}
              </p>
            </div>
            <div
              style={{
                fontSize: "14px",
                paddingInlineStart: "40px",
              }}
            >
              <div
                className="d-inline-block  ms-1"
                style={{
                  width: "12px",
                  height: "12px",
                  verticalAlign: "baseline",
                  marginInlineEnd: "6px",
                  background: `${
                    currentProduct.inStock || !currentProduct.stockQuentity <= 0
                      ? "#0A8A00"
                      : "red"
                  }`,
                  borderRadius: "50%",
                }}
              ></div>
              {t("product.store")} -{" "}
              {currentProduct.inStock || !currentProduct.stockQuentity <= 0
                ? t("product.inStock")
                : t("product.outOfStock")}
            </div>
          </div>
          {/* <NavigateNextIcon /> */}
        </div>
        {/* <OffCanvas ref={storeInfoRef} content={"hello store info"} /> */}
      </div>

      { currentProduct.stockQuantity >= 1 ? (
        <div className={styles.addToBagContainer}>
          <div className={`rounded-pill ${styles.counter}`}>
            <IconButton
              style={{ color: "black" }}
              className="btn"
              disabled={addToBagCounter <= 1 ? true : false}
              onClick={() => setAddToBagCounter(addToBagCounter - 1)}
            >
              <RemoveIcon />
            </IconButton>
            <span>{addToBagCounter}</span>
            <IconButton
              style={{ color: "black" }}
              disabled={
                addToBagCounter >= currentProduct.stockQuantity ? true : false
              }
              onClick={() => setAddToBagCounter(addToBagCounter + 1)}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Button
            onClick={() => {
              openOffCanvas(addToBagRef);
              addToCart(currentProduct, addToBagCounter);
            }}
            className={styles.addButton + " rounded-pill  py-3 my-4"}
            style={{
              backgroundColor: "#0058A3",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            {addToBagCounter === 1
              ? t("product.addToBag", { addToBag: "" })
              : t("product.addToCart", { items: addToBagCounter })}
          </Button>
        </div>
      ) : (
        <p className="text-danger">Out of stock</p>
      )}
      <div className="border mb-3 ">
        <p className="py-2 text-center mb-0">
          <span className="text-primary fw-bold ms-1">{viewCount} </span>
          {t("product.productViews")}
        </p>
      </div>
    </div>
  );
});

export default PrdInfoSection;
