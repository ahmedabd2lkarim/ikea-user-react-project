import React, { useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Teaser from "../../Components/Home/Teaser";
import ProductScroller from "../../Components/Home/ProductScroller";
import PromoScroller from "../../Components/Home/PromoScroller";
import useFetchTeaser from "../../hooks/useFetchTeaser";

import {
  fetchCategoryIntro,
  fetchCategoryProducts,
} from "../../Store/Slices/categorySlice";

function Category() {
  const { id: categoryId } = useParams();
  const { i18n } = useTranslation();
  const language = i18n.language;
  const dispatch = useDispatch();

  const {
    intro,
    introLoading,
    products,
    productsLoading,
  } = useSelector((state) => state.category);

  const {
    teaserData: categoryTeasers,
    loading: loadingCategoryTeasers,
  } = useFetchTeaser(categoryId);

  useEffect(() => {
    dispatch(fetchCategoryIntro(categoryId));
  }, [categoryId, language, dispatch]);

  useEffect(() => {
    dispatch(fetchCategoryProducts(categoryId));
  }, [categoryId, dispatch]);

  const getLocalized = (obj) => obj?.[language] || obj?.["en"];

  if (loadingCategoryTeasers || introLoading || productsLoading) {
    return (
      <Box display="flex" justifyContent="center" my={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container px={{ xs: 1, sm: 2, md: 5 }}>
      {intro && (
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" py={5}>
            {getLocalized(intro.title)}
          </Typography>
          <Typography variant="body1" color="textSecondary" width={{ md: 900 }}>
            {getLocalized(intro.content)}
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

    </Grid>
  );
}

export default Category;
