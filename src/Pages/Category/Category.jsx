import React from "react";
import {
  Button,
  Box,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import Teaser from "../../Components/Home/Teaser";
import ProductScroller from "../../Components/Home/ProductScroller";
import useFetchTeaser from "../../hooks/useFetchTeaser";
import { useTranslation } from "react-i18next";
import axios from "axios";
import PromoScroller from "../../Components/Home/PromoScroller";
import { useParams } from "react-router-dom";

function Category() {
  const { id: categoryId } = useParams();
  const { i18n } = useTranslation();
  const language = i18n.language;

  const {
    teaserData: categoryTeasers,
    loading: loadingCategoryTeasers,
  } = useFetchTeaser(categoryId);

  const [categoryIntro, setCategoryIntro] = React.useState(null);
  const [loadingIntro, setLoadingIntro] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [loadingProducts, setLoadingProducts] = React.useState(true);

  const getLocalized = (obj) => obj?.[language] || obj?.["en"];

  React.useEffect(() => {
    const fetchCategoryIntro = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/intros/${categoryId}`
        );
        setCategoryIntro(response.data);
      } catch (error) {
        console.error("Error fetching category intro", error);
      } finally {
        setLoadingIntro(false);
      }
    };

    setLoadingIntro(true);
    setCategoryIntro(null);
    fetchCategoryIntro();
  }, [categoryId, language]);

  // Fetch products
  React.useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/promos/products/${categoryId}`
        );
        setProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching category products", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  if (loadingCategoryTeasers || loadingIntro || loadingProducts) {
    return (
      <Box display="flex" justifyContent="center" my={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container px={{ xs: 1, sm: 2, md: 5 }}>
      {categoryIntro && (
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" py={5}>
            {getLocalized(categoryIntro.title)}
          </Typography>
          <Typography variant="body1" color="textSecondary" width={{ md: 900 }}>
            {getLocalized(categoryIntro.content)}
          </Typography>
        </Box>
      )}

      {categoryTeasers?.teasers?.length > 0 && (
        <Teaser
          key={categoryTeasers.teasers[0]._id}
          title={getLocalized(categoryTeasers.teasers[0].title)}
          content={categoryTeasers.teasers[0].content}
          promoImage={categoryTeasers.teasers[0].promoImage}
          promoHotspots={categoryTeasers.teasers[0].promoHotspots}
          rightImages={categoryTeasers.teasers[0].rightImages}
          language={language}
          categoryId={categoryId}

        />
      )}

      <PromoScroller categoryId={categoryId} />

      {categoryTeasers?.teasers?.slice(1, 3).map((teaser) => (
        <Teaser
          key={teaser._id}
          title={getLocalized(teaser.title)}
          content={teaser.content}
          promoImage={teaser.promoImage}
          promoHotspots={teaser.promoHotspots}
          rightImages={teaser.rightImages}
          language={language}
          categoryId={categoryId}

        />
      ))}



      {products?.length > 0 && (
        <Box my={5} width="100%">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {getLocalized({ en: "Related Products", ar: "المنتجات ذات الصلة" })}
          </Typography>
          <ProductScroller
            categories={{
              [getLocalized({ en: "This Category", ar: "هذا القسم" })]: {
                products,
              },
            }}
          />
        </Box>
      )}
      <Box my={3} display="flex" gap={2}>
        <Button variant="outlined" onClick={() => i18n.changeLanguage("en")}>
          English
        </Button>
        <Button variant="outlined" onClick={() => i18n.changeLanguage("ar")}>
          العربية
        </Button>
      </Box>
    </Grid>
  );

}

export default Category;
