import { IoIosArrowForward } from "react-icons/io";
import useViewport from "../../../hooks/useViewport";
import OffCanvas from "../../OffCanvas/OffCanvas";
import styles from "./variantSelector.module.css";
import { useState, useRef } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

const VariantSelector = ({
  product,
  selectedVariant,
  onVariantSelect,
  onImageHover,
}) => {
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

  const getColorName = (imageAlt) => {
    const colorParts = imageAlt.split(",");
    return colorParts.length > 1 ? colorParts[1].trim() : colorParts[0].trim();
  };

  const handleMouseEnter = (variant) => {
    // Update preview image
    onImageHover(variant ? variant.images[0] : product.images[0]);
    // Update color name
    setHoveredColorName(
      variant
        ? getColorName(variant.imageAlt.en)
        : getColorName(product.imageAlt.en)
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
      ? getColorName(selectedVariant.imageAlt.en)
      : getColorName(product.imageAlt.en));

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
                Choose Color
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
              alt={variant.imageAlt.en}
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
            alt={product.imageAlt.en}
            onClick={() => handleSelection(null)}
            onMouseEnter={() => handleMouseEnter(null)}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        <OffCanvas
          ref={offcanvasRef}
          content={
            <div className="px-4">
              <h3 className="fw-bold text-black mb-3 py-2 ">Choose color</h3>
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
                      alt={variant.imageAlt.en}
                      className="img-fluid"
                    />
                    <p className="text-capitalize">
                      {getColorName(variant.imageAlt.en)}
                    </p>
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
                    alt={product.imageAlt.en}
                    className="img-fluid"
                  />
                  <p className="text-capitalize">
                    {getColorName(product.imageAlt.en)}
                  </p>
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
