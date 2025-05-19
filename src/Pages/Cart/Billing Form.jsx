import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const governorates = ['Cairo', 'Giza', 'Alexandria', 'Other'];
const areas = ['Select Area'];

const BillingShippingForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    governorate: '',
    area: '',
    email: '',
    mobile: '',
    address: '',
    building: '',
    useAsShipping: true,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          bgcolor: '#fff',
          py: 2,
          px: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #eee',
          mb: 2,
        }}
      >
        <img
          src="https://www.ikea.com/global/assets/logos/brand/ikea.svg"
          alt="IKEA Logo"
          style={{ height: 40 }}
        />
        <Link
          component="button"
          onClick={() => navigate('/cart')}
          underline="hover"
          sx={{ color: '#0058a3', fontWeight: 500, fontSize: 16 }}
        >
          Continue shopping
        </Link>
      </Box>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            pb:3
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, bgcolor: '#0058a3', color: '#fff', p: 2, borderRadius: 1 }}>
            Billing and Shipping Address
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, mx:3}}>
            Billing Address
          </Typography>
          <Box component="form" mx={10} noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Governorate</InputLabel>
              <Select
                name="governorate"
                value={form.governorate}
                label="Select Governorate"
                onChange={handleChange}
              >
                {governorates.map((gov) => (
                  <MenuItem key={gov} value={gov}>{gov}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Area</InputLabel>
              <Select
                name="area"
                value={form.area}
                label="Select Area"
                onChange={handleChange}
              >
                {areas.map((area) => (
                  <MenuItem key={area} value={area}>{area}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              // label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              type="email"
              placeholder="sample1@sample.com"
            />
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>Enter the IKEA Family registered mobile number to avail <Link href="#">IKEA Family price</Link> discount</b>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ mr: 1 }}>+2</Typography>
              <TextField
                fullWidth
              //   label="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="XXXXXXXXXX"
              />
            </Box>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Building Name/Apartment No./Floors No."
              name="building"
              value={form.building}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.useAsShipping}
                  onChange={handleChange}
                  name="useAsShipping"
                />
              }
              label="Use as shipping address"
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
              By clicking "Continue" you accept and agree to the{' '}
              <Link href="#">Terms and Conditions</Link>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="contained" sx={{ bgcolor: '#0058a3', width: '35%' }} >
              CONTINUE
            </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
export default BillingShippingForm;