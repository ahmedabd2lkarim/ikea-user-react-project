import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import ImageWithHotspots from './ImageWithHotspots';

const Teaser = ({ title, content, promoImage, promoHotspots = [], rightImages = [], language = 'en' ,categoryId = '',}) => {
  const [_, setProductList] = useState([]);
  const [hotspotChunks, setHotspotChunks] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/promos/products/${categoryId}`);
        const allProducts = res.data;

        setProductList(allProducts);

        // Combine all hotspot arrays
        const allHotspots = [promoHotspots, ...rightImages.map(img => img.hotspots || [])];
        let flatIndex = 0;

        const chunks = allHotspots.map(hotspots => {
          const chunk = allProducts.slice(flatIndex, flatIndex + hotspots.length);
          flatIndex += hotspots.length;
          return chunk.map(p => p?._id || null);
        });

        setHotspotChunks(chunks);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, [promoHotspots, rightImages,categoryId]);

  const selectedPromoImage = promoImage?.[language] || promoImage.en;
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
