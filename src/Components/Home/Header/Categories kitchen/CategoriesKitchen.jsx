import React from "react";
import { Box, Typography, IconButton, ButtonBase } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./CategoriesKitchen.css"; // Include scrollbar styles

const categories = [
  {
    id: 1,
    title: "Kitchen islands & trolleys",
    image:
      "https://www.ikea.com/ext/ingkadam/m/6b5c66cb0c569030/original/PH182246.JPG?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/kitchen-islands-trolleys-10471/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 2,
    title: "Interior fittings",
    image:
      "https://www.ikea.com/ext/ingkadam/m/4262a5b0f077ce72/original/PH161295-crop001.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/interior-fittings-24255/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 3,
    title: "KNOXHULT unit kitchen",
    image:
      "https://www.ikea.com/ext/ingkadam/m/52b1787d68740466/original/PH152575.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/knoxhult-unit-kitchen-48977/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 4,
    title: "ENHET kitchen",
    image:
      "https://www.ikea.com/ext/ingkadam/m/2cb0c3a99d9e18a1/original/PH174251.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/enhet-kitchen-ka004/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 5,
    title: "Metod kitchen",
    image:
      "https://www.ikea.com/ext/ingkadam/m/7365a2abe5ecec00/original/PH192005.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/metod-kitchen-ka005/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 6,
    title: "Knobs & handles",
    image:
      "https://www.ikea.com/ext/ingkadam/m/41d6f1a83e191f34/original/PH171573.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/knobs-handles-16298/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 7,
    title: "Kitchenettes",
    image:
      "https://www.ikea.com/ext/ingkadam/m/6458a8d8bbbd7378/original/PH186636.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/unit-kitchens-22957/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 8,
    title: "Kitchen taps & sinks",
    image:
      "https://www.ikea.com/ext/ingkadam/m/25ea1682e4117f0e/original/PH154107.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/kitchen-taps-sinks-24261/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 9,
    title: "Integrated lighting ",
    image:
      "https://www.ikea.com/ext/ingkadam/m/44566d5ee01963af/original/PH191542.jpg?f=xxs",
    link: "https://www.ikea.com/eg/en/cat/integrated-lighting-16280/?filters=f-online-sellable%3Atrue",
  },
  {
    id: 10,
    title: "Kitchen planner",
    image:
      "https://www.ikea.com/images/85/58/8558c62ca6a6ac64fdcf49960d72e658.jpg?f=xxs",
    link: "https://kitchen.planner.ikea.com/eg/en/",
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

export const CategoriesKitchen = () => {
  return (
    <Box
      sx={{ px: 3, py: 3, position: "relative" }}
      className="slider-container" // Add a class for hover effect
    >
        <Typography fontSize={24} fontWeight={700} m={2}>
        Categories your kitchen will love
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
 
export default CategoriesKitchen;