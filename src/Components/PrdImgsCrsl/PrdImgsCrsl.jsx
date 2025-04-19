import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Carousel } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/joy/Button";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";

export default function PrdImgsCrsl({ imgsUrl }) {
  const slideCount = imgsUrl.length;
  const [index, setIndex] = useState(1);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => (prev + 1) % slideCount),
    onSwipedRight: () =>
      setIndex((prev) => (prev - 1 + slideCount) % slideCount),
    trackMouse: true,
  });
  function handleCarouselImgs() {
    return imgsUrl.map((img, index) => {
      return (
        <Carousel.Item key={img}>
          <IconButton className="favIcon bg-light">
            <FavoriteBorderIcon />
          </IconButton>
          <div>
            <img
              className="img-fluid prd-img"
              alt="900x500"
              src={`img${img}.avif`}
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
    });
  }
  return (
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
      {handleCarouselImgs()}
    </Carousel>
  );
}
