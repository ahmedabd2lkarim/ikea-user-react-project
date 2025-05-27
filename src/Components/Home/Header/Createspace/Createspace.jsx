import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Createspace = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Stack
        width={"95%"}
        height={"550px"}
        margin={"auto"}
        bgcolor={"#F5F5F5"}
        display={"flex"}
        flexDirection={{ xs: "column", lg: "row" }}
      >
        <Box
          component={"img"}
          src="https://www.ikea.com/ext/ingkadam/m/4a76105256266332/original/PH201255.jpg?f=xl"
          sx={{
            width: { xs: "100%", lg: "65%" },
            //   height: "600px",
            //   objectFit: "cover",
          }}
        ></Box>
        <Box
          sx={{
            // width: "100%",
            // height: "100%",
            backgroundColor: "#F5F5F5",
            padding: "50px 0px 60px 50px",
          }}
        >
          <Box width={"80%"} gap={2} display={"flex"} flexDirection={"column"}>
            <Typography fontSize={24} fontWeight={700}>
              {t("Createspace")}
            </Typography>
            <Typography
              fontSize={14}
              fontWeight={400}
              color="rgb(72, 72, 72)
"
            >
              {t("Thankstoour")}
            </Typography>
            <Button
              variant="contained"
              href="https://www.ikea.com/eg/en/new/looking-for-scandi-cool-slip-into-scandi-warm-and-cosy-pubff4762d0/"
              sx={{
                bgcolor: "black",
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                borderRadius: 5,
                // padding: "8px 24px",
                alignSelf: "flex-start",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              {t("Exploremore")}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Createspace;
