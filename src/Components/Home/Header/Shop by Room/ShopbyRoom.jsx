import React from "react";
import { Box, Typography, IconButton, ButtonBase } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./ShopbyRoom.css"; // Include scrollbar styles
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const categories = [
  {
    id: 1,
    title: "Bedroom",
    image:
      "https://www.ikea.com/ext/ingkadam/m/79f6bd6ca25391f7/original/PH179171.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/rooms/bedroom/",
  },
  {
    id: 2,
    title: "Living",
    image:
      "https://www.ikea.com/ext/ingkadam/m/10e1d5a52c9750b5/original/PH152874-crop004.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/rooms/living-room/",
  },
  {
    id: 3,
    title: "Garden & Balcony",
    image:
      "https://www.ikea.com/ext/ingkadam/m/19ec2eb44a0ef324/original/PH184302.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/rooms/outdoor/",
  },
  {
    id: 4,
    title: "Dining",
    image:
      "https://www.ikea.com/ext/ingkadam/m/73f850e757fef06b/original/PH172954-crop002.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/rooms/dining/",
  },
  {
    id: 5,
    title: "Children's room",
    image:
      "https://www.ikea.com/ext/ingkadam/m/a803821e8ce7211/original/PH188366.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/rooms/childrens-room/",
  },
  {
    id: 6,
    title: "Home office",
    image:
      "https://www.ikea.com/ext/ingkadam/m/7177f14ce69caa70/original/PH178283.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/rooms/home-office/",
  },
  {
    id: 7,
    title: "See all rooms",
    // image:
    //   "https://www.ikea.com/ext/ingkadam/m/6458a8d8bbbd7378/original/PH186636.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/rooms/",
  },
];

const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return (
    <IconButton
      onClick={() => scrollPrev()}
      className="slider-button" // Add a class for hover visibility
      sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        zIndex: 2,
        // bgcolor: "#000",
        // color: "#fff",
        // border: "1px solid #000",
        boxShadow: 1,
        width: 36,
        height: 36,
        borderRadius: "50%",
        display: "none", // Initially hidden
      }}
    >
      <ArrowBackIos fontSize="small" />
    </IconButton>
  );
};

const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);
  return (
    <IconButton
      onClick={() => scrollNext()}
      className="slider-button" // Add a class for hover visibility
      sx={{
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
        zIndex: 2,
        // bgcolor: "#000",
        // color: "#fff",
        // border: "1px solid #000",
        boxShadow: 1,
        width: 36,
        height: 36,
        borderRadius: "50%",
        display: "none", // Initially hidden
      }}
    >
      <ArrowForwardIos fontSize="small" />
    </IconButton>
  );
};

export const ShopbyRoom = () => {
  return (
    <Box
      sx={{ px: 3, py: 3, position: "relative" }}
      className="slider-container" // Add a class for hover effect
    >
      <Typography fontSize={24} fontWeight={700} m={2}>
        Shop by Room
      </Typography>
      <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
        {categories.map((cat) => {
          const isSpecial = cat.id === 7; // Check if the card is special
          return (
            <ButtonBase
              href={cat.link}
              rel="noopener noreferrer"
              key={cat.id}
              sx={{
                textDecoration: "none",
                display: "block",
                mx: 1.5,
                minWidth: 230,
                maxWidth: 240,
                position: "relative",
                overflow: "hidden",
                flexShrink: 0,
                bgcolor: isSpecial ? "#D6AF76" : "transparent", // Custom background for special card
                "&:hover .special-text": {
                  textDecoration: "underline", // Add underline on hover
                },
              }}
            >
              {/* 1. Text at the top (only for special card) */}
              {isSpecial && (
                <Typography
                  className="special-text" // Add a class for targeting hover
                  sx={{
                    position: "absolute",
                    top: 40,
                    left: "40%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#000",
                  }}
                >
                  {cat.title}
                </Typography>
              )}

              {/* Image or Background */}
              {!isSpecial ? (
                <Box
                  component="img"
                  src={cat.image}
                  alt={cat.title}
                  sx={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    bgcolor: "#D6AF76", // Full background color for special card
                    borderRadius: "12px",
                  }}
                />
              )}

              {/* 2. Circle Button Instead of Rectangular */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 50,
                  left: isSpecial ? "25%" : "50%",
                  transform: "translateX(-50%)",
                  bgcolor: isSpecial ? "black" : "#fff",
                  px: isSpecial ? 0 : 2,
                  py: isSpecial ? 0 : 0.5,
                  width: isSpecial ? 40 : "auto",
                  height: isSpecial ? 40 : 30,
                  borderRadius: isSpecial ? "50%" : "20px",
                  boxShadow: 1,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: isSpecial ? "grey" : "#f5f5f5",
                  },
                }}
              >
                {isSpecial ? (
                  <ArrowForwardIcon sx={{ fontSize: 24, color: "white" }} /> // Icon inside the circle button
                ) : (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#000",
                      textAlign: "center",
                    }}
                  >
                    {cat.title}
                  </Typography>
                )}
              </Box>
            </ButtonBase>
          );
        })}
      </ScrollMenu>
    </Box>
  );
};

export default ShopbyRoom;