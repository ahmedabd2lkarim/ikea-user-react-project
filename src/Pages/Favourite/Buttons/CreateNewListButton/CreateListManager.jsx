// CreateListManager.jsx
import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CreateListButton from "./CreateListButton";
import CreateListOffcanvas from "./CreateListOffcanvas";
import { selectListById } from "../../../../Store/Slices/createUpdateListSlice";

function CreateListManager({
  isEditing = false,
  listId = null,
  onBack = null,
}) {
  const [show, setShow] = useState(false);
  const [placement, setPlacement] = useState("end");
  const [mode, setMode] = useState(isEditing ? "edit" : "create");

  const listData = useSelector((state) =>
    listId ? selectListById(state, listId) : null
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setPlacement("bottom");
      } else if (window.innerWidth <= 768) {
        setPlacement("start");
      } else {
        setPlacement("end");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMode(isEditing ? "edit" : "create");
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && listData) {
      setShow(true);
    }
  }, [isEditing, listData]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const renderButton = () => {
    if (!isEditing) {
      return <CreateListButton onClick={handleShow} />;
    }
    return null;
  };

  return (
    <Fragment>
      {renderButton()}

      <CreateListOffcanvas
        show={show}
        onHide={handleClose}
        mode={mode}
        listData={listData}
        placement={placement}
        onBack={onBack}
      />
    </Fragment>
  );
}

export default CreateListManager;
