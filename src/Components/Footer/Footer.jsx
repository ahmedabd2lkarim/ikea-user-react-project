import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  List,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Footer = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <Box
        bgcolor={"#F5F5F5"}
      >
        <Stack
          display={"flex"}
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          // bgcolor={"#F5F5F5"}
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },

            "& a": {
              fontSize: 14,
              fontWeight: 400,
              color: "rgb(72, 72, 72)",
              transition: "color 0.3s",
              textDecoration: "none",
              // display: "inline-block",
              paddingY: 0.5,
              // paddingX: 15,
              paddingRight: { xs: 10, sm: 10, md: 15, lg: 25, xl: 30 },
              paddingBottom: 2,
              "&:hover": {
                color: "black",
                textDecoration: "underline",
                cursor: "pointer",
              },
            },
            "& p": {
              fontSize: 16,
              fontWeight: 700,
              color: "rgb(17, 17, 17)",
              paddingTop: 10,
              paddingBottom: 2,
              // paddingX: 10.5,
            },
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Typography>Useful links</Typography>
            <Link>Brochures</Link>
            <Link>IKEA shopping app</Link>
            <Link>Planning tools</Link>
            <Link>Stores</Link>
            <Link>IKEA restaurant</Link>
            <Link>IKEA Family</Link>
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Typography>Customer service</Typography>
            <Link>Terms and conditions</Link>
            <Link>Guarantees & warranties</Link>
            <Link>Spare parts</Link>
            <Link>About services</Link>
            <Link>About shopping</Link>
            <Link>Return policy</Link>
            <Link>Contact us</Link>
            <Link>FAQ</Link>
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Typography>This is IKEA</Typography>
            <Link>About IKEA</Link>
            <Link>Democratic design</Link>
            <Link>Sustainable everyday</Link>
            <Link>Community engagement</Link>
            <Link>Working at IKEA</Link>
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Typography>General information</Typography>
            <Link>Newsroom</Link>
            <Link>Product recalls</Link>
          </Box>
        </Stack>

        <Box
          display={{ xs: "block", sm: "block", md: "none" }}
          bgcolor={"#F5F5F5"}
          sx={{
            paddingTop:{xs:"60px"},
            "& a": {
              fontSize: 14,
              fontWeight: 400,
              color: "rgb(72, 72, 72)",
              transition: "color 0.3s",
              textDecoration: "none",
              // display: "inline-block",
              paddingY: 0.5,
              // paddingX: 15,
              paddingRight: { xs: 10, sm: 10, md: 15, lg: 25, xl: 30 },
              paddingBottom: 2,
              "&:hover": {
                color: "black",
                textDecoration: "underline",
                cursor: "pointer",
              },
            },
          }}
        >
          <Accordion sx={{ backgroundColor: "#F5F5F5", paddingY: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography
                component="span"
                sx={{ fontSize: 14, fontWeight: 700, color: "rgb(17, 17, 17)" }}
              >
                Useful links
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display={"flex"} flexDirection={"column"}>
                <Link>Brochures</Link>
                <Link>IKEA shopping app</Link>
                <Link>Planning tools</Link>
                <Link>Stores</Link>
                <Link>IKEA restaurant</Link>
                <Link>IKEA Family</Link>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: "#F5F5F5", paddingY: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography
                component="span"
                sx={{ fontSize: 14, fontWeight: 700, color: "rgb(17, 17, 17)" }}
              >
                Customer service
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display={"flex"} flexDirection={"column"}>
                <Link>Terms and conditions</Link>
                <Link>Guarantees & warranties</Link>
                <Link>Spare parts</Link>
                <Link>About services</Link>
                <Link>About shopping</Link>
                <Link>Return policy</Link>
                <Link>Contact us</Link>
                <Link>FAQ</Link>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: "#F5F5F5", paddingY: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography
                component="span"
                sx={{ fontSize: 14, fontWeight: 700, color: "rgb(17, 17, 17)" }}
              >
                This is IKEA
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display={"flex"} flexDirection={"column"}>
                <Link>About IKEA</Link>
                <Link>Democratic design</Link>
                <Link>Sustainable everyday</Link>
                <Link>Community engagement</Link>
                <Link>Working at IKEA</Link>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: "#F5F5F5", paddingY: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography
                component="span"
                sx={{ fontSize: 14, fontWeight: 700, color: "rgb(17, 17, 17)" }}
              >
                General information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display={"flex"} flexDirection={"column"}>
                <Link>Newsroom</Link>
                <Link>Product recalls</Link>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Stack
          paddingX={{ xs: 2, sm: 2, md: 6 }}
          paddingY={4}
          display={"flex"}
          justifyContent={"space-between"}
          direction={{ xs: "column", sm: "column", md: "row" }}
          // bgcolor="#F5F5F5"
        >
          <Box display={"flex"} flexDirection={{ xs: "column", sm: "row", md: "row" }} alignItems={{ xs: "flex-start", sm: "center", md: "center" }} >
            <Box
              sx={{
                "& svg": {
                  marginRight: 3,
                  color: "rgb(72, 72, 72)",
                  border: "1px solid rgb(213, 213, 213)",
                  borderRadius: "50%",
                  padding: "4px",
                  // transition: "all 0.3s ease",
                  cursor: "pointer",
                },
                "& svg:hover": {
                  border: "1px solid rgb(72, 72, 72)",
                },
              }}
            >
              <FacebookOutlinedIcon />
              <InstagramIcon />
              <YouTubeIcon />
              <XIcon />
            </Box>

            <Box 
            marginTop={{ xs: 3, sm: 0}}
            sx={{ "& img": { marginRight: 3, width: 45 } }}>
              <Box
                component={"img"}
                src="https://www.ikea.com/global/assets/logos/external-payment-providers/american-express.svg"
              ></Box>
              <Box
                component={"img"}
                src="https://www.ikea.com/global/assets/logos/external-payment-providers/visa.svg"
              ></Box>
              <Box
                component={"img"}
                src="https://www.ikea.com/global/assets/logos/external-payment-providers/master-card.svg"
              ></Box>
            </Box>
          </Box>

          <Box>
            <Box
            marginTop={{ xs: 3, sm: 3, md: 0 }}
              sx={{
                border: "1px solid black",
                borderRadius: "25px",
                color: "black",
                // backgroundColor: "transparent",
                padding: "7px 10px",
                "&:hover": {
                  // backgroundColor: "transparent",
                  border: "2px solid black",
                  cursor: "pointer",
                },
              }}
              component={"button"}
              onClick={toggleDrawer(true)}
            >
              <Box
                sx={{
                  "& p": { fontSize: 12, fontWeight: 700, padding: "0px 5px" },
                }}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"row"}
              >
                <LanguageIcon sx={{ marginRight: "8px", color: "black" }} />
                <Typography>EN</Typography>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{
                    borderColor: "#CCCCCC",
                    margin: "0px 8px",
                    display: {
                      xs: "none", // Hidden on extra-small
                      sm: "none", // Hidden on small (phones)
                      md: "inline-block", // Hidden on medium (tablets)
                      lg: "inline-block", // Shown on large (desktops and up)
                    },
                  }}
                />{" "}
                <Typography
                  sx={{
                    display: {
                      xs: "none", // Hidden on extra-small
                      sm: "none", // Hidden on small (phones)
                      md: "inline-block", // Hidden on medium (tablets)
                      lg: "inline-block", // Shown on large (desktops and up)
                    },
                  }}
                >
                  English
                </Typography>
              </Box>
            </Box>

            <Drawer open={open} onClose={toggleDrawer(false)}>
              <Box
                margin="10px 0px 0px 20px"
                borderRadius={10}
                sx={{
                  width: 450,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
              >
                <List>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    paddingRight={3}
                  >
                    <IconButton>
                      <CloseIcon
                        onClick={toggleDrawer(false)}
                        sx={{ cursor: "pointer", color: "black" }}
                      />
                    </IconButton>
                  </Box>

                  <Typography marginTop={3} fontSize={24} fontWeight={700}>
                    Select your preferred language
                  </Typography>

                  <Box
                    marginTop={3}
                    sx={{
                      "& button": {
                        border: "1px solid black",
                        borderRadius: "25px",
                        color: "black",
                        backgroundColor: "transparent",
                        marginRight: "10px",
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "10px 20px",
                        "&:hover": {
                          backgroundColor: "transparent",
                          border: "2px solid black",
                        },
                      },
                    }}
                  >
                    <Button disabled>English</Button>
                    <Button>العربية</Button>
                  </Box>

                  <Typography marginTop={5} fontSize={16} fontWeight={700}>
                    You're in the Egypt online store
                  </Typography>

                  <Link
                    marginTop={2}
                    fontSize={14}
                    fontWeight={400}
                    color="rgb(118, 118, 118)"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": { color: "black", cursor: "pointer" },
                    }}
                  >
                    <LanguageIcon sx={{ marginRight: "8px", color: "black" }} />
                    Change country/region
                  </Link>

                  <Typography
                    marginTop={2}
                    fontSize={14}
                    fontWeight={400}
                    color="rgb(118, 118, 118)"
                  >
                    Be aware your shopping cart will be emptied when you change
                    your online store.
                  </Typography>
                </List>

                <Box>
                  <Divider variant="fullWidth" sx={{ marginLeft: "-20px" }} />
                  <Button
                    onClick={toggleDrawer(false)}
                    variant="contained"
                    sx={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "white",
                      bgcolor: "black",
                      borderRadius: "30px",
                      padding: "18px 190px",
                      marginY: "25px",
                      "&:hover": {
                        backgroundColor: "rgb(118, 118, 118)",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Stack>

        <Divider sx={{display: { xs: "none", sm: "none", md: "block" }}}/>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          justifyContent="space-between"
          paddingX={{xs:3, md:6}}
          paddingTop={{xs:1, md:5}}
          paddingBottom={4}
        >
          <Typography color="rgb(72, 72, 72)" fontSize={12} fontWeight={400}>
            © Inter IKEA Systems B.V. 1999-2025
          </Typography>

          <Box
            sx={{
              "& a": {
                fontSize: 12,
                fontWeight: 400,
                color: "black",
                // transition: "color 0.3s",
                textDecoration: "none",
                // display: "inline-block",
                // paddingY: 0.5,
                // paddingX: 15,
                // paddingRight: 30,
                "&:hover": {
                  color: "rgb(72, 72, 72)",
                  textDecoration: "underline",
                },
              },
            }}
            display="flex"
            flexDirection="row"
          >
            {[
              {
                text: "Privacy policy",
                link: "https://www.ikea.com/eg/en/customer-service/privacy-policy/",
              },
              {
                text: "Cookie policy",
                link: "https://www.ikea.com/eg/en/customer-service/cookie-policy/",
              },
              { text: "Cookie settings", link: "#" },
              {
                text: "Terms and conditions",
                link: "https://www.ikea.com/eg/en/customer-service/terms-conditions/",
              },
            ].map((item, index) => (
              <Link href={item.link} key={index} marginLeft={{ xs: 0, sm: 0, md: 2 }} marginRight={1} marginTop={{ xs: 2, sm: 2, md: 0 }}>
                {item.text}
              </Link>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
