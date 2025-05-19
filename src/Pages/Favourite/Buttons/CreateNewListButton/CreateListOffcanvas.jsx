// CreateListOffcanvas.jsx
import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Typography,
  IconButton,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createList,
  updateList,
  fetchFavourites,
  clearSnackbarMessage,
} from "../../../../Store/Slices/createUpdateListSlice";

function CreateListOffcanvas({
  show,
  onHide,
  mode,
  listData,
  placement,
  onBack,
}) {
  const maxChars = 50;
  const dispatch = useDispatch();
  const snackbarMessage = useSelector(
    (state) => state.createUpdateList.snackbarMessage
  );
  const snackbarSeverity = useSelector(
    (state) => state.createUpdateList.snackbarSeverity
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: mode === "edit" && listData ? listData.name : "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (mode === "edit" && listData) {
      reset({ name: listData.name });
    }
  }, [listData, reset, mode]);

  useEffect(() => {
    if (!show && mode === "create") {
      reset({ name: "" });
    }
  }, [show, reset, mode]);

  useEffect(() => {
    if (snackbarMessage) {
      setOpenSnackbar(true);
    }
  }, [snackbarMessage]);


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    dispatch(clearSnackbarMessage());
  };

  const listName = watch("name");

  const isValid =
    listName && listName.trim().length > 0 && listName.length <= maxChars;

  const showError = (touchedFields.name || dirtyFields.name) && !!errors.name;
  const onSubmit = async (data) => {
    try {
      const trimmedName = data.name.trim();

      if (mode === "edit" && listData) {
        const resultAction = await dispatch(
          updateList({
            id: listData.id || listData._id,
            name: trimmedName,
          })
        );

        if (updateList.fulfilled.match(resultAction)) {
          dispatch(fetchFavourites());
          onHide();
        } else {
          const errorMsg =
            resultAction.payload?.message || "Failed to update list";
          throw new Error(errorMsg);
        }
      } else {
        const listObject = {
          name: trimmedName,
          items: [],
        };

        const resultAction = await dispatch(createList(listObject));

        if (createList.fulfilled.match(resultAction)) {
          dispatch(fetchFavourites());
          onHide();
        } else {
          const errorMsg =
            resultAction.payload?.message || "Failed to create list";
          throw new Error(errorMsg);
        }
      }
    } catch (error) {
      dispatch({
        type: "createUpdateList/setSnackbarMessage",
        payload: error.message || "Unexpected error occurred",
      });
    }
  };
  

  const handleBackClick = () => {
    if (onBack && typeof onBack === "function") {
      onBack();
    }
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={onHide}
        placement={placement}
        scroll={true}
        backdrop={true}
        style={{
          width: placement === "end" ? "35vw" : "100vw",
          height: "auto",
          padding: "20px",
          borderRadius: "2%",
        }}
      >
        <Offcanvas.Header className="border-0">
          <Offcanvas.Title className="w-100 d-flex justify-content-between align-items-center">
            {mode === "edit" && (
              <IconButton onClick={handleBackClick} size="small">
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              className={`fw-bolder text-center ${
                mode === "edit" ? "flex-grow-1" : "flex-grow-1 ms-0"
              } fs-5`}
            >
              {mode === "edit" ? "Change list name" : "Create a new list"}
            </Typography>
            <IconButton onClick={onHide} size="small" sx={{ color: "black" }}>
              <CloseIcon />
            </IconButton>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body
          className="d-flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          <div className="mt-1">
            <Typography variant="body1" className="mb-2">
              {mode === "edit" ? (
                <>
                  <Typography variant="body1" className="mb-3">
                    Do you have a better name for your list? Preferably a unique
                    one so you can tell them apart.
                  </Typography>
                  <Typography variant="body1" className="mb-3">
                    Why not name it after a room, such as living room, kitchen
                    or bedroom?
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    className="mb-3"
                    sx={{ color: "#636363" }}
                  >
                    Give a name to your new list, preferably a unique one so you
                    can tell them apart.
                  </Typography>
                  <Typography
                    variant="body1"
                    className="mb-5"
                    sx={{ color: "#636363" }}
                  >
                    Why not name it after a room, such as living room, kitchen
                    or bedroom?
                  </Typography>
                </>
              )}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="text-dark mb-2">List name</label>
                <div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    {...register("name", {
                      required: "Your list needs a name",
                      maxLength: {
                        value: 50,
                        message: "The name of your list is too long",
                      },
                    })}
                    error={showError}
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        borderColor: isValid
                          ? "green"
                          : showError
                          ? "#d32f2f"
                          : undefined,
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: isValid
                            ? "green"
                            : showError
                            ? "#d32f2f"
                            : undefined,
                        },
                      },
                    }}
                  />
                  <div className="mt-1 d-flex justify-content-between align-items-center">
                    {showError ? (
                      <div
                        style={{
                          color: "#d32f2f",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ErrorIcon
                          fontSize="small"
                          style={{ color: "#d32f2f", marginRight: "4px" }}
                        />
                        <Typography variant="caption" color="error">
                          {errors.name?.message}
                        </Typography>
                      </div>
                    ) : isValid ? (
                      <div
                        style={{
                          color: "green",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CheckCircleIcon
                          fontSize="small"
                          style={{ color: "green", marginRight: "4px" }}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      {listName?.length || 0}/{maxChars}
                    </Typography>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <Chip
            label={"Save"}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
            clickable
            sx={{
              backgroundColor: "#212529",
              color: "#fff",
              px: 2,
              py: 3,
              fontSize: 15,
              fontWeight: "bold",
              borderRadius: 35,
              "&:hover": {
                backgroundColor: "#343a40",
              },
              "&.Mui-disabled": {
                opacity: 0.6,
                backgroundColor: "#6c757d",
              },
              "& .MuiChip-icon": {
                color: "#fff",
              },
            }}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
    </>
  );
}

export default CreateListOffcanvas;
