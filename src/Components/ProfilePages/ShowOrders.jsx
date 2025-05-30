import { Button, Collapse, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, fetchOrders } from "../../Store/Slices/orderSlice";
import { useEffect, useState } from "react";
import './ShowOrders.css';
import { t } from "i18next";
import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { set } from "react-hook-form";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,

      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));


const ShowOrders = () => {
  const navigate = useNavigate()
  const lng = () => {
    return localStorage.getItem('i18nextLng')
  }
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.items);
  useEffect(() => {
    dispatch(fetchOrders());
    console.log("Orders fetched:", orders);
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [orderId, setOrderId] = useState();
  const handleExpandClick = (OID) => {
    setOrderId(OID)
    setExpanded(!expanded);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      case "shipped":
        return "status-shipped";
      case "processing":
        return "status-processing";
      default:
        return "status-pending";
    }
  };

  return (
    <Grid container px={5} py={5} direction={'column'} spacing={5} width={'80%'} >
      <Typography variant="h4" >
        My Orders
      </Typography>
      {orders.map((order) => (
        <Paper key={order._id} square={false} variant="outlined" elevation={5} >
          <Grid container justifyContent="space-between" alignItems="center" p={2} bgcolor={"#f5f5f5"}>
            <Grid gap={1}>
              <Typography variant="subtitle2" color='textDisabled'>Order ID</Typography>
              <Typography>#{order._id.substr(0, 8)}</Typography>
            </Grid>
            {order.status == 'cancelled' ? <Button variant='text' color='error' disabled>Cancelled</Button>
              : <>
                <Typography variant="body1" borderRadius={10} px={2} py={1} className={getStatusClass(order.status)}>{order.status}</Typography>
                <Typography>{order?.total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{t("cart.EGB")}</Typography>
                <Button variant='contained' color='error' onClick={() => dispatch(cancelOrder(order._id))}>Cancel</Button>
                <ExpandMore
                  expand={expanded}
                  onClick={() => handleExpandClick(order._id)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </>}
          </Grid>
          <Grid container spacing={2} p={2} direction={'column'} >
            {order.orderItems.map((item) => (
              <Container key={item._id}>
                <Collapse in={order.status != 'cancelled' ? order._id === orderId ? expanded : false : true} timeout="auto" unmountOnExit>
                  <Grid container py={3}>
                    <Grid size={2} sx={{ cursor: 'pointer' }} onClick={() => { navigate("/productDetails/" + item._id) }}>
                      <Image src={item.images[0]} alt={item.imageAlt} width={'70%'} />
                    </Grid>
                    <Grid size={5} lineHeight={1.5} display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={1}>
                      <Typography variant='subtitle2' fontWeight={'bold'} sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => { navigate("/productDetails/" + item._id) }}>{item.name}</Typography>
                      <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item.typeName[lng()]}{item.imageAlt[lng()].substring(item.imageAlt[lng()].indexOf(','), item.imageAlt[lng()].lastIndexOf(','))} </Typography>
                    </Grid>
                    <Grid size={5} px={5} lineHeight={1.5} display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                      <Typography variant='subtitle2'>x{item.quantity}</Typography>
                      <Typography variant='subtitle2' fontWeight={'bold'}>{item.price.currentPrice * item.quantity}{t("cart.EGB")}</Typography>
                    </Grid>
                  </Grid>
                </Collapse>
              </Container>
            ))}
          </Grid>
        </Paper>
      ))}
    </Grid>
  )
}

export default ShowOrders