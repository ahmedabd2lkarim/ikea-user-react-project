const { VITE_API_URL } = import.meta.env;
import { useState, useRef, useEffect } from "react";
import { Button, IconButton } from "../../common/mui/index";
import { ThreeSixtyIcon, PhotoLibraryIcon } from "../../common/mui-icons/index";
import {
  GrDeliver,
  FaLocationDot,
  FaArrowRight,
  IoMdCheckmarkCircleOutline,
} from "../../common/react-icons/index";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
} from "../../common/mui-icons/index";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import Model from "../../Components/Model/Model";

import AddToBag from "../../Components/Product/AddToBag/AddToBag";
import OffCanvas from "./../../Components/OffCanvas/OffCanvas";
import PrdImgsCrsl from "./../../Components/Product/PrdImgsCrsl/PrdImgsCrsl";
import ProductImageZoomInOut from "./../../Components/Product/ProductImageZoomInOut/ProductImageZoomInOut";
import PrdInfoSection from "./../../Components/Product/PrdInfoSection/PrdInfoSection";
import Recommendedproducts from "../../Components/Product/ProductsCarousel/ProductsCarousel";
import Loading from "../../Components/Loading/Loading";
import ProductDetailsOffcanvasContent from "./ProductDetailsOffcanvasContent/ProductDetailsOffcanvasContent";
import useViewport from "../../hooks/useViewport";

function addDotEvery3Chars(str) {
  const num = str.replace(/\D/g, "");
  return num.match(/.{1,3}/g).join(".");
}
const checkResponsive = (width) => {
  if (width >= 900) {
    return true;
  }
  return false;
};

const ProductDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const btnRef = useRef(null);
  const viewWidth = useViewport();
  const addToBag = useRef(products[0]);
  const prdInfoSectionRef = useRef();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setIsLoading(true);
        const productRes = await fetch(`${VITE_API_URL}/api/products/${id}`);
        const productData = await productRes.json();
        setProduct(productData);
        setCurrentProduct(productData);
        if (productData.images && productData.images.length > 0) {
          setImageUrl(productData.images[0]);
        }

        const relatedRes = await fetch(`${VITE_API_URL}/api/products`);
        const relatedData = await relatedRes.json();
        const { data: productsData } = relatedData;
        setProducts(productsData);
        const filteredRelated = productsData
          .filter((p) => p._id !== id)
          .slice(0, 5);
        setRelatedProducts(filteredRelated);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductAndRelated();
  }, [id]);

  useEffect(() => {
    if (currentProduct) {
      setImageUrl(currentProduct.images[currentIndex]);
    }
  }, [currentProduct, currentIndex]);

  const handleArrowRight = () => {
    if (currentIndex >= currentProduct?.images.length - 1) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setImageUrl(currentProduct?.images[nextIndex]);
  };

  const handleArrowLeft = () => {
    if (currentIndex <= 0) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setImageUrl(currentProduct?.images[prevIndex]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1450 && window.screenX <= 900) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const productDetailsRef = useRef();
  const allImgsRef = useRef();
  const openModel = (ref) => {
    ref.current?.handleShow();
  };
  const content = (
    <>
      <div className={"d-flex flex-wrap justify-content-center gap-5 "}>
        {currentProduct?.images.map((img, index) => {
          return (
            <img
              style={{ width: "30vw" }}
              className={checkResponsive(viewWidth) ? "img-fluid" : `w-100`}
              key={index}
              src={img}
              alt={currentProduct.imageAlt.en}
              draggable={false}
            />
          );
        })}
      </div>
    </>
  );
  const handleVariantSelect = (variant) => {
    if (!variant) {
      setCurrentProduct(product);
      setImageUrl(product.images[0]);
      setCurrentIndex(0);
    } else {
      setCurrentProduct({
        ...product,
        id: variant.id,
        name: variant.name || product.name,
        images: variant.images,
        imageAlt: variant.imageAlt,
        price: variant.price || product.price,
        measurement: variant.measurement || product.measurement,
      });
      setImageUrl(variant.images[0]);
      setCurrentIndex(0);
    }
  };

  const handleImageHover = (previewImageUrl) => {
    setImageUrl(previewImageUrl);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;
  return (
    <>
      <div className="freeDeliver hide hoverLink">
        <GrDeliver />
        <Link>Free delivery</Link>
      </div>
      {/* Carousel on small screens*/}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {showBtn && (
          <Button
            ref={btnRef}
            style={{ position: "fixed", bottom: "0", zIndex: 100 }}
            onClick={() => openModel(addToBag)}
            className="rounded-pill  hideBtn my-4 btn-floated   text-light py-2"
          >
            Add to bag
          </Button>
        )}
        <OffCanvas
          content={
            <AddToBag
              currentProduct={currentProduct}
              products={products}
              addToBagRef={addToBag}
            />
          }
          title={
            <div
              style={{ padding: "6px 16px" }}
              className="d-flex align-items-center gap-2"
            >
              <IoMdCheckmarkCircleOutline className="text-success fw-normal fs-4" />
              <span style={{ fontSize: "14px", fontWeight: 300 }}>
                Added to cart
              </span>
            </div>
          }
          ref={addToBag}
        />
        <PrdImgsCrsl
          allImgsRef={allImgsRef}
          handleOpenModel={openModel}
          imgsUrl={currentProduct?.images || []}
        />
        {/* Carousel on large screens*/}
        <div className=" crsl-product-lg container-fluid row-gap-5 mt-5 justify-content-around px-4 flex-wrap">
          <div className="hide prd-imgs mt-3 flex-column">
            {currentProduct?.images.map((img, index) => {
              return (
                <img
                  className={index == 0 ? "borderInit" : "borderHover"}
                  style={{ width: "6vw", marginBottom: "12px" }}
                  key={index}
                  src={img}
                  onMouseEnter={() => setImageUrl(img)}
                  draggable={false}
                  alt={`Product view ${index + 1}`}
                />
              );
            })}
          </div>
          <div className="hide prd-imgs flex-column mt-2">
            <div className="img-container">
              {currentIndex > 0 && (
                <IconButton
                  onClick={handleArrowLeft}
                  className="btn-arrow-left btn-arrow hideBtn"
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
              )}

              {currentIndex < currentProduct?.images.length - 1 && (
                <IconButton
                  className="btn-arrow-right btn-arrow hideBtn"
                  onClick={handleArrowRight}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              )}
              <ProductImageZoomInOut imageSrc={imageUrl} />
            </div>
            <div className="btnsOnimgs">
              <Button
                onClick={() => openModel(allImgsRef)}
                sx={{ fontSize: 12, marginRight: "8px", color: "white" }}
                className=" rounded-pill Btn3d px-3 py-1"
              >
                <PhotoLibraryIcon
                  sx={{ fontSize: 30, opacity: "1 !important" }}
                  className="pe-2"
                />
                All media
              </Button>
              <Model content={content} title={"All media"} ref={allImgsRef} />
              <Button
                sx={{ fontSize: 12, color: "white" }}
                className=" rounded-pill Btn3d px-3 py-1"
              >
                <ThreeSixtyIcon
                  sx={{ fontSize: 30, opacity: "1 !important" }}
                  className="pe-2"
                />
                View in 3D
              </Button>
            </div>
          </div>
          <PrdInfoSection
            ref={prdInfoSectionRef}
            mainProduct={product}
            currentProduct={currentProduct}
            onVariantSelect={handleVariantSelect}
            addToBagRef={addToBag}
            onImageHover={handleImageHover}
          />
          <div style={{ width: "94%" }}>
            <p
              className="full-width-mobile text-secondary"
              style={{
                fontSize: "20px",
              }}
            >
              {currentProduct.short_description.en}
            </p>
            <div style={{ width: "100%", fontSize: "12px" }}>
              <p className="m-0">Article number</p>
              <span
                style={{ fontSize: "14px" }}
                className=" text-light p-1 px-3 me-4 fw-bold bg-black"
              >
                {addDotEvery3Chars(currentProduct._id)}
              </span>
              <FaLocationDot
                className="mb-4 me-1"
                style={{ fontSize: "16px" }}
              />
              <Link className=" hoverLink" href="#">
                Locate product in store
              </Link>
              <div>
                <OffCanvas
                  content={
                    <ProductDetailsOffcanvasContent
                      currentProduct={currentProduct}
                    />
                  }
                  ref={productDetailsRef}
                />

                <div
                  className="d-flex justify-content-between align-items-center flex-wrap sections-info info-sections full-width-mobile "
                  onClick={() => openModel(productDetailsRef)}
                >
                  <hr style={{ width: "100%" }} />
                  <h4 className="fw-bold my-3 productDetailsLabel">
                    Product details
                  </h4>
                  <FaArrowRight style={{ fontSize: "24px" }} />
                  <hr style={{ width: "100%" }} />
                </div>
                <div
                  onClick={() =>
                    prdInfoSectionRef.current.measureRef.handleShow()
                  }
                  className="d-flex sections-info justify-content-between align-items-center flex-wrap  info-sections full-width-mobile"
                >
                  <h4 className="fw-bold my-3 measurementsLabel ">
                    Measurements
                  </h4>
                  <FaArrowRight style={{ fontSize: "24px" }} />
                  <hr className="mb-5" style={{ width: "100%" }} />
                </div>
                <div className="my-5">
                  <h3 className="fw-bold m-3">Related products</h3>
                  <Recommendedproducts products={relatedProducts} />
                </div>

                {currentProduct.short_description && (
                  <div className="mt-5 pt-5 ">
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        opacity: 0.8,
                      }}
                      className=" text-secondary fw-bold"
                    >
                      Designer thoughts
                    </p>
                    <div className="d-flex gap-5">
                      <h3 className="fw-bolder w-50">Designer thoughts</h3>
                      <p
                        style={{
                          width: "50%",
                          fontSize: "16px",
                          color: "#484848",
                          lineHeight: 1.6,
                        }}
                      >
                        "{currentProduct.short_description.en}"
                        {/* <span className="mt-1 d-block text-capitalize">
                          {
                            currentProduct.short_description.en.match(
                              /designed by\s+([^,.]+)/i
                            )[0]
                          }
                        </span> */}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              <div>
                <h4>Get the look</h4>
                <p className="text-secondary">
                  Ideas based on your recently viewed products
                </p>
              </div>

              <div>
                <h4>Accessories for ÄSPINGE</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
