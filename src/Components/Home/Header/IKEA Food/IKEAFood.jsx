import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import React from "react";

const categories = [
  {
    id: 1,
    title: "IKEA Restaurant",
    image:
      "https://www.ikea.com/images/man-and-women-sat-in-an-ikea-restaurant-cb50c6f55d0aabb1c16facac3016c927.jpg?f=xs",
    link: "https://www.ikea.com/eg/en/stores/restaurant/",
  },
  {
    id: 2,
    title: "IKEA Swedish food market",
    image:
      "https://www.ikea.com/images/a-table-with-ikea-ost-herrgard-cheese-platter-ikea-knaeckebr-fbb2fbf475e937e55df2898294ded649.jpg?f=xs",
    link: "https://www.ikea.com/eg/en/stores/restaurant/ikea-swedish-food-market-pub16e62001/",
  },
  {
    id: 3,
    title: "IKEA Bistro",
    image:
      "https://www.ikea.com/images/three-children-getting-veggie-hot-dogs-at-ikea-bistro-counte-a394ede5dcf61fffc8ab48466c8a3bdc.jpg?f=xs",
    link: "https://www.ikea.com/eg/en/campaigns/ikea-bistro-pubd2049450/",
  },
];

export const IKEAFood = () => {
  return (
    <Box>
      <Typography fontSize={24} fontWeight={700} m="20px 0 40px 30px">
        IKEA Food
      </Typography>
      <Stack
        display={"flex"}
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        justifyContent="center"
        alignItems="center"
        marginX="20px"
        // height="100vh"
        // bgcolor={"red"}a
      >
        {categories.map((cat) => (
          <ButtonBase
            href={cat.link}
            key={cat.id}
            component="a"
            // target="_blank"
            // rel="noopener noreferrer"
            disableRipple // Disable the click motion effect
            sx={{
              width: "100%",
            //   textDecoration: "none",
              display: "block",
            //   position: "relative",
            //   overflow: "hidden",
            }}
          >
            <Box
              width="100%"
              sx={{ cursor: "pointer" }}
              component="img"
              src={cat.image}
              alt={cat.title}
            />
            <Button
              variant="contained"
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                color: "white",
                bgcolor: "black",
                borderRadius: "20px",
                marginTop: "40px",
                pointerEvents: "none", // Important: so clicking the button still triggers the parent link
              }}
            >
              {cat.title}
            </Button>
          </ButtonBase>
        ))}
      </Stack>
    </Box>
  );
};

export default IKEAFood;