import React from "react";
import Teaser from "../../Components/Home/Teaser";
import ProductScroller from "../../Components/Home/ProductScroller";
import PromoScroller from "../../Components/Home/PromoScroller";
import { useTranslation } from "react-i18next";

import { CircularProgress, Box, Button, Typography, Grid } from "@mui/material";
import useFetchProducts from "../../hooks/useFetchProducts";
import useFetchTeaser from "../../hooks/useFetchTeaser";

function Home() {

  const IkeaDeals = {
    en: 'https://www.ikea.com/images/27/f1/27f1bb0a89ed151d1c177d9750a037c3.png?f=sg',
    ar: 'https://www.ikea.com/images/3d/f0/3df0ecc1b136cb2385a6652af84a5a9d.png?f=sg', 
  };
  const { products, loading } = useFetchProducts();
  const { teaserData: homeCategory, loading: loadingHomeTeaser } = useFetchTeaser("home");

  const firstTeaser = homeCategory?.teasers?.[0];
  const secondTeaser = homeCategory?.teasers?.[1];
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const categorizedProducts = {
    [t("categories.kitchen")]: {
      deal: t("categories.kitchen"),
      products: products.slice(8, 20),
    },
    [t("categories.lowerPrices")]: {
      deal: t("categories.lowerPrices"),
      products: products.slice(8, 13),
    },
    [t("categories.bestSellers")]: {
      deal: t("categories.bestSellers"),
      products: products.slice(13, 20),
    },
  };
  const cp = {
    "": {
      deal: t("categories.familyOffer"),
      products: products.slice(8, 20),
    },
  };


  return (
    <Grid px={{ xs: 1, sm: 2, md: 5 }}>

      <Typography variant="h4" fontWeight="bold" py={5}>
        {t("welcome")}
      </Typography>



      {loadingHomeTeaser ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : firstTeaser ? (
        <Teaser
          title={firstTeaser?.title?.[language]}
          content={firstTeaser?.content?.[language]}
          promoImage={firstTeaser.promoImage}
          promoHotspots={firstTeaser.promoHotspots}
          rightImages={firstTeaser.rightImages}
          height={firstTeaser.height}
          language={language}
        />



      ) : null}
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
            src={IkeaDeals[language]}
            alt="Promo"
            sx={{
              width: '100%',
              objectFit: 'cover',
            }}
          />
          <ProductScroller categories={cp} />
        </>
      )}


      
      {loadingHomeTeaser ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : secondTeaser ? (
        <Teaser
          title={secondTeaser?.title?.[language]}
          content={secondTeaser?.content?.[language]}
          promoImage={secondTeaser.promoImage}
          promoHotspots={secondTeaser.promoHotspots}
          rightImages={secondTeaser.rightImages}
          height={secondTeaser.height}
          language={language}

        />



      ) : null}
      <Typography variant="h5" fontSize={27} fontWeight="bold" pt={10} pb={4}>
        {t("nowInIKEA")}
      </Typography>


      <PromoScroller />

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <> <ProductScroller title={t("recommended")} products={products.slice(0, 10)} cardWidth={250} />
        </>)}


      <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
      <Button onClick={() => i18n.changeLanguage('ar')}>العربية</Button>





    </Grid>
  );
}


export default Home;
