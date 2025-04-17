import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const promos = [
  {
    title: 'New lower price',
    description: 'Everything you need to furnish and decorate your dream home at new lower price.',
    image: 'https://www.ikea.com/images/fa/bf/fabfd9f590fe0bbea8ef982368c6d65c.jpg?f=m',
  },
  {
    title: 'Revamp your office!',
    description: 'Create a workspace that blends style, comfort, & efficiency.',
    image: 'https://www.ikea.com/images/0c/a0/0ca04f09f727fa44a6fba1cb52df229c.png?f=m',
  },
  {
    title: 'Hurry Up!',
    description: "We're always innovating at IKEA, meaning some products will go out of stock forever. so this is your last chance to buy these products.",
    image: 'https://www.ikea.com/images/4d/8f/4d8fc52d362cfeb33c658d2770ee3ebc.png?f=m',
  },
  {
    title: 'Plan and design your dream bedroom',
    description: 'Experience our new bedroom planner anywhere, any time.',
    image: 'https://www.ikea.com/images/fd/3c/fd3ce0adaab54ea05bdf90adbe4aac59.jpg?f=m',
  },
  {
    title: 'Free delivery to your doorstep across Egypt',
    description: 'On accessory purchases over 250 EGP and up to 20 KGs per order.',
    image: 'https://www.ikea.com/images/fd/3c/fd3ce0adaab54ea05bdf90adbe4aac59.jpg?f=m',
  },
  {
    title: 'IKEA Gift card',
    description: 'Our gift cards offer your loved ones their choice of gifts at the value of your choice.',
    image: 'https://www.ikea.com/images/gift-card-99c24160c738ae6355aa4ddb47a80742.jpg?f=m',
  },
  {
    title: 'Transform your kitchen today',
    description: 'Discover modern solutions for a stylish and functional kitchen.',
    image: 'https://www.ikea.com/images/f7/54/f75442c25465528881ae2575702e83fc.jpg?f=m',
  },
];
const PromoScroller = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        p: 2,
        scrollSnapType: 'x mandatory',
        "&::-webkit-scrollbar": {
            height: 4,
            width: 10,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "black",
          },
          "&:hover::-webkit-scrollbar": {
            height: 5,
            width: 10,
          },
      }}
    >  
      {promos.map((promo, index) => (
        <Card elevation={0}
          key={index}
          sx={{
            width: 460,
            height: 700,
            flex: '0 0 auto',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            border:'none',
            borderRadius: 0,
          }}
        >
          <Box
            component="img"
            src={promo.image}
            alt={promo.title}
            sx={{
              height: '62%',
              width: '100%',
              objectFit: 'cover',
              borderRadius: 0,
            }}/>
          <CardContent
            sx={{
                bgcolor:'#F5F5F5',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h5" fontSize={26} fontWeight="bold">
                {promo.title}
              </Typography>
              <Typography variant="body2" fontSize={16} color='#484848' mt={1}>
                {promo.description}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              
              sx={{ bgcolor:'black',py:2.5,m:0,borderRadius:'50%', alignSelf: 'flex-start' }}
            >
              <ArrowForwardIcon fontSize="medium" sx={{m:0,p:0}}/>
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PromoScroller;
