<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======


import React, { useState, useEffect } from "react";
import Recommendedproducts from "../../Components/Product/ProductsCarousel/ProductsCarousel";
import Loading from "../../Components/Loading/Loading";
import "./Home.css";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/api/products`);
        const res = await response.json();
        console.log(response);

        setProducts(res.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <Recommendedproducts products={products} />
      </section>
    </div>
  );
};
import React from "react";
>>>>>>> origin/main
import Teaser from "../../Components/Home/Teaser";
import ProductScroller from "../../Components/Home/ProductScroller";
import PromoScroller from "../../Components/Home/PromoScroller";
import { useTranslation } from "react-i18next";

import { CircularProgress, Box, Button, Typography, Grid } from "@mui/material";
import useFetchTeaser from "../../hooks/useFetchTeaser";

import Createspace from "../../Components/Home/Header/Create space/Createspace";
import ShopbyRoom from "../../Components/Home/Header/Shop by Room/ShopbyRoom";
import ExperienceIKEA from "../../Components/Home/Header/Experience IKEA/ExperienceIKEA";
import IKEAFood from "../../Components/Home/Header/IKEA Food/IKEAFood";
import Tipsandideas from "../../Components/Home/Header/Tips and ideas/Tipsandideas";
import CategoriesKitchen from "../../Components/Home/Header/Categories Kitchen/CategoriesKitchen";

function Home() {
  const IkeaDeals = {
    en: 'https://www.ikea.com/images/27/f1/27f1bb0a89ed151d1c177d9750a037c3.png?f=sg',
    ar: 'https://www.ikea.com/images/3d/f0/3df0ecc1b136cb2385a6652af84a5a9d.png?f=sg',
  };

  const { teaserData: homeCategory, loading: loadingHomeTeaser } = useFetchTeaser("home");
  const firstTeaser = homeCategory?.teasers?.[0];
  const secondTeaser = homeCategory?.teasers?.[1];

  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const categoryIds = {
    kitchen: "67b724ef9379cb0ddd1b0972",
    lowerPrices: "67b724ef9379cb0ddd1b0972",
    bestSellers: "67b724ef9379cb0ddd1b0960",
  };

  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [cp, setCp] = useState(null);

  async function fetchProducts(categoryId) {
    try {
      const response = await fetch(`http://localhost:5000/api/promos/products/${categoryId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchAllCategories() {
      setLoading(true);
      const results = {};

      await Promise.all(
        Object.entries(categoryIds).map(async ([key, catId]) => {
          let products = await fetchProducts(catId);

          if (key === "lowerPrices") {
            products = products.filter(p => p.price?.discounted);
          } else {
            products = products.filter(p => !p.price?.discounted);
          }

          results[t(`categories.${key}`)] = {
            deal: t(`categories.${key}`),
            products,
          };
        })
      );

      setCategorizedProducts(results);

      const kitchenProducts = results[t("categories.kitchen")]?.products || [];
      const cpTemp = {
        "": {
          deal: t("categories.familyOffer"),
          products: kitchenProducts,
        },
      };
      setCp(cpTemp);

      setLoading(false);
    }

    fetchAllCategories();
  }, [t]);

  const recommendedProducts = categorizedProducts[t("categories.kitchen")]?.products || [];

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
          categoryId="67b724ef9379cb0ddd1b0972"
        />
      ) : null}

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ProductScroller categories={categorizedProducts} />
          <Box
            component="img"
            src={IkeaDeals[language]}
            alt="Promo"
            sx={{ width: "100%", objectFit: "cover" }}
          />
          <ProductScroller categories={cp} />
        </>
      )}

      <CategoriesKitchen />

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
          categoryId="67b724ef9379cb0ddd1b0972"
        />
      ) : null}

      <PromoScroller title={t("nowInIKEA")} />

      <Createspace />
      <ShopbyRoom />

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductScroller title={t("recommended")} products={recommendedProducts.slice(30, 40)} cardWidth={250} cardHight={250} />
      )}

      <ExperienceIKEA />
      <IKEAFood />
      <Tipsandideas />

      <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
      <Button onClick={() => i18n.changeLanguage('ar')}>العربية</Button>
    </Grid>
  );
}


export default Home;
