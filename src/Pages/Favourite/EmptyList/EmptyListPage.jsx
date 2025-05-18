import { Typography, Box, Snackbar, Alert } from "@mui/material";
import ListOptionsButton from "../Buttons/ListOptions/ListOptionsButton";
import BackToListButton from "../Buttons/BackToListButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import {
  selectListById,
  clearSnackbarMessage,
} from "../../../Store/Slices/createUpdateListSlice";
const EmptyListPage = () => {
  const { listId } = useParams();
  const list = useSelector((state) => selectListById(state, listId));
  const status = useSelector((state) => state.createUpdateList.status);
  const error = useSelector((state) => state.createUpdateList.error);
  const snackbarMessage = useSelector((state) => state.createUpdateList.snackbarMessage);
  const snackbarSeverity = useSelector((state) => state.createUpdateList.snackbarSeverity);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (snackbarMessage) {
      setSnackbarOpen(true);
    }
  }, [snackbarMessage]);

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
    dispatch(clearSnackbarMessage());
  };

  if (status === "loading") {
    return (
      <Box sx={{ p: 5 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box sx={{ p: 5 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!list) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography>No list found for ID: {listId}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        px: { xs: 2, md: 6 },
        py: 5,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {list.name} is empty
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          py: 3,
        }}
      >
        <BackToListButton />
        <ListOptionsButton list={list} />
      </Box>

      <Typography
        variant="body1"
        sx={{ color: "#555", maxWidth: 600, fontSize: "0.9rem" }}
      >
        This list is currently empty. Look around to find items you’d like to
        compare to save for your future home. We’ll keep them here until you’re
        ready for them.
      </Typography>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%", backgroundColor: "black", color: "#fff" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmptyListPage;
