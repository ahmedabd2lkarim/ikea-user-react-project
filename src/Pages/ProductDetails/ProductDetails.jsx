import { Button } from "../../common/mui/index";
import "bootstrap/dist/css/bootstrap.min.css";
import PrdImgsCrsl from "./../../Components/PrdImgsCrsl/PrdImgsCrsl";
import { IconButton } from "@mui/joy";
import React, { useState, useRef, useEffect } from "react";
import { GrDeliver } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";
import { ThreeSixtyIcon, PhotoLibraryIcon } from "../../common/mui-icons/index";
import Model from "./../../Components/Model/Model";
import PrdInfoSection from "../../Components/PrdInfoSection/PrdInfoSection";
import ProductImageZoomInOut from "../../Components/productImageZoomInOut/productImageZoomInOut";
const imgsUrl = [
  "img1.avif",
  "img2.avif",
  "img3.avif",
  "img4.avif",
  "img5.avif",
];
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const ProductDetails = () => {
  const prdInfoSectionRef = useRef();

  const [imageUrl, setImageUrl] = useState(imgsUrl[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleArrowRight = () => {
    if (currentIndex >= imgsUrl.length - 1) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setImageUrl(imgsUrl[nextIndex]);
  };
  const handleArrowLeft = () => {
    if (currentIndex <= 0) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setImageUrl(imgsUrl[prevIndex]);
  };
  const [showBtn, setShowBtn] = useState(false);
  const btnRef = useRef(null);
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
        {imgsUrl.map((img, index) => {
          return (
            <img
              style={{ width: "30vw" }}
              className="img-fluid "
              key={index}
              src={img}
              alt=""
              draggable={false}
            />
          );
        })}
      </div>
    </>
  );

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
            className="rounded-pill  hideBtn my-4 btn-floated   text-light py-2"
          >
            Add to bag
          </Button>
        )}
        <PrdImgsCrsl imgsUrl={imgsUrl} />
        {/* Carousel on large screens*/}
        <div className="d-flex container-fluid row-gap-5 mt-5 justify-content-around px-4 flex-wrap">
          <div className="hide prd-imgs mt-3 flex-column">
            {imgsUrl.map((img, index) => {
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

              {currentIndex < imgsUrl.length - 1 && (
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
          <PrdInfoSection ref={prdInfoSectionRef} />

          <div style={{ width: "94%" }}>
            <p
              className="full-width-mobile text-secondary"
              style={{
                fontSize: "20px",
              }}
            >
              ÄSPINGE kitchenette doesn’t compromise on quality, function or
              personal expression. Clever storage solutions and a blend of
              materials make this small-size unit into a big show of who you
              are.
            </p>
            <div style={{ width: "100%", fontSize: "12px" }}>
              <p className="m-0">Article number</p>
              <span
                style={{ fontSize: "12px" }}
                className=" text-light p-1 px-2 me-4 fw-bold bg-black"
              >
                105.002.81
              </span>
              <FaLocationDot
                className="mb-4 me-1"
                style={{ fontSize: "16px" }}
              />
              <Link className=" hoverLink" href="#">
                Locate product in store
              </Link>
              <div>
                <Model
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
