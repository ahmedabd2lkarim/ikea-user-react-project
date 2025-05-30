import React, { useState, useEffect } from 'react';
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
const { VITE_API_URL } = import.meta.env;

const governorates = ['Cairo', 'Giza', 'Alexandria'];

const areaMapping = {
  'Cairo': ['Maadi', 'Heliopolis', 'Nasr City', 'New Cairo', 'Downtown', 'Zamalek', 'Garden City'],
  'Giza': ['Dokki', 'Mohandessin', 'Agouza', '6th of October', 'Sheikh Zayed', 'Imbaba'],
  'Alexandria': ['Miami', 'Sidi Gaber', 'Muntaza', 'Agami', 'Smouha', 'Louran'],
};

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
  const [errors, setErrors] = useState({});
  const [availableAreas, setAvailableAreas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (form.governorate) {
      setAvailableAreas(areaMapping[form.governorate] || []);
      setForm(prev => ({ ...prev, area: '' }));
    } else {
      setAvailableAreas([]);
    }
  }, [form.governorate]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.governorate) newErrors.governorate = 'Governorate is required';
    if (!form.area || form.area === 'Select Area') newErrors.area = 'Area is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.building.trim()) newErrors.building = 'Building details are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async() => {
    if (!validateForm()) {
      return;
    }
    const address = form.governorate+', '+form.area+', '+ form.address + ', ' + form.building;

    const response = await fetch(`${VITE_API_URL}/api/checkout`, {
      method: 'POST',
      body: JSON.stringify({address, email: form.email, mobile: form.mobile}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    const session = await response.json();
    
    if (response.ok) {      
      window.location.href = session.sessionURL;
    } else {
      alert(session.error);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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
              required
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.governorate}>
              <InputLabel>Select Governorate</InputLabel>
              <Select
                required
                name="governorate"
                value={form.governorate}
                label="Select Governorate"
                onChange={handleChange}
              >
                {governorates.map((gov) => (
                  <MenuItem key={gov} value={gov}>{gov}</MenuItem>
                ))}
              </Select>
              {errors.governorate && <Typography color="error" variant="caption">{errors.governorate}</Typography>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.area}>
              <InputLabel>Select Area</InputLabel>
              <Select
                required
                name="area"
                value={form.area}
                label="Select Area"
                onChange={handleChange}
                disabled={!form.governorate}
              >
                {availableAreas.map((area) => (
                  <MenuItem key={area} value={area}>{area}</MenuItem>
                ))}
              </Select>
              {errors.area && <Typography color="error" variant="caption">{errors.area}</Typography>}
            </FormControl>
            <TextField
              fullWidth
              required
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
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
                required
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                placeholder="XXXXXXXXXX"
              />
            </Box>
            <TextField
              fullWidth
              required
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              required
              label="Building Name/Apartment No./Floors No."
              name="building"
              value={form.building}
              onChange={handleChange}
              error={!!errors.building}
              helperText={errors.building}
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
            <Button variant="contained" sx={{ bgcolor: '#0058a3', width: '35%' }} onClick={handlePayment}>
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
