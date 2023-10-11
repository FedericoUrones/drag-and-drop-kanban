import { Draggable } from "react-beautiful-dnd";

const Task = ({
  description,
  index,
}: {
  description: string;
  index: number;
}) => {
  return (
    <Draggable draggableId={description} index={index}>
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
