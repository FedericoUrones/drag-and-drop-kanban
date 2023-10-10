import { Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import Droppable from "../Droppable";

const Column = ({ item, index, cards }) => {
  return (
    <Draggable key={item} draggableId={item} index={index}>
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={item}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {cards.map((card, sequence) => (
                  <Task key={card} card={card} sequence={sequence} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
