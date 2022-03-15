import React, { useState, useEffect, useRef } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./List.css";

function List(props: any) {
  const [toggle, setToggle] = useState(true);
  const [value, setValue] = useState({
    ...props.list,
  });
  const id = props.list.id;

  const updateTitle = (value: any) => {
    setValue({ ...value, title: value });
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const titleRef = useRef<any>();

  useEffect(() => {
    let handler = (event: any) => {
      if (!titleRef.current.contains(event.target)) {
        setToggle(true);
      }
    };
    document.addEventListener("mousedown", handler);
    if (props.updateList) props.updateList(id, value.title);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [value]);

  return (
    <div className="board" onDragEnter={() => props.dragEntered(id, null)}>
      <div className="board_header" ref={titleRef}>
        {toggle ? (
          <p
            className="board_header_title"
            onDoubleClick={() => {
              setToggle(false);
            }}
          >
            {value?.title}
            <span>{props.list?.cards?.length || 0}</span>
          </p>
        ) : (
          <input
            className="rename_board"
            type="text"
            defaultValue={value?.title}
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
        <div
          className="board_header_title_more"
          onClick={() => {
            setShowDropdown(true);
          }}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeList()}>Delete List</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.list?.cards?.map((item: any) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.list.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value: any) => props.addCard(props.list?.id, value)}
        />
      </div>
    </div>
  );
}

export default List;
