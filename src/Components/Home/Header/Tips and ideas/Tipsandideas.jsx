import React from "react";
import {
  Box,
  Typography,
  IconButton,
  ButtonBase,
  Stack,
  Link,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./Tipsandideas.css"; // Include scrollbar styles
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation, Trans } from "react-i18next";

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

export const Tipsandideas = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 1,
      title: t("sustainability.energy"),
      image:
        "https://www.ikea.com/images/a-persons-finger-presses-the-on-off-switch-on-the-cord-of-a--e383e0cd035aa339ba18f74cd44e27eb.jpg?f=xxs",
      link: "https://www.ikea.com/eg/en/product-guides/sustainable-products/saving-energy/",
    },
    {
      id: 2,
      title: t("sustainability.waste"),
      image:
        "https://www.ikea.com/images/a-person-adds-a-vegetable-peel-to-a-brown-paper-food-waste-b-06ca675190da892b8dd449647de6cf37.jpg?f=xxs",
      link: "https://www.ikea.com/eg/en/product-guides/sustainable-products/reducing-waste/",
    },
    {
      id: 3,
      title: t("sustainability.water"),
      image:
        "https://www.ikea.com/images/stainless-steel-vimmern-kitchen-mixer-tap-with-handspray-at--ece75b7b932d57f2e1c74bf7342f6157.jpg?f=xxs",
      link: "https://www.ikea.com/eg/en/product-guides/sustainable-products/saving-water/",
    },
    {
      id: 4,
      title: t("sustainability.furniture"),
      image:
        "https://www.ikea.com/images/a-persons-hand-holds-a-paintbrush-and-applies-grey-paint-to--d4eb8a5dd1724409205b29c06fb08bed.jpg?f=xxs",
      link: "https://www.ikea.com/eg/en/product-guides/sustainable-products/make-furniture-live-longer/",
    },
    {
      id: 5,
      title: t("sustainability.reusables"),
      image:
        "https://www.ikea.com/images/a-person-places-a-turquoise-silicone-oevermaett-food-cover-o-cf2a27520c2f51db0bf91f51ece6afbb.jpg?f=xxs",
      link: "https://www.ikea.com/eg/en/product-guides/sustainable-products/reusable-products/",
    },
    {
      id: 6,
      title: t("sustainability.food"),
      image:
        "https://www.ikea.com/images/a-person-sprinkles-chopped-green-herbs-on-to-huvudroll-plant-f271022b09912fe124fa775f2ed29b70.jpg?f=xxs",
      link: "https://www.ikea.com/eg/en/product-guides/sustainable-products/sustainable-food/",
    },
    {
      id: 7,
      title: t("sustainability.everydayActions"),
      link: "https://www.ikea.com/eg/en/rooms/",
    },
  ];

  return (
    <Box>
      <Typography fontSize={{ xs: 18, sm: 24 }} fontWeight={700} m={2}>
        {t("Tipsandideas")}
      </Typography>
      <Box
        sx={{ px: 3, py: 3, position: "relative" }}
        className="slider-container" // Add a class for hover effect
      >
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
                  // bgcolor: isSpecial ? "#00853E" : "transparent", // Custom background for special card
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
                      left: "10%", // Start the text from the left with some padding
                      zIndex: 2,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "white",
                      textAlign: "left", // Align the text to the left
                      maxWidth: "70%", // Ensure the text stays within 80% of the card's width
                      whiteSpace: "normal", // Allow text to wrap to the next line
                      overflow: "hidden", // Prevent text from overflowing
                      wordWrap: "break-word", // Break long words if necessary
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
                      bgcolor: "#00853E", // Full background color for special card
                      // borderRadius: "12px",
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
                    bgcolor: isSpecial ? "white" : "#fff",
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
                      backgroundColor: isSpecial ? "#f5f5f5" : "#f5f5f5",
                    },
                  }}
                >
                  {isSpecial ? (
                    <ArrowForwardIcon sx={{ fontSize: 24, color: "black" }} /> // Icon inside the circle button
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
      <Stack width={{ xs: "90%", sm: "53%" }} mt={10} mb={8} marginLeft={4}>
        <Typography
          fontSize={14}
          color="rgb(72, 72, 72)"
          sx={{
            "& a": {
              color: "rgb(72, 72, 72)",
              transition: "color 0.3s",
              "&:hover": {
                color: "black",
              },
            },
          }}
        >
          <Trans
            i18nKey="ikeaWelcomeText"
            components={{
              deals: <Link href="https://www.ikea.com/eg/en/offers/#" />,
              furniture: (
                <Link href="https://www.ikea.com/eg/en/cat/furniture-fu001/" />
              ),
              lighting: (
                <Link href="https://www.ikea.com/eg/en/cat/lighting-li001/" />
              ),
              decoration: (
                <Link href="https://www.ikea.com/eg/en/cat/decoration-de001/" />
              ),
              living: (
                <Link href="https://www.ikea.com/eg/en/rooms/living-room/" />
              ),
              dining: <Link href="https://www.ikea.com/eg/en/rooms/dining/" />,
            }}
          />
        </Typography>
      </Stack>
    </Box>
  );
};
export default Tipsandideas;
