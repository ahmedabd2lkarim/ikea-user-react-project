import { useState, useEffect } from "react";
import { Box, Grid, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MAX_RECENT_PRODUCTS = 4;
const STORAGE_KEY = "recently_viewed_products";

const RecentlyViewedProducts = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setRecentProducts(stored);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  if (recentProducts.length === 0) return null;

  return (
    <Box sx={{ p: 4 }}>
      <p style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "18px" }}>
        {t("product.recentlyViewedProducts")}
      </p>
      <Grid container spacing={2}>
        {recentProducts.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product._id}>
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleProductClick(product._id)}
            >
              <CardMedia
                component="img"
                image={product.images[0]}
                alt={product.name}
                sx={{
                  height: 120,
                  objectFit: "cover",
                }}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentlyViewedProducts;
