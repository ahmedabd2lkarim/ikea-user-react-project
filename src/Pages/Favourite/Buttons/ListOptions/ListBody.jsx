import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";

function ListBody({
  listIsEmpty,
  showFavouriteBody,
  selectedProduct,
  handleMoveToAnotherList,
  handleChangeListName,
  setShowDeleteDialog,
}) {
  if (showFavouriteBody && selectedProduct) return null;

  return (
    <List sx={{ py: 3 }}>
      {!listIsEmpty && (
        <ListItem
          button
          onClick={handleMoveToAnotherList}
          sx={{
            py: 3,
            px: 2,
            borderBottom: "1px solid #f0f0f0",
            "&:hover": {
              backgroundColor: "transparent",
              cursor: "pointer",
              "& .MuiTypography-root": {
                textDecoration: "underline",
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Move all items to another list"
            primaryTypographyProps={{ fontSize: 16, fontWeight: 500 }}
          />
        </ListItem>
      )}

      {[
        {
          text: "Change name of list",
          icon: <EditIcon />,
          onClick: handleChangeListName,
        },
        {
          text: "Share list",
          icon: <ShareIcon />,
        },
        {
          text: "Remove list",
          icon: <DeleteIcon />,
          onClick: () => setShowDeleteDialog(true),
        },
      ].map((item, i) => (
        <ListItem
          key={i}
          button
          onClick={item.onClick}
          sx={{
            py: 3,
            px: 2,
            borderBottom: i < 2 ? "1px solid #f0f0f0" : "none",
            "&:hover": {
              backgroundColor: "transparent",
              cursor: "pointer",
              "& .MuiTypography-root": {
                textDecoration: "underline",
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{ fontSize: 16, fontWeight: 500 }}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ListBody;
