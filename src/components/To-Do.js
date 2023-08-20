import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { deleteAll, isChecked, todoAction } from "../redux/action/action";
import { v4 as uuidv4 } from "uuid";
import { deleteTodo } from "../redux/action/action";
import "./css/todo.css";
import { toast, ToastContainer } from "react-toastify";
import Edit from "./Edit";
import { Tooltip } from "react-tooltip";

export default function ToDo() {
  const state = useSelector((state) => state.handleTodos) ?? [];

  // for preventing re-renders and getting input value easily
  const inputData = useRef(null);
  // for clearing input(form) after submitting
  const formRef = useRef(null);

  // dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputData.current.value.length > 0) {
      dispatch(
        todoAction({
          id: uuidv4(),
          text: inputData.current.value,
          isDone: false,
        })
      );
      formRef.current.reset();
      toast.success("Item Added Successfully");
    } else {
      toast.error("Unexpected error");
    }
  };

  const handleChecking = (e, id, text) => {
    dispatch(
      isChecked({
        id,
        text,
        isDone: e.target.checked,
      })
    );
  };

  const handleSave = () => {
    if (state) {
      localStorage.setItem(`allTodo's`, JSON.stringify(state));
      toast.success("Successfully saved");
    } else {
      toast.error("No tasks to save");
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll(state));
  };


  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditButtonClick = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  // for background
  const [bgImages, setBgImages] = useState([]);
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      const accessKey = "SMppOZFgGpSbvZabRp71EE8RwmFr9bIpAMQNUNH6-gw";
      const query = "nature";
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=2&query=${query}`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      const data = await response.json();
      const imageUrls = data.map((image) => image.urls.regular);
      setBgImages(imageUrls);
      console.log(data);
      console.log(imageUrls);
    }

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [bgImages]);

  const DEFAULT_IMAGE = process.env.PUBLIC_URL + "/assets/bg.jpg";

  return (
    <div
      className={`bg-image`}
      style={{
        backgroundImage:
          `url(${bgImages[bgImageIndex]})` || `url(${DEFAULT_IMAGE})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container main-div">
        <header className="name-project">ToDo App by Farkhod</header>
        <form className="input-addBtn" onSubmit={handleSubmit} ref={formRef}>
          <input
            ref={inputData}
            type="text"
            className="form-control"
            placeholder="Add your new todo here.."
          />
          <button className="btn btn-success" type="submit">
            <i className="fas fa-plus"></i>
          </button>
        </form>
        <div className="customItems">
          {state && state.length > 0 ? (
            state.map((item) => {
              return (
                <div className="card mb-4" key={item.id}>
                  <div className="card-body row justify-content-between">
                    <input
                      className="form-check-input ml-1"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      onChange={(e) => handleChecking(e, item.id, item.text)}
                    />
                    <p
                      className={`${
                        item.isDone ? "line-through" : ""
                      } ml-4 custom-p`}
                      data-tooltip-id="item-tooltip"
                      data-tooltip-content={item.text}
                      data-tooltip-place="top"
                      data-tooltip-offset={10}
                      data-tooltip-variant={"dark"}
                    >
                      {item.text}
                    </p>
                    <button
                      className="btn btn-success delete-s-item custom-edit"
                      onClick={() => handleEditButtonClick(item)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn btn-danger mr-2 delete-s-item"
                      onClick={() => dispatch(deleteTodo(item.id))}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  <div>
                    <Edit
                      todoLists={selectedItem}
                      showModal={showEditModal}
                      onHide={() => setShowEditModal(false)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h5>ToDo's not created yet</h5>
          )}
        </div>
        <div className="footer">
          <h5>You have {state.length} tasks</h5>
          <button className="btn btn-info ml-4" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-danger" onClick={handleDeleteAll}>
            Clear All
          </button>
          <ToastContainer />
          <Tooltip id="item-tooltip" className="TooltipCustom" />
        </div>
      </div>
    </div>
  );
}
