import { Draggable } from "react-beautiful-dnd";

const Task = ({ description, sequence }) => {
  return (
    <Draggable draggableId={description} index={sequence} key={sequence}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task"
        >
          {description}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
