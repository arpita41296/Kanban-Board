import React, { useState } from "react";
import List from "./Components/List/List";

import "./App.css";
import Editable from "./Components/Editabled/Editable";

function App() {
  let [lists, setLists] = useState<any>([]);

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addListHandler = (name: any) => {
    const tempLists = [...lists];
    tempLists.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setLists(tempLists);
  };

  const removeList = (id: any) => {
    const index = lists.findIndex((item: any) => item.id === id);
    if (index < 0) return;

    const tempLists = [...lists];
    tempLists.splice(index, 1);
    setLists(tempLists);
  };

  const addCardHandler = (id: any, title: any) => {
    const index = lists.findIndex((item: any) => item.id === id);
    if (index < 0) return;

    const tempLists = [...lists];
    tempLists[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
    });
    setLists(tempLists);
  };

  const removeCard = (bid: any, cid: any) => {
    const index = lists.findIndex((item: any) => item.id === bid);
    if (index < 0) return;

    const tempLists = [...lists];
    const cards = tempLists[index].cards;

    const cardIndex = cards.findIndex((item: any) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setLists(tempLists);
  };

  const dragEnded = (bid: any, cid: any) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = lists.findIndex((item: any) => item.id === bid);

    s_cardIndex = lists[s_boardIndex]?.cards?.findIndex(
      (item: any) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = lists.findIndex((item: any) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    if (targetCard.cid) {
      t_cardIndex = lists[t_boardIndex]?.cards?.findIndex(
        (item: any) => item.id === targetCard.cid
      );
    }
    const tempLists = [...lists];
    const sourceCard = tempLists[s_boardIndex].cards[s_cardIndex];
    tempLists[s_boardIndex].cards.splice(s_cardIndex, 1);
    if (t_cardIndex) {
      tempLists[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    } else {
      tempLists[t_boardIndex].cards.splice(0, 0, sourceCard);
    }
    setLists(tempLists);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid: any, cid: any) => {
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid: any, cid: any, card: any) => {
    const index = lists.findIndex((item: any) => item.id === bid);
    if (index < 0) return;

    const tempLists = [...lists];
    const cards = tempLists[index].cards;

    const cardIndex = cards.findIndex((item: any) => item.id === cid);
    if (cardIndex < 0) return;

    tempLists[index].cards[cardIndex] = card;

    setLists(tempLists);
  };

  const updateList = (bid: any, name: any) => {
    const index = lists.findIndex((item: any) => item.id === bid);
    if (index < 0) return;

    const tempLists = [...lists];

    tempLists[index].title = name;

    setLists(tempLists);
  };

  return (
    <div className="app">
      <div className="app_nav">
        <h1>Kanban Board</h1>
      </div>
      <div className="app_boards_container">
        <div className="app_boards">
          {lists?.map((item: any) => (
            <List
              key={item.id}
              list={item}
              addCard={addCardHandler}
              removeList={() => removeList(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
              updateList={updateList}
            />
          ))}
          <div className="app_boards_last">
            <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter List Name"
              text="Add List"
              buttonText="Add List"
              onSubmit={addListHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
