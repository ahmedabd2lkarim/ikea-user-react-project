import { Button } from "../../common/mui/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { IconButton } from "@mui/joy";
import { useState, useRef, useEffect } from "react";
import { GrDeliver } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";
import { ThreeSixtyIcon, PhotoLibraryIcon } from "../../common/mui-icons/index";
import Model from "../../Components/Model/Model";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddToBag from "../../Components/Product/AddToBag/AddToBag";
import OffCanvas from "./../../Components/OffCanvas/OffCanvas";
import PrdImgsCrsl from "./../../Components/Product/PrdImgsCrsl/PrdImgsCrsl";
import ProductImageZoomInOut from "./../../Components/Product/ProductImageZoomInOut/ProductImageZoomInOut";
import PrdInfoSection from "./../../Components/Product/PrdInfoSection/PrdInfoSection";
import Recommendedproducts from "../../Components/Product/Recommendedproducts/RecommendedProducts";
import Loading from "../../Components/Loading/Loading";
function addDotEvery3Chars(str) {
  const num = str.replace(/\D/g, "");
  return num.match(/.{1,3}/g).join(".");
}
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
  const addToBag = useRef(products[0]);
  const prdInfoSectionRef = useRef();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setIsLoading(true);
        const productRes = await fetch(`http://localhost:3000/products/${id}`);
        const productData = await productRes.json();
        setProduct(productData);
        setCurrentProduct(productData);
        if (productData.images && productData.images.length > 0) {
          setImageUrl(productData.images[0]);
        }

        const relatedRes = await fetch("http://localhost:3000/products");
        const relatedData = await relatedRes.json();
        const filteredRelated = relatedData
          .filter((p) => p.id !== id)
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
      <div className="container-fluid d-flex flex-wrap justify-content-center gap-5 ">
        {currentProduct?.images.map((img, index) => {
          return (
            <img
              style={{ width: "30vw" }}
              className="img-fluid "
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
      <div style={{ position: "relative" }}>
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
              relatedProducts={products}
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
        <PrdImgsCrsl imgsUrl={currentProduct?.images || []} />
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
                sx={{ fontSize: 12, marginRight: "8px" }}
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
                sx={{ fontSize: 12 }}
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
            product={product}
            currentProduct={currentProduct}
            onVariantSelect={handleVariantSelect}
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
                {addDotEvery3Chars(currentProduct.id)}
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
                  content={"hellp"}
                  title={"All Product details"}
                  ref={productDetailsRef}
                />

                <div
                  className="d-flex justify-content-between align-items-center flex-wrap sections-info info-sections full-width-mobile"
                  onClick={() => openModel(productDetailsRef)}
                >
                  <hr style={{ width: "100%" }} />
                  <h4 className="fw-bold my-3 ">Product details</h4>
                  <FaArrowRight style={{ fontSize: "24px" }} />
                  <hr style={{ width: "100%" }} />
                </div>
                <div
                  onClick={() => prdInfoSectionRef.current?.openMeasureCanvas()}
                  className="d-flex sections-info justify-content-between align-items-center flex-wrap  info-sections full-width-mobile"
                >
                  <h4 className="fw-bold my-3 ">Measurements</h4>
                  <FaArrowRight style={{ fontSize: "24px" }} />
                  <hr className="mb-5" style={{ width: "100%" }} />
                </div>
                <div>
                  <h4 className="fw-bold my-3">Related products</h4>
                  <Recommendedproducts products={relatedProducts} />
                </div>
                <div>
                  <p className="text-secondary fw-bold">Designer thoughts</p>
                  <div className="d-flex gap-5">
                    <h4 className="fw-bold w-50">Designer thoughts</h4>
                    <p className="text-secondary" style={{ width: "50%" }}>
                      When I designed ÄSPINGE kitchenette, I wanted to create a
                      functional solution for small spaces that could also
                      become a personal expression of who you are. I played with
                      the idea of scaffolding that you build in levels upwards.
                      It comes alive when you hang things like herbs and
                      utensils from the ceiling ribs or show your favourite oils
                      on the splashback shelf. Move the hooks and shelves as you
                      please and create your own market booth display full of
                      warmth and character.
                      <span className="mt-1 d-block">
                        Designer Andreas Fredriksson
                      </span>
                    </p>
                  </div>
                </div>
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
