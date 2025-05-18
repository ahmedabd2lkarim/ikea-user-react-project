import { Box, Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, Typography } from '@mui/material'
import CartHeader from '../../Components/Layout/Cart/cartHeader'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchOrder } from '../../Store/Slices/orderSlice';
import CloseIcon from '@mui/icons-material/Close';
import FetchOrderItems from '../../Components/Layout/Cart/fetchOrderItems';
import { useTranslation } from 'react-i18next';

function calculateTotal(items) {
  return items.reduce((acc, item) => acc + item.price.currentPrice * item.quantity, 0) + 20;
}

const Cart = () => {
  // const { t } = useTranslation();
  const [openDrawer1, setOpenDrawer1] = useState(false)
  const [openDrawer2, setOpenDrawer2] = useState(false)
  let [order, setOrder] = useState([])
  const dispatch = useDispatch();
  (localStorage.getItem('token'))
    ? order = useSelector((state) => state.cart.items)
    : (localStorage.getItem('cart').length != 2
      ? order = {
        orderItems: JSON.parse(localStorage.getItem('cart')),
        total: calculateTotal(JSON.parse(localStorage.getItem('cart')))
      }
      : order = []);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchOrder())
    }

  }, [])

  const toggleDrawer1 = (newOpen) => {
    setOpenDrawer1(newOpen);
  };

  const toggleDrawer2 = (newOpen) => {
    setOpenDrawer2(newOpen);
  };

  const DrawerList1 = (

    <Box sx={{ width: 450 }} onClick={() => toggleDrawer1(false)}>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={2}>
        <IconButton onClick={() => toggleDrawer1(false)}>
          <CloseIcon fontSize='small' sx={{ color: 'black' }} />
        </IconButton>
      </Box>
      <Box px={4}>
        <Typography variant='h4' fontWeight={'bolder'} py={4}>It's ok to change your mind!</Typography>
        <Typography variant='subtitle2' color='rgb(72, 72, 72)'>If you're not totally satisfied with your IKEA purchase, you can return it within 90 days, together with proof of purchase, for a full refund. Refunds will be made in the same form of payment originally used to make the purchase.</Typography>
        <Typography variant='subtitle2' fontWeight={'bold'} py={3} color='rgb(72, 72, 72)'>Enjoy the benefit of 90 days to return unopened products.</Typography>
        <Typography fontWeight={'bold'} variant='subtitle2' color='rgb(72, 72, 72)' sx={{ textDecoration: 'underline', cursor: 'pointer' }}>Explore IKEA's return policy for more information</Typography>
      </Box>

    </Box>
  );

  const DrawerList2 = (
    <Box sx={{ width: 450 }} onClick={() => toggleDrawer2(false)}>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={2}>
        <IconButton onClick={() => toggleDrawer2(false)}>
          <CloseIcon fontSize='small' sx={{ color: 'black' }} />
        </IconButton>
      </Box>
      <Box px={4}>
        <Typography variant='h4' fontWeight={'bolder'} py={4}>This site is secure</Typography>
        <Typography variant='subtitle2' color='rgb(72, 72, 72)'>www.ikea.com is validated as a secure site for sending and receiving sensitive data by DigiCert OV SSL Certificate.</Typography>
        <Typography variant='subtitle2' py={3} color='rgb(72, 72, 72)'>The SSL technology encrypts the communication between the web browser and website, ensuring that no information can be intercepted or accessed by a third party.</Typography>
      </Box>

    </Box>
  );

  let commonSection = (
    <>
      <Box pt={5} display={'flex'}>
        <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" aria-hidden="true" className="cart-svg-icon">
          <path d="M19.205 5.599c.9541.954 1.4145 2.2788 1.4191 3.6137 0 3.0657-2.2028 5.7259-4.1367 7.5015-1.2156 1.1161-2.5544 2.1393-3.9813 2.9729L12 20.001v-2.3516c.6699-.4304 1.9095-1.2834 3.1347-2.4084 1.8786-1.7247 3.4884-3.8702 3.4894-6.0264-.0037-.849-.2644-1.6326-.8333-2.2015-1.1036-1.1035-2.9413-1.0999-4.0445.0014l-1.7517 1.7448-1.7461-1.7462c-1.1165-1.1164-2.9267-1.1164-4.0431 0-1.6837 1.6837-.5313 4.4136.6406 6.0155.3487.4768.7386.9326 1.1472 1.3617L8 11.9982l2 .0057-.017 6-6-.0171.0056-2 2.7743.0079c-.5387-.5472-1.0629-1.1451-1.5311-1.7852-1.0375-1.4183-1.8594-3.1249-1.8597-4.9957-.0025-1.2512.3936-2.5894 1.419-3.6149 1.8976-1.8975 4.974-1.8975 6.8716 0l.3347.3347.336-.3347c1.8728-1.8722 4.9989-1.8727 6.8716 0z"></path>
        </svg>
        <Typography fontWeight={'bolder'} color='black' pl={'10px'} sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { toggleDrawer1(true) }}>90 days to change your mind</Typography>
      </Box>
      <Box pt={1} display={'flex'}>
        <svg viewBox="0 0 24 24" focusable="false" width="24" height="24" aria-hidden="true" className="cart-svg-icon">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 3C9.7909 3 8 4.7909 8 7v4H5v11h14V11h-3V7c0-2.2091-1.7909-4-4-4zm2 8V7c0-1.1046-.8954-2-2-2s-2 .8954-2 2v4h4zm-7 9v-7h10v7H7z"></path>
        </svg>
        <Typography fontWeight={'bolder'} color='black' pl={'10px'} sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => toggleDrawer2(true)}>Secure shopping with SSL encryption</Typography>
      </Box>
    </>
  );

  return (

    <Grid container px={5} py={8}>
      <Drawer ModalProps={{ disableScrollLock: true }} PaperProps={{ sx: { borderRadius: '10px 0 0 10px' } }} open={openDrawer1} anchor='right' onClose={() => toggleDrawer1(false)}>
        {DrawerList1}
      </Drawer>
      <Drawer ModalProps={{ disableScrollLock: true }} PaperProps={{ sx: { borderRadius: '10px 0 0 10px' } }} open={openDrawer2} anchor='right' onClose={() => toggleDrawer2(false)}>
        {DrawerList2}
      </Drawer>
      {order.length == 0 ?
        <Grid container display={'flex'} flexDirection={'column'}>
          <Typography variant='h4' fontWeight={'bold'} py={5} >Your bag is empty</Typography>
          <Typography variant='subtitle1' color='rgb(72, 72, 72)'>You can add products to your shopping bag, either by searching or by <a href='' style={{ color: 'rgb(72, 72, 72)' }}>browsing products.</a></Typography>
          {commonSection}
        </Grid>
        : <><CartHeader />
          <Grid container display={'flex'} justifyContent={'space-between'} position={'relative'}>
            <Grid size={{ xs: 12, md: 7, lg: 7 }} order={{ xs: '1', md: '0' }}>
              <FetchOrderItems det={order} fun={setOrder} />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4 }} pb={4}>
              <Grid position={'sticky'} top={130} >
                <Typography variant='subtitle1' fontWeight={600} pb={2}>Order Summary</Typography>
                <Grid container display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant='subtitle2' color='rgb(72, 72, 72)'>Products ({order?.orderItems?.length})</Typography>
                  <Typography variant='subtitle2' color='rgb(72, 72, 72)'>EGP{order?.total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                </Grid>
                <Box border='1.5px solid black' my={2} />
                <Grid container display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={3}>
                  <Typography variant='subtitle1' fontWeight={600}>Subtotal incl. VAT</Typography>
                  <Typography variant='h4' fontWeight={'bold'}><sup style={{ fontSize: '16px', verticalAlign: '3px' }}>EGP</sup>{order?.total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                </Grid>
                <Typography variant='subtitle2' color='rgb(72, 72, 72)'>By clicking "check out" you're agreeing to our <a href='' style={{ color: 'rgb(72, 72, 72)' }}>Privacy Policy</a></Typography>
                <Button variant='contained' sx={{ backgroundColor: 'rgb(0, 88, 163)', color: 'white', textTransform: 'none', fontWeight: 'bold', px: 3, py: 2, fontSize: '15px', borderRadius: '27px', width: '100%', mt: 1 }} >Go to checkout</Button>
                {commonSection}
              </Grid>
            </Grid>
          </Grid>
        </>}
    </Grid>
  )
}
export default Cart
