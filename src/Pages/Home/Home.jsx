import React from "react";
import Teaser from "../../components/layout/Home/Teaser";
import Teaser2 from "../../components/layout/Home/Teaser2";
import ProductScroller from "../../components/layout/Home/ProductScroller";
import PromoScroller from "../../components/layout/Home/PromoScroller";

import { CircularProgress, Box, Button, Typography } from "@mui/material";
import useFetchProducts from "../../hooks/useFetchProducts";

function Home() {
  const { products, loading } = useFetchProducts();

  const categorizedProducts = {
    "Kitchen offer": {
      deal: "Kitchens Offer",
      products: products.slice(8, 20),
    },
    "New lower prices": {
      deal: "New Lower Prices",
      products: products.slice(8, 13),
    },
    "Top seller": {
      deal: "Best Sellers",
      products: products.slice(13, 20),
    },
  };
  const cp = {
    "": {
      deal: "IKEA FAMILY OFFER",
      products: products.slice(8, 20),
    },
  };

  return (
    <Box sx={{ px: 5 }}>
      <Typography variant="h4" fontWeight={'bold'} py={5}>
        Welcome to IKEA Egypt
      </Typography>
      <Typography variant="h5" fontWeight={'bold'} >
        Enjoy 15% Off On All Kitchens
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>
          Shop & Enjoy Savings 15% Off On All Kitchens, Limited Offer For
          Kitchens Only
        </p>
        <Button variant="outlined" color="black" sx={{ borderRadius: 5, fontSize: 10, fontWeight: "bold", p: 1.2, px: 2, }}>
          see more
        </Button>
      </Box>
      <Teaser />
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductScroller categories={categorizedProducts} />
      )}
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            component="img"
            src={"/images/Home/27f1bb0a89ed151d1c177d9750a037c3.avif"}
            alt="Promo"
            sx={{
              width: '100%',
              objectFit: 'cover',
            }}
          />
          <ProductScroller categories={cp} />
        </>
      )}
      <h1>Discover our new products</h1>
      <Teaser2 />
      <Typography variant="h5" fontSize={27} fontWeight={'bold'} pt={10} pb={4}> Now in IKEA Egypt</Typography>
      <PromoScroller />
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <> <ProductScroller title={"Recommended for you"} products={products.slice(0, 10)} cardWidth={250} /></>)}
    </Box>
  );
}

export default Home;
