import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Droppable from "../Droppable";
import "./index.css";

const Board = (props) => {
  const [initialState, setinitialState] = useState({
    cards: {
      card1: {
        id: "card1",
        title: "A",
      },
      card2: { id: "card2", title: "B" },
      card3: { id: "card3", title: "C" },
      card4: {
        id: "card4",
        title: "D",
      },
      card5: { id: "card5", title: "E" },
      card6: { id: "card6", title: "F" },
    },
    columns: {
      todo: {
        id: "todo",
        title: "SIN REALIZAR",
        cardIds: ["card1", "card6"],
      },
      doing: {
        id: "doing",
        title: "EN PROCESO",
        cardIds: ["card2", "card4"],
      },
      done: {
        id: "done",
        title: "REALIZADO",
        cardIds: ["card3", "card5"],
      },
    },
    ColumnOrder: ["todo", "doing", "done"],
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = initialState.columns[source.droppableId];
    const finish = initialState.columns[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        cardIds: newCardIds,
      };
      const newState = {
        ...initialState,
        columns: {
          ...initialState.columns,
          [newColumn.id]: newColumn,
        },
      };
      setinitialState(newState);
      return;
    }
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);

    const newStart = {
      ...start,
      cardIds: startCardIds,
    };
    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };
    const newState = {
      ...initialState,
      columns: {
        ...initialState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setinitialState(newState);
  };

  const addTask = (column, newDescription) => {
    const newState = {
      ...initialState,
      columns: {
        ...initialState.columns,
        [column]: {
          ...initialState.columns[column],
          cardIds: [...initialState.columns[column].cardIds, newDescription],
        },
      },
    };
    setinitialState(newState);
  };

  return (
    <div>
      <main>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-colums"
            direction="horizontal"
            type="cards"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "auto",
                }}
              >
                {initialState.ColumnOrder.map((item, index) => (
                  <Column
                    key={item}
                    item={item}
                    index={index}
                    title={initialState.columns[item].title}
                    cards={initialState.columns[item].cardIds}
                    addTask={addTask}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Board;
