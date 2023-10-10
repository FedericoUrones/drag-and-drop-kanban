import { Draggable } from "react-beautiful-dnd";

const Task = ({ card, sequence }) => (
  <Draggable draggableId={card} index={sequence} key={sequence}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {card + " " + sequence}
      </div>
    )}
  </Draggable>
);

export default Task;
