import React, { useState } from 'react';
import { Box, Tooltip, IconButton, Divider, Typography, CircularProgress } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";

const ImageWithHotspots = ({ image, hotspots = [], language = 'en', assignedProductIds = [] }) => {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState({});
  const navigate = useNavigate();



  const handleHotspotHover = async (productId) => {
    if (!productId || productData[productId]) return;

    setLoading((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProductData((prev) => ({ ...prev, [productId]: response.data }));
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };
  const handleHotspotClick = (productId) => {
    if (productId) {
      navigate(`/productDetails/${productId}`);
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      <Box
        component="img"
        src={image}
        alt="Image with Hotspots"
        sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      {hotspots.map((hotspot, index) => {
        const productId = assignedProductIds[index];
        const product = productData[productId];

        return (
          <Tooltip
            key={index}
            placement={hotspot.placement || 'top'}
            slotProps={{ tooltip: { sx: { bgcolor: 'white' } } }}
            title={
              loading[productId] ? (
                <CircularProgress size={20} />
              ) : product ? (
                <Box display="flex" alignItems="center">
                  <Box bgcolor="white" color="black" p={2}>
                    <Typography fontWeight="bold">{product.name}</Typography>
                    <Typography variant="body2">{product.typeName?.[language] || product.typeName?.en}</Typography>
                    <Typography variant="body2">
                      {language === 'ar' ? 'السعر' : 'Price'}: {product.price?.currency} {product.price?.currentPrice?.toLocaleString()}
                    </Typography>

                    <Typography variant="caption">
                      {product.measurement?.width && product.measurement?.height
                        ? language === 'ar'
                          ? `الحجم: ${product.measurement.width} × ${product.measurement.height}`
                          : `Size: ${product.measurement.width} x ${product.measurement.height}`
                        : product.color?.[language]?.trim()
                          ? language === 'ar'
                            ? `اللون: ${product.color[language]}`
                            : `Color: ${product.color[language]}`
                          : language === 'ar'
                            ? ''
                            : ''}
                    </Typography>


                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <KeyboardArrowRightIcon sx={{ color: "black", fontSize: '25px' }} />
                </Box>
              ) : ""
            }
          >
            <IconButton
              onMouseEnter={() => handleHotspotHover(productId)}
              onClick={() => handleHotspotClick(productId)}

              sx={{
                position: 'absolute',
                top: hotspot.top,
                left: hotspot.left,
                bgcolor: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.7)',
                width: 28,
                height: 28,
                p: 0.5,
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '& .hotspot-icon': {
                    fontSize: '12px',
                  },
                },
              }}
            >
              <FiberManualRecordIcon
                className="hotspot-icon"
                sx={{ color: 'white', fontSize: '18px', transition: 'font-size 0.3s ease' }}
              />
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};


export default ImageWithHotspots;
