import { useState, useEffect } from "react";
import FavouriteOffCanvaceBody from "./FavouriteOffCanvaceBody";
import CreateListOffcanvas from "../../Buttons/CreateNewListButton/CreateListOffcanvas";
import FavoriteToggleButton from "./FavoriteToggleButton";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

function FavouriteManager({ product, onOffcanvasToggle }) {
  const [showFavourite, setShowFavourite] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteListId, setFavoriteListId] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/api/favourites`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        // console.log("response is: ",response)

        const lists = response.data.lists || response.data;
        setFavourites(lists);

        let productFoundInList = null;
        const isProductFavorite = lists.some((list) => {
          const found = list.items?.some((item) => item._id === product._id);
          if (found) {
            productFoundInList = list._id;
          }
          return found;
        });

        setIsFavorite(isProductFavorite);
        setFavoriteListId(productFoundInList);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [product, token]);

  const handleHeartClick = async (e) => {
    e.stopPropagation();

    if (isFavorite && favoriteListId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showNotification("User not authenticated", "error");
          return;
        }

        await axios.put(
          `${VITE_API_URL}/api/favourites/remove-product`,
          {
            listId: favoriteListId,
            productId: product._id,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setFavourites((prev) =>
          prev.map((f) =>
            f._id === favoriteListId
              ? {
                  ...f,
                  items: f.items.filter((item) => item._id !== product._id),
                }
              : f
          )
        );
        // window.location.reload()
        setIsFavorite(false);
        setFavoriteListId(null);
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    } else {
      handleOpenFavourite(e);
    }
  };

  const handleOpenFavourite = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setShowFavourite(true);
    if (onOffcanvasToggle) {
      onOffcanvasToggle(true);
    }
  };

  const handleCloseFavourite = () => {
    setShowFavourite(false);
    if (onOffcanvasToggle) {
      onOffcanvasToggle(false);
    }
  };

  const handleOpenCreateList = () => {
    setShowFavourite(false);
    setShowCreateList(true);
  };

  const handleCloseCreateList = async () => {
    setShowCreateList(false);
    try {
      const response = await axios.get(`${VITE_API_URL}/api/favourites`, {
        headers: { Authorization: token },
      });
      setFavourites(response.data.lists || response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
    onOffcanvasToggle?.(false);
  };
  const handleAddToList = async (listId, listName) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/api/favourites/list/${listId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const list = response.data;

      if (!list) {
        return;
      }

      if (list.items?.some((item) => item._id === product._id)) {
        handleCloseFavourite();
        return;
      }

      await axios.put(
        `${VITE_API_URL}/api/favourites/add-product`,
        { listId, productId: product._id },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      setIsFavorite(true);
      setFavoriteListId(listId);
      handleCloseFavourite();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <>
      <FavoriteToggleButton
        isFavorite={isFavorite}
        onToggle={handleHeartClick}
      />

      <FavouriteOffCanvaceBody
        show={showFavourite}
        handleClose={handleCloseFavourite}
        onCreateNewList={handleOpenCreateList}
        product={product}
        onAddToList={handleAddToList}
      />

      <CreateListOffcanvas
        show={showCreateList}
        onHide={handleCloseCreateList}
        placement="end"
        product={product}
        onSubmitSuccess={(newList) => {
          // When a new list is created, immediately add the product to it
          if (newList && newList.id) {
            setTimeout(() => {
              handleAddToList(newList.id, newList.name);
            }, 300);
          }
          handleCloseCreateList();
        }}
      />
    </>
  );
}

export default FavouriteManager;
