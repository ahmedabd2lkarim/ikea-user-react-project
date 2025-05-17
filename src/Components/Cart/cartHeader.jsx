import { Box, Button, Dialog, DialogTitle, Divider, Drawer, Grid, IconButton, List, ListItem, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './cartHeader.css'
const CartHeader = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openDialoge, setOpenDialoge] = useState(false)

    const handleOpenDialoge = () => {

        setOpenDialoge(true);
    };

    const handleClose = () => {
        setOpenDialoge(false);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 450 }} onClick={toggleDrawer(false)}>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={3}>
                <IconButton onClick={toggleDrawer(false)} >
                    <CloseIcon fontSize='small' sx={{ color: 'black' }} />
                </IconButton>
            </Box>

            <List sx={{ px: 4 }}>
                <ListItem disablePadding sx={{ py: 5, cursor: 'pointer' }}>
                    <Typography pr={2}>
                        <ShoppingBasketOutlinedIcon />
                    </Typography>
                    <Typography className='item-text' fontWeight={'bold'} fontSize={14}>Add by article number</Typography>
                </ListItem>
                <hr />

                <ListItem disablePadding sx={{ py: 5, cursor: 'pointer' }} onClick={handleOpenDialoge}>
                    <Typography pr={2}>
                        <DeleteOutlinedIcon />
                    </Typography>
                    <Typography className='item-text' fontWeight={'bold'} fontSize={14}>Empty shopping bag</Typography>
                </ListItem>
                <hr />
            </List>
        </Box>
    );
    return (
            <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} size={{xs:12,md:7}}>
                <Typography variant='h4' fontWeight={'bold'} py={5}>Your bag</Typography>
                <IconButton onClick={toggleDrawer(true)}>
                    <MoreHorizIcon fontSize='small' />
                </IconButton>
                <Drawer ModalProps={{ disableScrollLock: true }} PaperProps={{ sx: { borderRadius: '10px 0 0 10px' } }} open={openDrawer} anchor='right' onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <Dialog onClose={handleClose} open={openDialoge}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={1}>
                        <IconButton onClick={handleClose} >
                            <CloseIcon fontSize='small' sx={{ color: 'black' }} />
                        </IconButton>
                    </Box>
                    <DialogTitle fontWeight={'bold'} fontSize={25}>Do you want to empty your bag?</DialogTitle>
                    <Typography variant='subtitle1' textAlign={'center'} color='rgb(72, 72, 72)'>All items and designs will be removed from your bag.</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 5, py: 3 }}>
                        <Button variant="contained" sx={{ borderRadius: '30px', backgroundColor: 'black', px: 5, py: 2 }} autoFocus>
                            Confirm
                        </Button>
                        <Button variant="outlined" onClick={handleClose} sx={{ borderRadius: '30px', color: 'black', borderColor: 'black', px: 5, py: 2 }}>
                            Cancel
                        </Button>
                    </Box>
                </Dialog>
            </Grid>
    )
}

export default CartHeader