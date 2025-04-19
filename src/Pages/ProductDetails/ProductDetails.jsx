import Button from "@mui/joy/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import PrdImgsCrsl from "./../../Components/PrdImgsCrsl/PrdImgsCrsl";
import React, { useState, useRef, useEffect } from "react";
import { GrDeliver } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Model from "../../Components/Model/Model";
import PrdInfoSection from "../../Components/PrdInfoSection/PrdInfoSection";
const imgsUrl = ["1", "2", "3", "4", "5"];

// function scrollfunction(btn) {
//   btn.current.style.display = "block";
//   console.log(btn.current);
//   // if (1 == 1) {
//   // } else {
//   //   btn.current.style.display = "none";
//   // }
// }

const ProductDetails = () => {
  const modelRef = useRef();
  const openOffCanvas = () => {
    modelRef.current?.handleShow();
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

  return (
    <>
      <Model
        placement={"end"}
        title={"Measurements"}
        ref={modelRef}
        modelContent={"hello every body"}
      />
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
        <div className="d-flex container-fluid row-gap-5 mt-5 justify-content-center px-4 flex-wrap">
          <div className="hide prd-imgs mt-2 flex-column">
            {imgsUrl.map((img, index) => {
              return (
                <img
                  style={{ width: "6vw", marginBottom: "12px" }}
                  key={index}
                  src={"img" + (index + 1) + ".avif"}
                />
              );
            })}
          </div>
          <div className="hide prd-imgs  flex-column mt-3">
            <img
              className="img-fluid"
              style={{ width: "54vw" }}
              src={"img1.avif"}
              alt=""
            />
            <div className="btnsOnimgs">
              <Button
                sx={{ fontSize: 12, marginRight: "8px" }}
                className=" rounded-pill Btn3d px-3 py-1"
              >
                <PhotoLibraryIcon
                  sx={{ fontSize: 30, opacity: "1 !important" }}
                  className="pe-2"
                />
                All media
              </Button>
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
          {/* </div> */}
          {/* <div style={{ width: "30vw" }}> */}
          {/* <div > */}
          <PrdInfoSection/>
          {/* </div> */}
          {/* </div> */}
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
              <div className="d-flex justify-content-between align-items-center flex-wrap my-4 info-sections full-width-mobile">
                <hr style={{ width: "100%" }} />
                <h4 className="fw-bold my-3 sections-info">Product details</h4>
                <FaArrowRight style={{ fontSize: "20px" }} />
                <hr style={{ width: "100%" }} />
                {/* </div>

              <div
                className="d-flex justify-content-between align-items-center flex-wrap"
                style={{ width: "50%" }}
              > */}
                <h4 className="fw-bold my-3 sections-info">Measurements</h4>
                <FaArrowRight style={{ fontSize: "20px" }} />
                <hr className="mb-5" style={{ width: "100%" }} />
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
                      <p className="mt-1">Designer Andreas Fredriksson</p>
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
