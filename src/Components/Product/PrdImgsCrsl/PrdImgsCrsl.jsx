import  { useState, useEffect, useRef, useTransition } from "react";
import { useSwipeable } from "react-swipeable";
import { Carousel } from "react-bootstrap";
import {  Button } from "../../../common/mui/index";
import { ThreeSixtyIcon } from "../../../common/mui-icons/index";
import "./PrdImgsCrsl.css";
import FavouriteManager from "../../../Pages/Favourite/TopSellerProductCarousel/FavouriteOffcanvaceCarousal/FavouriteManager";
import { useTranslation } from "react-i18next";
export default function PrdImgsCrsl({
  handleOpenModel,
  allImgsRef,
  imgsUrl,
  currentProduct,
}) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const slideCount = imgsUrl.length;
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const carouselWrapperRef = useRef(null);
  useEffect(() => {
    setIndex(0);
  }, [imgsUrl]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => (prev + 1) % slideCount),
    onSwipedRight: () =>
      setIndex((prev) => (prev - 1 + slideCount) % slideCount),
    trackMouse: true,
  });

  useEffect(() => {
    let isThrottled = false;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();

        if (isThrottled) return;

        if (e.deltaX > 0) {
          setIndex((prev) => (prev + 1) % slideCount);
        } else {
          setIndex((prev) => (prev - 1 + slideCount) % slideCount);
        }

        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 1000);
      }
    };

    const carouselEl = carouselWrapperRef.current;
    if (carouselEl) {
      carouselEl.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (carouselEl) {
        carouselEl.removeEventListener("wheel", handleWheel);
      }
    };
  }, [slideCount]);

  return (
    <div ref={carouselWrapperRef}>
      <Carousel
        interval={null}
        {...handlers}
        className="crsl-product hide mb-5"
        activeIndex={index}
        onSelect={handleSelect}
        data-bs-theme="dark"
        slide={false}
        touch={true}
        controls={false}
      >
        {imgsUrl.map((img, index) => {
          return (
            <Carousel.Item key={img}>
              <div className="favIcon">
                <FavouriteManager
                  product={currentProduct}
                  onOffcanvasToggle={setIsOffcanvasOpen}
                />
              </div>
              <div>
                <img
                  onClick={() => handleOpenModel(allImgsRef)}
                  className="w-100 prd-img"
                  alt={currentProduct.imageAlt[language]}
                  src={img}
                />
                {index === 0 && (
                  <Button
                    sx={{ fontSize: 12, color: "white", zIndex: 100 ,marginEnd:"20px,display:flex,justifyContent:space-between",  fontFamily: "system-ui"
                    }}
                    className=" rounded-pill Btn3d px-3 py-2"
                  >
                    <ThreeSixtyIcon sx={{ fontSize: 24 ,marginInlineEnd:"6px" }} className="" />
                    {t("product.viewIn3d")}
                  </Button>
                )}
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
