import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
const promos = [
  {
    title: {
      en: 'New lower price',
      ar: 'كل يوم أسعار مخفضة',
    },
    description: {
      en: 'Everything you need to furnish and decorate your dream home at new lower price.',
      ar: 'اكتشف كل ما تحتاجه لتأثيث وتزيين منزل أحلامك بسعر منخفض جديد',
    },
    images: {
      en: 'https://www.ikea.com/images/fa/bf/fabfd9f590fe0bbea8ef982368c6d65c.jpg?f=m',
      ar: 'https://www.ikea.com/images/0a/a6/0aa606540ea106f9d7ec926b894da045.jpg?f=m',
    },
  },
  {
    title: {
      en: 'Revamp your office!',
      ar: 'جدد مكتبك!',
    },
    description: {
      en: 'Create a workspace that blends style, comfort, & efficiency.',
      ar: 'قم بإنشاء مساحة عمل تمزج بين الأناقة والراحة والكفاءة.',
    },
    images: {
      en: 'https://www.ikea.com/images/0c/a0/0ca04f09f727fa44a6fba1cb52df229c.png?f=m',
      ar: 'https://www.ikea.com/images/6a/cf/6acfc87b14a07e2c2044391508fcfc47.png?f=m',
    },
  },
  {
    title: {
      en: 'Hurry Up!',
      ar: 'لا تفوت الفرصة',
    },
    description: {
      en: "We're always innovating at IKEA, meaning some products will go out of stock forever. So, this is your last chance to buy these products.",
      ar: "نحن دائماً نبتكر في إيكيا، مما يعني أن بعض المنتجات ستنفد إلى الأبد. لذا، هذه فرصتك الأخيرة لشراء هذه المنتجات.",
    },
    images: {
      en: 'https://www.ikea.com/images/4d/8f/4d8fc52d362cfeb33c658d2770ee3ebc.png?f=m',
      ar: 'https://www.ikea.com/images/29/47/2947273a75c985e30afe061bec01b71b.png?f=m',
    },
  },
  {
    title: {
      en: 'Plan and design your dream bedroom',
      ar: 'تخطيط وتصميم غرفة نوم أحلامك',
    },
    description: {
      en: 'Experience our new bedroom planner anywhere, any time.',
      ar: 'ستمتع بتجربة مخطط غرف النوم الجديد لدينا في أي وقت وفي أي مكان.',
    },
    images: {
      en: 'https://www.ikea.com/images/fd/3c/fd3ce0adaab54ea05bdf90adbe4aac59.jpg?f=m',
      ar: 'https://www.ikea.com/images/fd/3c/fd3ce0adaab54ea05bdf90adbe4aac59.jpg?f=m',
    },
  },
  {
    title: {
      en: 'Free delivery to your doorstep across Egypt',
      ar: 'توصيل مجاني حتى باب المنزل لجميع أنحاء مصر',
    },
    description: {
      en: 'On accessory purchases over 250 EGP and up to 20 KGs per order.',
      ar: 'لمشتريات الاكسسوارات بأكثر من 250 جنيه وحتى 20 كجم لكل طلب.',
    },
    images: {
      en: 'https://www.ikea.com/images/fd/3c/fd3ce0adaab54ea05bdf90adbe4aac59.jpg?f=m',
      ar: 'https://www.ikea.com/images/10/52/10523c16d0e0ad2814044eecc13ecc8a.jpg?f=m',
    },
  },
  {
    title: {
      en: 'IKEA Gift card',
      ar: 'بطاقة هدايا ايكيا',
    },
    description: {
      en: 'Our gift cards offer your loved ones their choice of gifts at the value of your choice.',
      ar: 'بطاقات الهدايا من ايكيا توفر لأحبابك فرصة اختيار هداياهم بأنفسهم بالقيمة التي تحددها.',
    },
    images: {
      en: 'https://www.ikea.com/images/gift-card-99c24160c738ae6355aa4ddb47a80742.jpg?f=m',
      ar: 'https://www.ikea.com/images/99/c2/99c24160c738ae6355aa4ddb47a80742.jpg?f=m',
    },
  },
  {
    title: {
      en: 'Transform your kitchen today',
      ar: 'غيّر مطبخك اليوم',
    },
    description: {
      en: 'Discover modern solutions for a stylish and functional kitchen.',
      ar: 'اكتشف الحلول الحديثة لمطبخ أنيق وعملي.',
    },
    images: {
      en: 'https://www.ikea.com/images/f7/54/f75442c25465528881ae2575702e83fc.jpg?f=m',
      ar: 'https://www.ikea.com/images/f9/58/f9580f6f86ebe700053be9db4b01dc3b.jpg?f=m',
    },
  },
];

const PromoScroller = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language; 

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
            width: { xs: 260, sm: 400, md: 460 },
            height: { xs: 604, sm: 604, md: 700 },
            flex: '0 0 auto',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            border: 'none',
            borderRadius: 0,
          }}
        >
          <Box
            component="img"
            src={promo.images[currentLang]} // Use the correct image based on the language
            alt={promo.title[currentLang]} // Use the correct title based on the language
            sx={{
              height: { md: '62%', sm: '60%', xs: '42%' },
              width: '100%',
              objectFit: 'cover',
              borderRadius: 0,
            }} />
          <CardContent
            sx={{
              bgcolor: '#F5F5F5',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h5" fontSize={26} fontWeight="bold">
                {promo.title[currentLang]}  {/* Display title based on language */}
              </Typography>
              <Typography variant="body2" fontSize={16} color='#484848' mt={1}>
                {promo.description[currentLang]} {/* Display description based on language */}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: 'black', py: 2.5, m: 0, borderRadius: '50%', alignSelf: 'flex-start' }}
            >
              <ArrowForwardIcon fontSize="medium" sx={{ m: 0, p: 0 }} />
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PromoScroller;
