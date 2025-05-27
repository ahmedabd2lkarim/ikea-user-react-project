import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "../../../common/react-icons/index";
import useViewport from "../../../hooks/useViewport";
import OffCanvas from "../../OffCanvas/OffCanvas";
import styles from "./VariantSelector.module.css";
import { useState, useRef } from "react";

const VariantSelector = ({
  product,
  selectedVariant,
  onVariantSelect,
  onImageHover,
}) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [hoveredColorName, setHoveredColorName] = useState(null);
  const viewWidth = useViewport();
  const offcanvasRef = useRef();

  const handleClose = () => offcanvasRef.current?.handleClose();
  const handleShow = () => {
    if (viewWidth > 900) {
      offcanvasRef.current?.handleShow();
    }
  };

  const handleSelection = (variant) => {
    onVariantSelect(variant);
    handleClose();
  };

  const handleMouseEnter = (variant) => {
    // Update preview image
    onImageHover(variant ? variant.images[0] : product.images[0]);
    // Update color name
    setHoveredColorName(
      variant ? variant.color[language] : product.color[language]
    );
  };

  const handleMouseLeave = () => {
    // Restore selected image
    onImageHover(
      selectedVariant ? selectedVariant.images[0] : product.images[0]
    );
    // Restore selected color name
    setHoveredColorName(null);
  };

  const displayedColorName =
    hoveredColorName ||
    (selectedVariant
      ? selectedVariant.color[language]
      : product.color[language]);

  return (
    <>
      <div>
        <div
          onClick={handleShow}
          className={`${
            viewWidth > 900
              ? styles.colorPlaceholder
              : styles.colorPlacehodlderDisapled
          } d-flex  align-items-center gap-2`}
        >
          <div className="w-100">
            <span>
              <b
                className={
                  viewWidth > 900
                    ? styles.colorPlaceholder
                    : styles.colorPlacehodlderDisapled
                }
              >
                {t("product.chooseColor")}
                {viewWidth < 900 ? `: ` : ""}
              </b>
            </span>
            {viewWidth > 900 && <br />}
            <span className={styles.colorName}>{displayedColorName}</span>
          </div>
          {viewWidth > 900 && (
            <div>
              <IoIosArrowForward />
            </div>
          )}
        </div>
        <div className="d-flex">
          {product.variants.map((variant, idx) => (
            <img
              key={variant.id}
              style={{ order: `${idx == 0 ? 1 : ""}` }}
              className={`${styles.variantSelector} ${
                selectedVariant?.id === variant.id ? styles.selectedVariant : ""
              }`}
              src={variant.images[0]}
              alt={variant.imageAlt[language]}
              onClick={() => handleSelection(variant)}
              onMouseEnter={() => handleMouseEnter(variant)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
          <img
            style={{ order: `3` }}
            className={`${styles.variantSelector} ${
              !selectedVariant ? styles.selectedVariant : ""
            }`}
            src={product.images[0]}
            alt={product.imageAlt[language]}
            onClick={() => handleSelection(null)}
            onMouseEnter={() => handleMouseEnter(null)}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        <OffCanvas
          ref={offcanvasRef}
          content={
            <div className="px-4">
              <h3 className="fw-bold text-black mb-3 py-2 ">
                {t("product.chooseColor")}
              </h3>
              <div className="d-flex flex-column gap-3  align-items-center">
                {product.variants.map((variant, idx) => (
                  <div
                    style={{ order: `${idx == 0 ? 1 : ""}` }}
                    key={variant.id}
                    className={`d-flex align-items-center gap-3 ${
                      styles.offCanvasVariantItem
                    } ${
                      selectedVariant?.id === variant.id
                        ? styles.offCanvasSelectedVariantItem
                        : ""
                    }`}
                    onClick={() => handleSelection(variant)}
                  >
                    <img
                      src={variant.images[0]}
                      alt={variant.imageAlt[language]}
                      className="img-fluid"
                    />
                    <p className="text-capitalize">{variant.color[language]}</p>
                  </div>
                ))}
                <div
                  style={{ order: 3 }}
                  className={` d-flex align-items-center gap-3 ${
                    styles.offCanvasVariantItem
                  } ${
                    !selectedVariant ? styles.offCanvasSelectedVariantItem : ""
                  }`}
                  onClick={() => handleSelection(null)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.imageAlt[language]}
                    className="img-fluid"
                  />
                  <p className="text-capitalize">{product.color[language]}</p>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};

export default VariantSelector;
