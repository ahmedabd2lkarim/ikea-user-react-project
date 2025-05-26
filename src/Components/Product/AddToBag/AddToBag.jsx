import { Button } from "../../../common/mui/index";
import styles from "./AddToBag.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductRating from "../../ProductRating/ProductRating";
import { TbBasketPlus } from "../../../common/react-icons/index";
import { useTranslation } from "react-i18next";

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




export default function AddToBag({ currentProduct, products, addToBagRef, formatPrice }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const relatedProducts = [];
  products.filter((product) => {
    if (currentProduct._id !== product._id) {
      relatedProducts.push(product);
    }
  });

  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (productId) => {
    setHoveredId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const closeOffCanvas = (ref) => {
    ref.current?.handleClose();
  };

  return (
    <div className="d-flex flex-column justify-content-center h-100">
      <div className={` ${styles.addedCardPrd} mb-3`}>
        <div>
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.imageAlt[language]}
          />
        </div>
        <div className={`${styles["added-card-product-info"]}`}>
          <p className="m-0 " style={{ fontSize: "15px" }}>
            <b className="d-block ">{currentProduct.name}</b>
            <span style={{ color: "#484848" }}>
              {currentProduct.typeName[language]}
              {formatMeasurement(currentProduct.measurement, language) !== ""
                ? ","
                : ""}
              <br />
              {formatMeasurement(currentProduct.measurement, language)}
            </span>
          </p>
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
        </div>
      </div>
      <div
        style={{
          height: "50vh",
          borderBlock: "1px solid #00000029",
          padding: "2px 6px",
        }}
        className=" overflow-auto "
      >
        <h5 className="m-3 mb-5 text-dark fw-bold">
          {t("product.complementYourOrder")}
        </h5>

        {relatedProducts.map((prd) => {
          return (
            <div
              className="d-flex justify-content-around align-items-baseline"
              key={prd.id}
            >
              <div
                onClick={() => navigate(`/productDetails/${prd._id}`)}
                className={styles.compeleteOrderProduct}
              >
                <div style={{ width: "fit-content" }}>
                  <img
                    src={
                      hoveredId === prd.id && prd.images[1]
                        ? prd.images[1]
                        : prd.images[0]
                    }
                    alt={prd.imageAlt[language]}
                    onMouseEnter={() => handleMouseEnter(prd.id)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>

                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <div
                      style={{ width: "100%" }}
                      className={styles.compeleteOrderProductInfo}
                    >
                      <p className="m-0 " style={{ fontSize: "15px" }}>
                        <b className="d-block ">{prd.name}</b>
                        <span style={{ color: "#484848" }}>
                          {prd.typeName[language]}
                          {formatMeasurement(prd.measurement, language) !== ""
                            ? ","
                            : ""}
                          <br />
                          {formatMeasurement(prd.measurement, language)}
                        </span>
                      </p>
                      <div style={{ display: "flex" }}>
                        <p
                          className={language === "ar" ? "order-3" : ""}
                          style={{ fontWeight: "bold" }}
                        >
                          {" "}
                          {language === "ar"
                            ? t("cart.EGP")
                            : prd.price.currency}
                        </p>
                        <b className="order-1 fs-2">
                          {formatPrice(prd.price.currentPrice)}
                        </b>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ProductRating productPrice={prd.price} />
                  </div>
                </div>
              </div>

              <div>
                <Button
                  sx={{
                    borderRadius: "50%",
                    minWidth: 0,
                    width: 40,
                    height: 40,
                    padding: 0,
                    backgroundColor: "#1976d2",
                    marginInlineStart: "auto",
                  }}
                >
                  <TbBasketPlus fontSize={20} color="white" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{ paddingTop: "20px" }}
        className="d-flex justify-content-around  h-25 gap-3"
      >
        <button
          onClick={() => closeOffCanvas(addToBagRef)}
          className={`rounded-pill ${styles.continueShoppingBtn}`}
        >
          {t("product.continueShopping")}
        </button>
        <button
          onClick={() => navigate("/cart")}
          className={`rounded-pill ${styles.goShoppingBagBtn}`}
        >
          {t("product.goToShoppingBag")}
        </button>
      </div>
    </div>
  );
}
