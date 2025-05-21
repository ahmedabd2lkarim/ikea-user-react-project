import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ImageWithHotspots from './ImageWithHotspots';

import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomProductsByCategory } from '../../Store/Slices/productSlice';

const Teaser = ({ title, content, promoImage, promoHotspots = [], rightImages = [], language = 'en', categoryId = '' }) => {
  const dispatch = useDispatch();

  const categoryProducts = useSelector(state => state.products.categoryProducts[categoryId] || []);
  const loadingCategory = useSelector(state => state.products.loadingCategory);

  // Prepare hotspot product ID chunks based on fetched products and hotspot counts
  const [hotspotChunks, setHotspotChunks] = useState([]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchRandomProductsByCategory({ categoryId, count: 50 }));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    // When categoryProducts or hotspots change, split product IDs into chunks matching hotspot arrays lengths
    if (categoryProducts.length === 0) return;

    const allHotspots = [promoHotspots, ...rightImages.map(img => img.hotspots || [])];
    let flatIndex = 0;

    const chunks = allHotspots.map(hotspots => {
      const chunk = categoryProducts.slice(flatIndex, flatIndex + hotspots.length);
      flatIndex += hotspots.length;
      return chunk.map(p => p?._id || null);
    });

    setHotspotChunks(chunks);
  }, [categoryProducts, promoHotspots, rightImages]);

  const selectedPromoImage = promoImage?.[language] || promoImage?.en;
  const leftColumn = rightImages.slice(0, 2);
  const rightColumn = rightImages.slice(2, 4);
  const rightImageMdSize = rightImages.length > 1 ? 5.5 : 6;

  return (
    <>
      {(title || content) && (
        <Box py={5}>
          {title && <Typography variant="h5" py={3} fontWeight="bold">{title}</Typography>}
          {content && (
            <Typography variant="body1" color="text.secondary" width={{ md: 900 }}>
              {content?.[language] || content.en}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ flexGrow: 1 }} pb={10}>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, sm: 12, md: rightImageMdSize }}>
            <ImageWithHotspots
              image={selectedPromoImage}
              hotspots={promoHotspots}
              language={language}
              assignedProductIds={hotspotChunks[0] || []}
            />
          </Grid>

          {rightImages.length > 1 ? (
            <Grid size={{ xs: 12, sm: 12, md: 6.5 }}>
              <Grid container spacing={2}>
                {[leftColumn, rightColumn].map((column, colIndex) => (
                  <Grid
                    key={colIndex}
                    item
                    size={{ xs: 6, sm: 6, md: 6 }}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    {column.map((img, imgIdx) => {
                      const selectedImage = img.image?.[language] || img.image.en;
                      const hotspotIndex = colIndex * 2 + imgIdx + 1; // +1 because 0 is promo
                      return (
                        <ImageWithHotspots
                          key={imgIdx}
                          image={selectedImage}
                          hotspots={img.hotspots || []}
                          language={language}
                          assignedProductIds={hotspotChunks[hotspotIndex] || []}
                        />
                      );
                    })}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : (
            <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
              <ImageWithHotspots
                image={rightImages[0].image.en}
                hotspots={rightImages[0].hotspots || []}
                language={language}
                assignedProductIds={hotspotChunks[1] || []}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Teaser;
