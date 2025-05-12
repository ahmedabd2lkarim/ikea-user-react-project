import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ImageWithHotspots from './ImageWithHotspots';

const Teaser = ({ title, content, promoImage, promoHotspots = [], rightImages = [], language = 'en' }) => {
  const selectedPromoImage = promoImage?.[language] || promoImage.en;
  console.log(selectedPromoImage, language);
  console.log(rightImages);



  const leftColumn = rightImages.slice(0, 2);
  const rightColumn = rightImages.slice(2, 4);
  const rightImageMdSize = rightImages.length > 1 ? 5.5 : 6;

  return (
    <>
      {(title || content) && (
        <Box py={5}>
          {title && (
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {title} { }
            </Typography>
          )}
          {content && (
            <Typography variant="body1" color="text.secondary">
              {content?.[language] || content.en}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ overflow: 'hidden' }}>

          <Grid item size={{ xs: 12, sm: 12,md:rightImageMdSize }}>
            <ImageWithHotspots
              image={selectedPromoImage}
              height="900px"
              hotspots={promoHotspots}
            />
          </Grid>

          {rightImages.length > 1 ? (
            <Grid size={{ xs: 12, sm: 12, md: 6.5 }}>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 6, sm: 6, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {leftColumn.map((img, idx) => {
                    const selectedImage = img.image?.[language] || img.image.en; // Fallback to English if no language-specific image
                    return (
                      <ImageWithHotspots
                        key={idx}
                        image={selectedImage}
                        hotspots={img.hotspots || []}
                      />
                    );
                  })}
                </Grid>
                <Grid item size={{ xs: 6, sm: 6, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {rightColumn.map((img, idx) => {
                    const selectedImage = img.image?.[language] || img.image.en; // Fallback to English if no language-specific image
                    return (
                      <ImageWithHotspots
                        key={idx}
                        image={selectedImage}
                        hotspots={img.hotspots || []}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>) : 
            <Grid item size={{ xs: 12, sm: 12, md: 6}}>
              <ImageWithHotspots
                image={rightImages[0].image.en}
                hotspots={promoHotspots}
              />
            

          </Grid>}
        </Grid>
      </Box>
    </>
  );
};

export default Teaser;
