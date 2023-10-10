import React from "react";

function Task(props: {
  description: string;
  isDragging: any;
  isGroupedOver: any;
  provided: any;
  style: any;
  isClone: any;
  index: any;
}) {
  const { description, isDragging, isGroupedOver, provided, isClone, index } =
    props;

  return (
    <div
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-index={index}
    >
      <p>{description}</p>
    </div>
  );
}

export default React.memo(Task);
