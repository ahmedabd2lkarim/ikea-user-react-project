import React from 'react';
import { Box, Grid } from '@mui/material';
import ImageWithHotspots from './ImageWithHotspots';

const imageUrls = [
  "/images/Home/44e7157a3ff299c59c194e0414e20958.avif",
  "/images/Home/PE953618.avif",
  "/images/Home/PH202065.avif",
  "/images/Home/PH202769.avif",
];

const imglist = ["/images/Home/PH202379.webp"];

const Teaser2 = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ height: "auto", overflow: 'hidden' }}>

        <Grid item size={{ xs: 12, sm: 12, md: 5 }}>
        <ImageWithHotspots
            image={imglist[0]}
            alt="Promo"
            sx={{
              width: '100%',
              height: { md: '100%', xs: 'auto' },
              maxHeight: { md: 800 },
              objectFit: 'cover',
            }}
            hotspots={[
              {
                productId: "67fb240b6ea4e90f9f8b52d4",
                top: '30%',
                left: '45%',
              },
              {
                productId: "67fb1e794bc566c959290f24",
                top: '70%',
                left: '60%',
              },
              {
                    productId: "67fb238d6ea4e90f9f8b52d1",
                    top: '10%',
                    left: '40%',
                  },
                  {
                    productId: "67fb207f4bc566c959290f32",
                    top: '65%',
                    left: '70%',
                  },
                  {
                    productId: "67fb23276ea4e90f9f8b52cc",
                    top: '35%',
                    left: '70%',
                  },
            ]}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 12, md: 7 }}>
          <Grid container spacing={2} sx={{ height: 900 }}>

            <Grid item gap={2}  size={{ xs: 6,sm:6, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <ImageWithHotspots
                image={imageUrls[0]}
                height="40%"
                hotspots={[
                ]}
              />
              <ImageWithHotspots
                image={imageUrls[2]}
                height="60%"
                hotspots={[
                  {
                    productId: "67b7bb04fe504907c41390c9",
                    top: '15%',
                    left: '67%',
                  },
                  {
                    productId: "67b7bb04fe504907c41390c9",
                    top: '69%',
                    left: '40%',
                  },
                  {
                    productId: "67b7bb04fe504907c41390c9",
                    top: '80%',
                    left: '40%',
                  },
                  {
                    productId: "67b7bb04fe504907c41390c9",
                    top: '75%',
                    left: '60%',
                  },
                ]}
              />
            </Grid>
            <Grid spacing={2} gap={2}  size={{ xs: 6,sm:6, md: 6 }} item sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <ImageWithHotspots
                image={imageUrls[3]}
                height="60%"
                hotspots={[
                  {
                    productId: "67fb271a6ea4e90f9f8b52de",
                    top: '55%',
                    left: '45%',
                  },
                  {
                    productId: "67fb26796ea4e90f9f8b52d9",
                    top: '60%',
                    left: '30%',
                  },
                  {
                    productId: "67fb2d676ea4e90f9f8b52e6",
                    top: '70%',
                    left: '50%',
                  },
                  {
                    productId: "67fb2d0e6ea4e90f9f8b52e1",
                    top: '80%',
                    left: '10%',
                  },
                ]}
              />
              <ImageWithHotspots
                image={imageUrls[1]}
                height="40%"
                hotspots={[
                  {
                    productId: "67b8c18a1f59df01ed4b720c",
                    top: '10%',
                    left: '55%',
                  },
                  {
                    productId: "67b8c18a1f59df01ed4b720c",
                    top: '50%',
                    left: '70%',
                  },
                  {
                    productId: "67b8c18a1f59df01ed4b720c",
                    top: '70%',
                    left: '32%',
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Teaser2;
