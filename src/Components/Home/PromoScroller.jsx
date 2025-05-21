import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

const PromoScroller = ({ title, categoryId = "home" }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const finalTitle = title || t("moreTips");

  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await axios.get(`${VITE_API_URL}/api/promos/${categoryId}`);
        setPromos(res.data);
      } catch (err) {
        console.error("Error fetching promos:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPromos();
  }, [categoryId]);

  if (loading) return <div></div>;
  if (!promos.length) return <></>;

  return (
    <>
      <Typography variant="h5" fontSize={30} fontWeight="bold" py={3}>
        {finalTitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          p: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": {
            height: 4,
            width: 10,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "black",
          },
          "&:hover::-webkit-scrollbar": {
            height: 5,
            width: 10,
          },
        }}
      >
        {promos.map((promo, index) => (
          <Card
            elevation={0}
            key={index}
            sx={{
              width: { xs: 260, sm: 400, md: 460 },
              height: { xs: 604, sm: 604, md: 700 },
              flex: "0 0 auto",
              scrollSnapAlign: "start",
              display: "flex",
              flexDirection: "column",
              border: "none",
              borderRadius: 0,
            }}
          >
            <Box
              component="img"
              src={promo.images?.[currentLang] || promo.images?.en || ""}
              alt={promo.title?.[currentLang] || promo.title?.en || ""}
              sx={{
                height: { md: "62%", sm: "60%", xs: "42%" },
                width: "100%",
                objectFit: "cover",
                borderRadius: 0,
              }}
            />
            <CardContent
              sx={{
                bgcolor: "#F5F5F5",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h5" fontSize={26} fontWeight="bold">
                  {promo.title?.[currentLang] || promo.title?.en || ""}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={16}
                  color="#484848"
                  mt={1}
                >
                  {promo.description?.[currentLang] ||
                    promo.description?.en ||
                    ""}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: "black",
                  py: 2.5,
                  m: 0,
                  borderRadius: "50%",
                  alignSelf: "flex-start",
                }}
              >
                <ArrowForwardIcon fontSize="medium" sx={{ m: 0, p: 0 }} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default PromoScroller;
