import { Draggable } from "react-beautiful-dnd";

const Task = ({ card, sequence }) => {
  return (
    <Draggable draggableId={card} index={sequence} key={sequence}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task"
        >
          {card}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
