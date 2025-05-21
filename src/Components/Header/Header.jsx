import { useContext, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Typography,
  Link,
  Stack,
  Divider,
  Drawer,
  List,
  Button,
  TextField,
  ButtonBase,
  InputAdornment,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Flag } from "@mui/icons-material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./Header.css";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import RoomIcon from "@mui/icons-material/Room";
import { useNavigate ,useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const { VITE_API_URL } = import.meta.env;

// Tabs list

// Main Header component
export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue(''); // Clear the search input after navigation
    }

    if (!searchValue.length) {
      navigate(`/search`);
    }

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleClick = () => {
    navigate('/favourite-lists');
  };

  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false); // Move this inside the component
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [open2, setOpen2] = useState(false); // State for the first drawer
  const [openStoreDrawer, setOpenStoreDrawer] = useState(false); // State for the second drawer
  const [selectedStore, setSelectedStore] = useState(t("selectedStore")); // State for the selected store

  const toggleDrawer2 = (newOpen2) => () => {
    setOpen2(newOpen2);
    if (
      selectedStore === "Cairo Festival City" ||
      selectedStore === "Mall of Arabia"
    ) {
      setOpenStoreDrawer(true); // Open the second drawer
      setOpen2(false); // Close the first drawer
    }
  };

  const handleStoreSelection = (storeName) => {
    setSelectedStore(storeName); // Update the selected store name
    setOpen2(false); // Close the first drawer
    // setOpenStoreDrawer(true); // Open the second drawer
  };

  const toggleStoreDrawer = (newOpen) => () => {
    setOpenStoreDrawer(newOpen);
  };

  const tabs = [
    t("Products"),
    // t("Rooms"),
    // t("Tips&Ideas"),
    t("Offers&Campaigns"),
    t("More"),
  ];

  // Utility: Split array into chunks
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Custom Scroll Arrows
  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    return (
      <IconButton
        onClick={() => {
          console.log("Left button clicked");
          scrollPrev();
        }}
        className="slider-button"
        sx={{
          bgcolor: "#fff",
          border: "1px solid #ccc",
          boxShadow: 1,
          width: 36,
          height: 36,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 2,
          "&:hover": {
            bgcolor: "#f5f5f5",
          },
        }}
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
      <IconButton
        onClick={() => {
          console.log("Right button clicked");
          scrollNext();
        }}
        className="slider-button"
        sx={{
          bgcolor: "#fff",
          border: "1px solid #ccc",
          boxShadow: 1,
          width: 36,
          height: 36,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 2,
          "&:hover": {
            bgcolor: "#f5f5f5",
          },
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    );
  };

  const [products, setProducts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const userProfile = useSelector((state) => state.user.items).user;
  // console.log(userProfile);
  const userName = userProfile?.name.split(" ")[0] || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${VITE_API_URL}/api/categories`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [userProfile]);

  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     const res = await fetch("http://localhost:5000/api/categories");
  //     const data = await res.json();
  //     setRooms(data);
  //   };
  //   fetchRooms();
  // }, []);

  const isCarouselTab =
    tabs[activeTab] === "Products" ||
    tabs[activeTab] === "المنتجات" ||
    tabs[activeTab] === "Rooms" ||
    tabs[activeTab] === "الغرف";

  const getTabData = () => {
    switch (tabs[activeTab]) {
      case "Products":
      case "المنتجات":
        return products;
      case "Rooms":
      case "الغرف":
        return rooms;
      // case "Tips & Ideas":
      // case "الافكار والالهام":
      //   return [
      //     { _id: 1, name: t("tipsIdeas.seeAll"), image: "/tip1.png" },
      //     { _id: 2, name: t("tipsIdeas.essentials"), image: "/tip2.png" },
      //     { _id: 3, name: t("tipsIdeas.lowestPrice"), image: "/tip2.png" },
      //     { _id: 4, name: t("tipsIdeas.limitedEditions"), image: "/tip2.png" },
      //     { _id: 5, name: t("tipsIdeas.valueFurniture"), image: "/tip2.png" },
      //     { _id: 6, name: t("tipsIdeas.ideas"), image: "/tip2.png" },
      //     { _id: 7, name: t("tipsIdeas.inspiration"), image: "/tip2.png" },
      //     { _id: 8, name: t("tipsIdeas.brochures"), image: "/tip2.png" },
      //   ];

      case "Offers & Campaigns":
      case "العروض والفعاليات":
        return [
          { _id: 9, name: t("offersCampaigns.seeAll"), image: "/offer-a.png" },
          {
            _id: 10,
            name: t("offersCampaigns.familyOffers"),
            image: "/campaign-b.png",
          },
          {
            _id: 11,
            name: t("offersCampaigns.trending"),
            image: "/campaign-b.png",
          },
          {
            _id: 12,
            name: t("offersCampaigns.topSellers"),
            image: "/campaign-b.png",
          },
        ];

      case "More":
      case "المزيد":
        return [
          { _id: 13, name: t("more.newProducts"), image: "/more1.png" },
          { _id: 14, name: t("more.lastChance"), image: "/more1.png" },
          { _id: 15, name: t("more.food"), image: "/more1.png" },
          { _id: 16, name: t("more.business"), image: "/more1.png" },
          { _id: 17, name: t("more.joinFamily"), image: "/more1.png" },
          { _id: 18, name: t("more.customerService"), image: "/more1.png" },
          { _id: 19, name: t("more.giftCardBalance"), image: "/more1.png" },
          { _id: 20, name: t("more.contactUs"), image: "/more1.png" },
          { _id: 21, name: t("more.stores"), image: "/more1.png" },
          { _id: 22, name: t("more.about"), image: "/more1.png" },
          { _id: 23, name: t("more.designServices"), image: "/more1.png" },
        ];

      default:
        return [];
    }
  };

  const customOrder = [
    "Storage & organisation",
    "Textiles",
    "Decoration",
    "Kitchenware & tableware",
    "Rugs, mats & flooring",
    "Pet products",
    "Winter Collections",
    "Tables & chairs",
    "Laundry & cleaning",
    "Kitchen & appliances",
    "Beds & mattresses",
    "Desk & desk chairs",
    "Lighting",
    "Outdoor products",
    "Pots & plants",
    "Smart home",
    "Home electronics",
    "Bathroom products",
    "New",
  ];

  return (
    <Box>
      <Stack
        display={"flex"}
        direction={"row"}
        bgcolor={"#111111"}
        justifyContent={"space-between"}
        padding={"10px 40px 10px 40px"}
      >
        <Box>
          <Box
            sx={{
              color: "white",
              display: "inline-block",
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
            onClick={toggleDrawer(true)}
          >
            <Box
              sx={{
                "& p": { fontSize: 14, fontWeight: 400, padding: "0px 5px" },
              }}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"row"}
            >
              <LanguageIcon sx={{ color: "white" }} />
              <Typography>EG</Typography>
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
                {t("languageFull")}
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
                  {t("selectLanguage")}
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
                      // padding: "10px 20px",
                      "&:hover": {
                        backgroundColor: "transparent",
                        border: "2px solid black",
                      },
                    },
                  }}
                >
                  <Button
                    disabled={i18n.language === "en"}
                    onClick={() => i18n.changeLanguage("en")}
                  >
                    {t("english")}
                  </Button>
                  <Button
                    disabled={i18n.language === "ar"}
                    onClick={() => i18n.changeLanguage("ar")}
                  >
                    {t("arabic")}
                  </Button>
                </Box>

                <Typography marginTop={5} fontSize={16} fontWeight={700}>
                  {t("youAreInEgypt")}
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
                  {t("changeCountry")}
                </Link>

                <Typography
                  marginTop={2}
                  fontSize={14}
                  fontWeight={400}
                  color="rgb(118, 118, 118)"
                >
                  {t("cartEmptiedWarning")}
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
                      backgroundColor: "#333333",
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

        <Box
          sx={{
            color: "white",
            display: {
              xs: "none", // Hidden on extra-small
              sm: "none", // Hidden on small (phones)
              md: "none", // Hidden on medium (tablets)
              lg: "inline-block", // Shown on large (desktops and up)
            },
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          <Box
            sx={{
              "& p": { fontSize: 14, fontWeight: 400, padding: "0px 5px" },
            }}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"row"}
          >
            <PhoneIphoneIcon sx={{ marginRight: "8px", color: "white" }} />
            <Typography>{t("shoppingApp")}</Typography>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              color: "white",
              display: "inline-block",
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
            onClick={toggleDrawer2(true)}
          >
            <Box
              sx={{
                "& p": { fontSize: 14, fontWeight: 400, padding: "0px 5px" },
              }}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"row"}
            >
              <StoreMallDirectoryIcon
                sx={{ marginRight: "8px", color: "white" }}
              />
              <Typography>{selectedStore}</Typography> {/* Dynamic text */}
            </Box>
          </Box>

          {/* First Drawer */}
          <Drawer anchor="right" open={open2} onClose={toggleDrawer2(false)}>
            <Box
              sx={{
                width: 450,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              role="presentation"
              onClick={() => {
                setOpen2(false);
              }}
            >
              <Box
                sx={{
                  padding: "10px 20px 0px 20px",
                  backgroundColor: "white",
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  paddingRight={3}
                >
                  <IconButton
                    onClick={() => {
                      setOpen2(false);
                    }}
                    sx={{ cursor: "pointer", color: "black" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Typography marginTop={3} fontSize={24} fontWeight={700}>
                  {t("selectStore")}
                </Typography>

                <TextField
                  variant="outlined"
                  placeholder={t("searchByLocation")}
                  fullWidth
                  sx={{
                    marginTop: "15px",
                    marginBottom: "20px",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f5f5f5",
                      borderRadius: "30px",
                      height: "50px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <GpsFixedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                sx={{
                  backgroundColor: "#F5F5F5",
                  flexGrow: 1,
                  overflowY: "auto",
                  padding: "5px 0",
                }}
              >
                <ButtonBase
                  onClick={() => handleStoreSelection("Cairo Festival City")}
                  sx={{
                    display: "block",
                    textAlign: "left",
                    border: "1px solid #ddd",
                    borderRadius: "3px",
                    padding: "25px",
                    margin: "auto",
                    marginTop: "20px",
                    width: "90%",
                    "&:hover": {
                      border: "2px solid rgb(0, 88, 163)",
                    },
                  }}
                >
                  <Typography fontSize={14} fontWeight={700}>
                    {t("CairoFestivalCity")}
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    color="rgb(72, 72, 72)"
                  >
                    {t("RingRoad")}
                  </Typography>
                </ButtonBase>

                <ButtonBase
                  onClick={() => handleStoreSelection("Mall of Arabia")}
                  sx={{
                    display: "block",
                    textAlign: "left",
                    border: "1px solid #ddd",
                    borderRadius: "3px",
                    padding: "25px",
                    margin: "auto",
                    marginTop: "20px",
                    width: "90%",
                    "&:hover": {
                      border: "2px solid rgb(0, 88, 163)",
                    },
                  }}
                >
                  <Typography fontSize={14} fontWeight={700}>
                    {t("MallOfArabia")}
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    color="rgb(72, 72, 72)"
                  >
                    {t("mallOfArabiaAddress")}
                  </Typography>
                </ButtonBase>
              </Box>
            </Box>
          </Drawer>

          {/* Second Drawer */}
          <Drawer
            anchor="right"
            open={openStoreDrawer}
            onClose={toggleStoreDrawer(false)} // Close the second drawer
          >
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
            >
              <List>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  paddingRight={3}
                >
                  <IconButton
                    onClick={toggleStoreDrawer(false)} // Correct function to close the drawer
                    sx={{ cursor: "pointer", color: "black" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Typography marginTop={3} fontSize={24} fontWeight={700}>
                  {t(selectedStore)}
                </Typography>

                <Typography
                  marginTop={2}
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "rgb(72, 72, 72)",
                  }}
                >
                  {selectedStore === t("CairoFestivalCity")
                    ? "Open until 11:00 PM"
                    : "Open until 11:00 PM"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "rgb(72, 72, 72)",
                  }}
                >
                  {selectedStore === "Cairo Festival City"
                    ? "Ring Road, 5th settlement, P.O. Box 11835, Cairo"
                    : "Mall of Arabia, Expansion phase Gate 17 - 6th of October City, Giza"}
                </Typography>

                <Button
                  sx={{
                    marginTop: "15px",
                    border: "1px solid black",
                    borderRadius: "25px",
                    color: "black",
                    backgroundColor: "transparent",
                    marginRight: "10px",
                    fontSize: 11,
                    fontWeight: 700,
                    // padding: "10px 20px",
                    "&:hover": {
                      backgroundColor: "transparent",
                      border: "2px solid black",
                    },
                  }}
                >
                  <RoomIcon />
                  {t("getDirections")}
                </Button>

                <Typography marginTop={4} fontSize={14} fontWeight={700}>
                  {t("normalOpeningHours")}
                </Typography>

                <Stack
                  sx={{
                    "& p": {
                      fontSize: 14,
                      fontWeight: 400,
                      color: "rgb(72, 72, 72)",
                    },
                  }}
                  direction={"row"}
                  spacing={2}
                  marginTop={1}
                >
                  <Box>
                    <Typography>{t("satWed")}</Typography>
                    <Typography>{t("thuFri")}</Typography>
                  </Box>
                  <Box>
                    <Typography>{t("openingHours1")}</Typography>
                    <Typography>{t("openingHours2")}</Typography>
                  </Box>
                </Stack>
              </List>

              <Box>
                <Divider variant="fullWidth" sx={{ marginLeft: "-20px" }} />
                <Button
                  onClick={() => {
                    setOpen2(true);
                    setOpenStoreDrawer(false);
                  }}
                  variant="contained"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "black",
                    bgcolor: "white",
                    borderRadius: "30px",
                    // padding: "18px 100px",
                    height: "55px",
                    width: "95%",
                    marginTop: "20px",
                    border: "1px solid black",
                    "&:hover": {
                      cursor: "pointer",
                      border: "2px solid black",
                    },
                  }}
                >
                  {t("chooseDifferentStore")}
                </Button>

                <Button
                  onClick={() => {
                    setOpen2(true);
                    setOpenStoreDrawer(false);
                  }}
                  variant="contained"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "white",
                    bgcolor: "black",
                    borderRadius: "30px",
                    height: "55px",
                    width: "95%",
                    marginTop: "20px",
                    marginBottom: "20px",
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#333333",
                    },
                  }}
                >
                  {t("visitStorePage")}
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Box>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        padding="5px 40px"
      >
        {/* LEFT SIDE (xs: logo + button + icons in the same row, sm+: logo + search) */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          flexDirection={{ xs: "row", sm: "row" }} // Row for both xs and sm+
          justifyContent={{ xs: "space-between", sm: "flex-start" }}
          width="100%"
          mt={{ xs: "-20px", sm: "10px" }} // Adjust margin for xs
        >
          <Box
            onClick={() => navigate("/")}
            component="img"
            src="https://www.ikea.com/global/assets/logos/brand/ikea.svg"
            width="90px"
            sx={{
              // display: { xs: "block", sm: "block" }, // Visible on all breakpoints
              transform: { xs: "translateY(40px)", sm: "translateY(0)" },
              cursor: "pointer",
            }}
          />

          {/* DESKTOP/TABLET Search (next to logo) */}
          <Box
            sx={{
              display: { xs: "none", sm: "block" }, // Hidden on xs, visible on sm+
              width: "100%",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="What are you looking for"
              value={searchValue || search}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                width: { xs: "100%", sm: "90%", md: "90%", lg: "60%" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f5f5f5",
                  borderRadius: "30px",
                  height: "50px",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      onClick={handleSearch}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <CameraAltOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* RIGHT SIDE: Button + Icons */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          ml={{ xs: 35, sm: 0 }} // Remove margin for xs
        >
          <Button
            sx={{
              width: { xs: "0px", sm: "0", md: "0", lg: "230px" }, // Adjust width for xs and sm
              height: "40px",
              borderRadius: "30px",
              bgcolor: "white",
              color: "rgb(17, 17, 17)",
              fontSize: "12px",
              fontWeight: "700",
              "&:hover": {
                backgroundColor: "#DFDFDF",
                cursor: "pointer",
              },
            }}
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                navigate("/profile"); // Navigate to profile if token exists
              } else {
                navigate("/login"); // Navigate to login if no token
              }
            }}
          >
            <PermIdentityIcon />
            <Box
              ml={1}
              display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
            >
              {localStorage.getItem("token")
                ? `${t("hello")} ${userName}`
                : t("loginOrSignup")
              }
            </Box>
          </Button>


          <IconButton onClick={handleClick}>
            <FavoriteBorderIcon sx={{ color: "black", fontSize: 20 }} />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <ShoppingBasketOutlinedIcon sx={{ color: "black", fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* SEARCH UNDER on mobile only */}
        <Box
          width="100%"
          // maxWidth="100%"
          mt={2}
          display={{ xs: "block", sm: "none" }} // Visible only on xs
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="What are you looking for"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f5f5f5",
                borderRadius: "30px",
                height: "50px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    onClick={handleSearch}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CameraAltOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>

      <Box
        display={{ xs: "none", sm: "none", md: "none", lg: "block" }} // Hidden on xs
        sx={{ width: "100%", borderBottom: "1px solid #ddd", bgcolor: "#fff" }}
      >
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 3,
            borderBottom: "3px solid #eee",
            "& .MuiTabs-indicator": {
              backgroundColor: "#007cc2",
              height: "3px",
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                color: "#555",
                "&.Mui-selected": {
                  color: "#000",
                },
              }}
            />
          ))}
        </Tabs>

        {/* Carousel or Columns */}
        <Box sx={{ position: "relative", px: 3, py: 2 }}>
          {isCarouselTab ? (
            <Box className="slider-container" sx={{ position: "relative" }}>
              <ScrollMenu
                scrollContainerClassName="react-horizontal-scrolling-menu--scroll-container"
                transitionBehavior="smooth" // Pass a valid string value
                LeftArrow={() => (
                  <Box
                    className="slider-button"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      transform: "translateY(-50%)",
                      zIndex: 2,
                    }}
                  >
                    <LeftArrow />
                  </Box>
                )}
                RightArrow={() => (
                  <Box
                    className="slider-button"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 0,
                      transform: "translateY(-50%)",
                      zIndex: 2,
                    }}
                  >
                    <RightArrow />
                  </Box>
                )}
              >
                {getTabData()
                  .sort((a, b) => {
                    const indexA = customOrder.indexOf(a.name);
                    const indexB = customOrder.indexOf(b.name);
                    return (
                      (indexA === -1 ? Infinity : indexA) -
                      (indexB === -1 ? Infinity : indexB)
                    );
                  })
                  .map((cat) => (
                    <Box
                      key={cat._id}
                      itemID={cat._id}
                      onClick={() => navigate(`/category/${cat._id}`)}
                      sx={{
                        mx: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        minWidth: 80,
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        component="img"
                        src={cat.image}
                        alt={cat.name}
                        sx={{
                          width: 64,
                          height: 64,
                          objectFit: "contain",
                          mb: 1,
                        }}
                      />
                      <Typography variant="caption" sx={{ fontSize: "13px" }}>
                        {cat.name}
                      </Typography>
                    </Box>
                  ))}
              </ScrollMenu>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 3 }}>
              {chunkArray(getTabData(), 5).map((column, colIndex) => (
                <Box
                  key={colIndex}
                  sx={{
                    flex: "1 1 0",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {column.map((link) => (
                    <Link
                      key={link._id}
                      sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "rgb(72, 72, 72)",
                        textDecoration: "none",
                        paddingBottom: 1,
                        "&:hover": {
                          color: "black",
                          textDecoration: "underline",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
