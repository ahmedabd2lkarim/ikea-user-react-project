import { Box, Button, Container, Grid, IconButton, Skeleton, Slide, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { decreaseQ, deleteItem, fetchOrder, increaseQ } from '../../../Store/Slices/orderSlice';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
function calculateTotal(items) {
    return items.reduce((acc, item) => acc + item.price.currentPrice * item.quantity, 0) + 20;
}

const FetchOrderItems = ({det,fun}) => {
    const navigate = useNavigate();
    const lng =()=>{        
        return localStorage.getItem('i18nextLng')
    }
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    let [items,setItems] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    if(localStorage.getItem('token')){
        items = useSelector((state) => state.cart.items.cartItems)
    }
    let [isLoading, setIsLoading] = useState()
    let [itemId, setItemId] = useState()
    let [itemName, setItemName] = useState()
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchOrder())
        }
    }, [])
    function decreaseQuantity(prdID) {
        setItemId(prdID)
        setIsLoading(true)
        setTimeout(() => {
            if (localStorage.getItem('token')) {
                dispatch(decreaseQ(prdID))
            }
            else {
                items = items.map((item) => {
                    if (item._id == prdID) {
                        item.quantity -= 1
                    }
                    return item
                })
                localStorage.setItem('cart', JSON.stringify(items))
                fun({ orderItems: items, total: calculateTotal(items) })
            }
            setIsLoading(false)
        }, 1000)
    }
    function increaseQuantity(prdID) {
        setItemId(prdID)
        setIsLoading(true)
        setTimeout(() => {
            if (localStorage.getItem('token')) {
                dispatch(increaseQ(prdID))
            }
            else {
                items = items.map((item) => {
                    if (item._id == prdID) {
                        item.quantity += 1
                    }
                    return item
                })
                localStorage.setItem('cart', JSON.stringify(items))
                fun({ orderItems: items, total: calculateTotal(items) })
            }
            setIsLoading(false)
        }, 1000)

    }
    function deleteOrderItem(prdID,prdName) {
        setOpen(true);
        setItemName(prdName)
        if (localStorage.getItem('token')) {
            dispatch(deleteItem(prdID))
        }
        else {
            items = items.filter((item) => item._id != prdID)
            localStorage.setItem('cart', JSON.stringify(items))
            setItems(items)
            fun([])
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
    }
    const action = (
        <>
            {/* <Button color="primary" size="small" onClick={handleClose}>
                UNDO
            </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Grid>

            <Typography variant='subtitle1' color='rgb(72, 72, 72)'>{items?.length} {t("cart.TotalProducts")}</Typography>
            {items?.map((item) =>
                <Container disableGutters key={item._id}>
                    <hr />
                    <Grid container py={3}>
                        <Grid size={3} sx={{ cursor: 'pointer' }} onClick={() => { navigate("/productDetails/" + item._id) }}>
                            <img src={item.images[0]} alt="" width={'70%'} />
                        </Grid>
                        <Grid size={7} lineHeight={1.5}>
                            <Typography variant='subtitle2' fontWeight={'bold'} sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => { navigate("/productDetails/" + item._id) }}>{item.name}</Typography>
                            <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item.typeName[lng()]}{item.imageAlt[lng()].substring(item.imageAlt[lng()].indexOf(','), item.imageAlt[lng()].lastIndexOf(','))} </Typography>
                            <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item.measurement?.length ? `${item.measurement?.length} ${item.measurement?.unit || 'cm'}` : item.measurement?.width ? `${item.measurement?.width}x${item.measurement?.height} ${item.measurement?.unit || 'cm'}` : ''}</Typography>
                            <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item.id.substring(0,8).match(/.{1,3}/g).join('.')}</Typography>
                            <Grid container pt={4}>
                                <Grid sx={{ borderRadius: '20px', border: 'grey solid 1px' }} size={{ xs: 6, sm: 3 }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <IconButton size='small' onClick={() => { decreaseQuantity(item._id) }} disabled={item.quantity == 1} >
                                        <RemoveIcon sx={{ color: 'black' }} fontSize='1px' />
                                    </IconButton>
                                    <Typography variant='subtitle2' fontWeight={'bold'}>{item.quantity}</Typography>
                                    <IconButton size='small' onClick={() => { increaseQuantity(item._id) }} disabled={item.quantity == item.stockQuantity}>
                                        <AddIcon sx={{ color: 'black' }} fontSize='1px' />
                                    </IconButton>
                                </Grid>
                                <Button color='inherit' sx={{ borderRadius: '20px', color: 'black', textTransform: 'none', fontWeight: 'bold', px: 2, py: 1, fontSize: '12px' }} onClick={() => { deleteOrderItem(item._id,item.name) }}>{t("cart.remove")}</Button>
                                <Button color='inherit' sx={{ borderRadius: '20px', color: 'black', textTransform: 'none', fontWeight: 'bold', px: 2, py: 1, fontSize: '12px' }} >
                                    {t("cart.addtoFav")}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid size={2} textAlign={'end'}>
                            {isLoading && itemId == item._id ? <Skeleton variant='rectangular' /> : <Typography variant='subtitle2' fontWeight={'bold'}>{item.price.currentPrice * item.quantity}{t("cart.EGB")}</Typography>}
                        </Grid>
                    </Grid>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={itemName + " " + t("cart.removed")}
                        action={action}
                        TransitionComponent={SlideTransition}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    />
                </Container>
            )}
        </Grid>
    )
}
export default FetchOrderItems