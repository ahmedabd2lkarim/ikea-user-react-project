import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { Carousel } from "react-bootstrap";
import { IconButton } from "../../../common/mui/index";
import {
  FavoriteBorderIcon,
  ThreeSixtyIcon,
} from "../../../common/mui-icons/index";
import Button from "@mui/joy/Button";
import "./PrdImgsCrsl.css";
export default function PrdImgsCrsl({ handleOpenModel, allImgsRef, imgsUrl }) {
  const slideCount = imgsUrl.length;
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
              <IconButton className="favIcon ">
                <FavoriteBorderIcon />
              </IconButton>
              <div>
                <img
                  onClick={() => handleOpenModel(allImgsRef)}
                  className="img-fluid prd-img"
                  alt="900x500"
                  src={img}
                />
                {index === 0 && (
                  <Button
                    sx={{ fontSize: 12 }}
                    className=" rounded-pill Btn3d px-3 py-1"
                  >
                    <ThreeSixtyIcon sx={{ fontSize: 30 }} className="pe-2" />
                    View in 3D
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
