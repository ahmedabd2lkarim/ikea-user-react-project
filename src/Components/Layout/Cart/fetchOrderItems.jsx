import { Box, Button, Container, Grid, IconButton, Skeleton, Slide, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { decreaseQ, deleteItem, fetchOrder, increaseQ } from '../../../Store/Slices/orderSlice';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const FetchOrderItems = () => {
    const [open, setOpen] = useState(false);
    const items = useSelector((state) => state.cart.items.orderItems)
    let [isLoading, setIsLoading] = useState()
    let [itemId, setItemId] = useState()
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log(1);
        
        dispatch(fetchOrder())
    }, [])
    function decreaseQuantity(prdID) {
        setItemId(prdID)
        setIsLoading(true)
        setTimeout(() => {
            dispatch(decreaseQ(prdID))
            setIsLoading(false)
        }, 1000)
    }
    function increaseQuantity(prdID) {
        setItemId(prdID)
        setIsLoading(true)
        setTimeout(() => {
            dispatch(increaseQ(prdID))
            setIsLoading(false)
        }, 1000)

    }
    function deleteOrderItem(prdID) {
        setOpen(true);
        dispatch(deleteItem(prdID))
    }
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    // console.log(items);
    
    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
    }
    const action = (
        <>
            <Button color="primary" size="small" onClick={handleClose}>
                UNDO
            </Button>
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
    // function moveToFavourites(prdID) {
    //     setItemId(prdID)
    //     setIsLoading(true)
    //     setTimeout(() => {
    //         dispatch(moveToFavourites(prdID))
    //         setIsLoading(false)
    //     }, 1000)

    // }

    return (
        <Grid>

            <Typography variant='subtitle1' color='rgb(72, 72, 72)'>{items?.length} products in total</Typography>
            {items?.map((item) =>
                <Container disableGutters key={item._id}>
                    <hr />
                    <Grid container py={3}>
                        <Grid size={3}>
                            <img src={item.image} alt="" width={'70%'} />
                        </Grid>
                        <Grid size={7} lineHeight={1.5}>
                            <Typography variant='subtitle2' fontWeight={'bold'}>{item.name}</Typography>
                            <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item.typeName}{item.imageAlt.substring(item.imageAlt.indexOf(','), item.imageAlt.lastIndexOf(','))} </Typography>
                            <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item.measurement}</Typography>
                            <Typography variant='subtitle2' color='rgb(72, 72, 72)'>{item.id.match(/.{1,3}/g).join('.')}</Typography>
                            <Grid container pt={4}>
                                <Grid sx={{ borderRadius: '20px', border: 'grey solid 1px' }} size={{ xs: 6, sm: 3 }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <IconButton size='small' onClick={() => { decreaseQuantity(item._id) }} disabled={item.quantity == 1} >
                                        <RemoveIcon sx={{ color: 'black' }} fontSize='1px' />
                                    </IconButton>
                                    <Typography variant='subtitle2' fontWeight={'bold'}>{item.quantity}</Typography>
                                    <IconButton size='small' onClick={() => { increaseQuantity(item._id) }} >
                                        <AddIcon sx={{ color: 'black' }} fontSize='1px' />
                                    </IconButton>
                                </Grid>
                                <Button color='inherit' sx={{ borderRadius: '20px', color: 'black', textTransform: 'none', fontWeight: 'bold', px: 2, py: 1, fontSize: '12px' }} onClick={() => { deleteOrderItem(item._id) }}>Remove</Button>
                                <Button color='inherit' sx={{ borderRadius: '20px', color: 'black', textTransform: 'none', fontWeight: 'bold', px: 2, py: 1, fontSize: '12px' }} >
                                    Move to favourites</Button>
                            </Grid>
                        </Grid>
                        <Grid size={2} textAlign={'end'}>
                            {isLoading && itemId == item._id ? <Skeleton variant='rectangular' /> : <Typography variant='subtitle2' fontWeight={'bold'}>EGP{item.price.currentPrice * item.quantity}</Typography>}
                        </Grid>
                    </Grid>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={item.name + "  was removed from your bag"}
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