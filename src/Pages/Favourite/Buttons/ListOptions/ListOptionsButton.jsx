import  { useState, useEffect , } from "react";
import { Offcanvas } from "react-bootstrap";
import { IconButton, Box } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavouriteOffCanvaceBody from "../../TopSellerProductCarousel/FavouriteOffcanvaceCarousal/FavouriteOffCanvaceBody";
import ListHeader from "./ListHeader";
import ListBody from "./ListBody";
import ListActions from "./ListActions";
import DeleteListDialog from "./DeleteListDialog";
import CreateListOffcanvas from "../CreateNewListButton/CreateListOffcanvas";
import { useDispatch } from "react-redux";
import { deleteList } from "../../../../Store/Slices/createUpdateListSlice";

function ListOptionsButton({ list, onListUpdate }) {
  console.log("list " , list)
  const [show, setShow] = useState(false);
  const [placement, setPlacement] = useState("end");
  const [showFavouriteBody, setShowFavouriteBody] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRenameList, setShowRenameList] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const dispatch = useDispatch();
  
  const handleShow = () => {
    setShow(true);
    setShowFavouriteBody(false);
    setSelectedProduct(null);
  };

  const handleClose = () => {
    setShow(false);
    setShowFavouriteBody(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setPlacement(window.innerWidth <= 576 ? "bottom" : "end");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMoveToAnotherList = () => {
    const firstProduct = list?.items?.[0];
    if (firstProduct) {
      setSelectedProduct(firstProduct);
      setShowFavouriteBody(true);
    };
  };

  // Handle back from FavouriteOffCanvaceBody
  const handleBackFromFavourite = () => {
    setShowFavouriteBody(false);
    setSelectedProduct(null);
  };

  const handleAddToList = () => {};

  const handleAddAllToCart =() => {};

  const handleChangeListName = () => {
    handleClose();
    setShowRenameList(true);
  };

  const handleListUpdated = (updatedList) => {
    if (onListUpdate) onListUpdate(updatedList);
    setShowRenameList(false);
  };

  const handleCreateNewList = () => {
    handleClose();
  };

  const handleBackFromRename = () => {
    setShowRenameList(false);
    handleShow();
  };

  const listIsEmpty = list?.items?.length === 0;

  return (
    <>
      <IconButton
        onClick={handleShow}
        sx={{
          color: "#212529",
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      {showRenameList && (
        <CreateListOffcanvas
          show={showRenameList}
          onHide={() => setShowRenameList(false)}
          mode="edit"
          listData={list}
          onSubmitSuccess={handleListUpdated}
          placement={placement}
          onBack={handleBackFromRename}
        />
      )}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={placement}
        scroll={true}
        backdrop={true}
        style={{
          width: placement === "end" ? "35vw" : "100vw",
          padding: "20px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {showFavouriteBody && selectedProduct ? (
            <FavouriteOffCanvaceBody
              show={true}
              handleClose={handleClose}
              product={selectedProduct}
              onCreateNewList={handleCreateNewList}
              onAddToList={handleAddToList}
              onBack={handleBackFromFavourite}
            />
          ) : (
            <>
              <ListHeader listName={list?.name} handleClose={handleClose} />
              <Box sx={{ flexGrow: 1 }}>
                <ListBody
                  list={list}
                  listIsEmpty={listIsEmpty}
                  handleMoveToAnotherList={handleMoveToAnotherList}
                  handleChangeListName={handleChangeListName}
                  setShowDeleteDialog={setShowDeleteDialog}
                />
              </Box>
              <ListActions
                listIsEmpty={listIsEmpty}
                handleAddAllToCart={handleAddAllToCart}
              />
            </>
          )}
        </Box>
      </Offcanvas>

      <DeleteListDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        listName={list?.name}
        onDelete={async () => {
          
          await dispatch(deleteList(list._id));

            setShowDeleteDialog(false);
            handleClose();
            if (onListUpdate) onListUpdate(null);
          
        }}
      />
    </>
  );
}

export default ListOptionsButton;
