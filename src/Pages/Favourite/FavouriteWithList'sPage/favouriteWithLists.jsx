import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DotLoader } from "react-spinners";
import { fetchFavourites } from "../../../Store/Slices/createUpdateListSlice";
import CreateListManager from "../Buttons/CreateNewListButton/CreateListManager";
import ListOptionsButton from "../Buttons/ListOptions/ListOptionsButton";
import EmptyOrNotLogin from "../EmptyOrNotLoginFavouritePage/emptyOrNotLogin";
import FavouriteManager from "../TopSellerProductCarousel/FavouriteOffcanvaceCarousal/FavouriteManager";
import "bootstrap/dist/css/bootstrap.min.css";

function FavouriteWithLists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const { items, status } = useSelector((state) => state.createUpdateList);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/favourite");
      return;
    }

    dispatch(fetchFavourites());
  }, [dispatch, navigate]);

  const handleEmptyListRedirect = (listId) => {
    navigate(`/empty-list-page/${listId}`);
  };

  const handleProductClick = (listId) => {
    navigate(`/list-details/${listId}`);
  };

  const lists = items?.lists || [];

  return (
    <Container fluid className="p-4">
      {status === "loading" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <DotLoader color="#333" size={40} />
        </Box>
      ) : lists.length === 0 ? (
        <EmptyOrNotLogin />
      ) : (
        <>
          <Typography variant="h3" fontWeight="bold">
            Your favourites
          </Typography>
          <Typography variant="body1" className="my-4">
            {lists.length} lists in total
          </Typography>

          {lists.map((list) => (
            <Box key={list._id} mb={4}>
              <Typography variant="h5" fontWeight={600}>
                {list.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "space-between",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography variant="body1" sx={{ flexGrow: 1, pt: 1 }}>
                  {list.items?.length || 0} items
                </Typography>
                <ListOptionsButton list={list} />
              </Box>

              {list.items?.length === 0 ? (
                <Paper
                  sx={{
                    width: 259,
                    height: 280,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F5F5",
                    borderRadius: 0,
                    borderBottom: "none",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="black"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => handleEmptyListRedirect(list._id)}
                  >
                    This list seems to be empty
                  </Typography>
                </Paper>
              ) : (
                <Row className="gx-1">
                  {list.items?.slice(0, 5).map((item) => (
                    <Col
                      key={item._id}
                      xs="auto"
                      style={{
                        width: 259,
                        backgroundColor: "#F5F5F5",
                        paddingBottom: "8px",
                        paddingTop: "8px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      }}
                      onClick={() => handleProductClick(list._id)}
                    >
                      <Paper
                        sx={{
                          height: "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#F5F5F5",
                          borderBottom: "none",
                          flexGrow: "1",
                          boxShadow: "none",
                          ":hover": { cursor: "pointer", boxShadow: 3 },
                        }}
                      >
                        <Image
                          src={item.contextualImageUrl}
                          alt={item.name}
                          fluid
                          style={{
                            maxHeight: 250,
                            objectFit: "contain",
                            width: "100%",
                          }}
                        />
                      </Paper>
                    </Col>
                  ))}
                </Row>
              )}
            </Box>
          ))}

          <CreateListManager />
        </>
      )}
    </Container>
  );
}

export default FavouriteWithLists;
