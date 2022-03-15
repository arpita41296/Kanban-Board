import React, { useState, useEffect, useRef } from "react";
import { FaLock, FaUnlock, FaTrash, FaEdit } from "react-icons/fa";
import "./Card.css";

function Card(props: any) {
  const [locked, setLocked] = useState(false);
  const [toggle, setToggle] = useState(true);

  const id = props.card.id;

  const [value, setValue] = useState({
    ...props.card,
  });

  const titleRef = useRef<any>();

  const updateTitle = (t_value: any) => {
    setValue({ ...value, title: t_value });
  };

  const toggleLockValue = () => {
    setLocked(!locked);
  };

  useEffect(() => {
    let handler = (event: any) => {
      if (!titleRef.current.contains(event.target)) {
        setToggle(true);
      }
    };
    document.addEventListener("mousedown", handler);
    if (props.updateCard) props.updateCard(props.boardId, id, value);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [value]);

  return (
    <>
      <div
        className="card"
        draggable={locked ? false : true}
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
      >
        <div className="card_top">
          <div className="rowC"></div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <FaEdit
              className="edit_icon"
              onClick={() => {
                setToggle(false);
              }}
            />
            &nbsp; &nbsp;
            <FaTrash
              className="delete_icon"
              onClick={() => props.removeCard(props.boardId, value.id)}
            />
          </div>
        </div>
        <div className="card_title" ref={titleRef}>
          {toggle ? (
            <span>{value.title}</span>
          ) : (
            <input
              className="rename_card"
              type="text"
              defaultValue={value.title}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  updateTitle(event.currentTarget.value);
                  setToggle(true);
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
            />
          )}
          &nbsp;{" "}
          {locked ? (
            <FaLock onClick={toggleLockValue} />
          ) : (
            <FaUnlock className="unLocked_icon" onClick={toggleLockValue} />
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
