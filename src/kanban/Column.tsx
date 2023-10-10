import { Draggable } from "react-beautiful-dnd";

const Column = ({ id, name }) => {
  return (
    <Draggable draggableId={name} index={id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <header isDragging={snapshot.isDragging}>
            <h1
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              aria-label={`${name} quote list`}
            >
              {name}
            </h1>
          </header>
          {/*<QuoteList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : null
            }}
            quotes={quotes}
            internalScroll={props.isScrollable}
            isCombineEnabled={Boolean(props.isCombineEnabled)}
            useClone={Boolean(props.useClone)}
        />*/}
        </div>
      )}
    </Draggable>
  );
};

export default Column;
