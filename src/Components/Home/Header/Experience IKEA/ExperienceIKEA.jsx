import React from "react";
import { Box, Typography, IconButton, ButtonBase } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./ExperienceIKEA.css"; // Include scrollbar styles

const categories = [
  {
    id: 1,
    title: "Free delivery",
    image:
      "https://www.ikea.com/images/fa/bc/fabca628073d3ddc40a9bdf0cf93c1c9.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/campaigns/free-delivery-pub41912510/",
  },
  {
    id: 2,
    title: "Cash on delivery",
    image:
      "https://www.ikea.com/images/7e/72/7e727c25aba99e29b305a087b59ef08e.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/customer-service/terms-conditions/#2b9478b0-070a-11eb-810c-b9579a1f1c2d",
  },
  {
    id: 3,
    title: "Click & collect",
    image:
      "https://www.ikea.com/images/86/7e/867ed183e756cfbf0e3bcbc342523c8d.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/customer-service/services/click-collect/",
  },
  {
    id: 4,
    title: "Online planning tools",
    image:
      "https://www.ikea.com/images/8a/a1/8aa1d9764ea4a5d1462a0024e6173bf0.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/planners/",
  },
  {
    id: 5,
    title: "IKEA app",
    image:
      "https://www.ikea.com/images/e9/27/e9276e3806492763cbfdbc23305385c2.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/customer-service/shopping-at-ikea/ikea-shopping-app-pubc9ac6ea1/",
  },
  {
    id: 6,
    title: "IKEA Family",
    image:
      "https://www.ikea.com/images/76/d3/76d343876c4947e314ecd910edbb54ab.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/ikea-family/",
  },
  {
    id: 7,
    title: "IKEA for business",
    image:
      "https://www.ikea.com/images/b9/6a/b96a2ec6b0fd34de1d2ba18ce878d0bf.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/ikea-business/",
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

export const ExperienceIKEA = () => {
  return (
    <Box
      sx={{ px: 3, py: 3, position: "relative" }}
      className="slider-container" // Add a class for hover effect
    >
        <Typography fontSize={24} fontWeight={700} m={2}>
        Experience IKEA
        </Typography>
      <ScrollMenu LeftArrow={<LeftArrow />} RightArrow={<RightArrow />}>
        {categories.map((cat) => (
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
            }}
          >
            <Box
              component="img"
              src={cat.image}
              alt={cat.title}
              sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 0, // Square corners
                cursor: "pointer", // Pointer cursor only on the image
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "#fff",
                px: 2,
                py: 0.5,
                borderRadius: "20px", // Rounded pill shape
                boxShadow: 1,
                textAlign: "center",
                whiteSpace: "nowrap", // Prevent text wrapping
                height: "30px", // Fixed height for consistency
                display: "flex",
                alignItems: "center", // Vertically center text
                justifyContent: "center", // Horizontally center text
                "&:hover": {
                  backgroundColor: "#f5f5f5", // Light grey on hover
                },
              }}
            >
              <Typography
                sx={{ fontSize: "14px", fontWeight: "bold", color: "#000" }}
              >
                {cat.title}
              </Typography>
            </Box>
          </ButtonBase>
        ))}
      </ScrollMenu>
    </Box>
  );
};

export default ExperienceIKEA;

