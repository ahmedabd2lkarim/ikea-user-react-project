import { Link } from "react-router-dom";
import {
  HiOutlineBuildingStorefront,
  GrDeliver,
  FaAngleDown,
} from "../../../common/react-icons/index";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Button } from "../../../common/mui/index";
import {
  FavoriteBorderIcon,
  NavigateNextIcon,
} from "../../../common/mui-icons/index";
import { IconButton } from "../../../common/mui/index";
import OffCanvas from "../../OffCanvas/OffCanvas";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import VariantSelector from "../VariantSelector/VariantSelector";
import useViewport from "../../../hooks/useViewport";
import useProductViews from "../../../hooks/useProductViews";
import styles from "./PrdInfoSection.module.css";
import CollapsibleSection from "../../CollapsibleSection/CollapsibleSection";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#000",
  },
});

function addDotEvery3Chars(str) {
  const num = str.replace(/\D/g, "");
  return num.match(/.{1,3}/g).join(".");
}

const getInspiredRating = (price) => {
  // Generate rating based on price range
  if (!price?.currentPrice) return 4.0; // default if no price
  const priceValue = price.currentPrice;

  if (priceValue >= 10000) return 4.8;
  if (priceValue >= 5000) return 4.5;
  if (priceValue >= 2000) return 4.2;
  if (priceValue >= 1000) return 4.0;
  return 3.8;
};

const formatPrice = (price) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PrdInfoSection = forwardRef(
  ({ product, currentProduct, onVariantSelect, onImageHover }) => {
    const measureRef = useRef();
    const storeRef = useRef();
    const storeInfoRef = useRef();
    const addToBag = useRef(null);
    const [open, setOpen] = useState(false);
    const openOffCanvas = (ref) => {
      ref.current?.handleShow();
    };
    const collapseRef = useRef(null);
    const viewWidth = useViewport();
    const viewCount = useProductViews(currentProduct.id);
    const [collapseValue, setCollapse] = useState(false);
    const collapseFun = () => {
      setCollapse(!collapseValue);
      setOpen(true);
    };

    useEffect(() => {
      if (open && collapseRef.current) {
        setTimeout(() => {
          collapseRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }, [open]);

    const handleType = (str) => {
      const str2 = str.indexOf(" ");
      return str2 === -1 ? str : str.substring(0, str2);
    };

    const MeasurementsContent = ({ product }) => {
      const [measurement, unit] = product.measurement.en.split(" ");
      const [width, depth, height] = measurement.split("x");

      return (
        <>
          <p className="fs-3 px-4 fw-bold">Measurements</p>
          <div className="px-4 d-flex flex-column">
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
                  <div>
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
        </>
      );
    };

    const addToBagData = (
      <div className="d-flex justify-content-around">
        <img
          className="img-fluid w-25"
          src={currentProduct.images[0]}
          alt={currentProduct.imageAlt.en}
        />
        <div>
          <b>{currentProduct.name}</b>
          <p className="m-0">
            {currentProduct.typeName.en}, {currentProduct.measurement.en}
          </p>
          <p>
            {currentProduct.price.currency}
            {formatPrice(currentProduct.price.currentPrice)}
          </p>
        </div>
      </div>
    );
    return (
      <div className="prd-description">
        <div className="d-flex justify-content-between  flex-column">
          <div>
            <div>
              {viewWidth > 900 && product.variants.length > 0 && <hr />}
              {product.variants.length > 0 && (
                <VariantSelector
                  product={product}
                  selectedVariant={
                    currentProduct.id !== product.id ? currentProduct : null
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
                <Link
                  className="hoverLink"
                  onClick={() => openOffCanvas(measureRef)}
                >
                  {currentProduct.measurement.en}
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
            </div>

            <div>
              <IconButton className="favIcon">
                <FavoriteBorderIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2 mb-3">
          <StyledRating
            readOnly
            sx={{ fontSize: "18px" }}
            name="product-rating"
            value={getInspiredRating(currentProduct.price)}
            precision={0.1}
          />
          <span className="text-secondary" style={{ fontSize: "14px" }}>
            ({getInspiredRating(currentProduct.price).toFixed(1)})
          </span>
        </div>
        <br />
        <div className="d-flex justify-content-between my-2">
          <b>How to get it</b>
          <Link className="hoverLink" onClick={() => openOffCanvas(storeRef)}>
            Change store
          </Link>
          <OffCanvas ref={storeRef} content={"hello every body"} />
        </div>
        <div className="card p-3">
          <div className="d-flex flex-column mb-3">
            <div className="d-flex align-items-center ">
              <GrDeliver
                style={{ width: "24px" }}
                fontSize={"40px"}
                className="me-3"
              />
              <p className="m-0 fw-bold">Delivery</p>
            </div>
            <div
              style={{
                fontSize: "14px",
                paddingLeft: "40px",
                color: "",
              }}
            >
              <div
                className="d-inline-block me-1"
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
          <hr className="m-0" />
          <div
            className="d-flex justify-content-between align-items-center pointer"
            onClick={() => openOffCanvas(storeInfoRef)}
          >
            <div className="d-flex flex-column ">
              <div className="d-flex align-items-center">
                <HiOutlineBuildingStorefront
                  style={{ width: "24px" }}
                  fontSize={"40px"}
                  className="me-3"
                />
                <p className="m-0 fw-bold">IKEA Cairo Festival City</p>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  paddingLeft: "40px",
                }}
              >
                <div
                  className="d-inline-block me-1"
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
        <Button
          onClick={() => openOffCanvas(addToBag)}
          className="rounded-pill w-100 py-3 my-4"
        >
          Add to bag
        </Button>
        <OffCanvas
          content={addToBagData}
          title={
            <div className="d-flex align-items-center gap-2">
              <IoMdCheckmarkCircleOutline className="text-success fw-normal fs-4" />
              <span style={{ fontSize: "14px", fontWeight: 300 }}>
                Added to cart
              </span>
            </div>
          }
          ref={addToBag}
        />
        <div className="border mb-3 ">
          <p className="py-2 text-center mb-0">
            <span className="text-primary fw-bold">{viewCount}</span> people
            have viewed this product today
          </p>
        </div>
      </div>
    );
  }
);

export default PrdInfoSection;
