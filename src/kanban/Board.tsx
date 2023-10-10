import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { Task } from "./types";
import { exampleData } from "../mock-data/mockData";

function Board() {
  const initialData: Task[] = exampleData;
  const [columns, setColumns] = useState(initialData);

  const [ordered, setOrdered] = useState(Object.keys(initialData));

  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      // const column = columns[result.source.droppableId];
      // const withQuoteRemoved = [...column];

      // withQuoteRemoved.splice(result.source.index, 1);

      // const orderedColumns = {
      //   ...columns,
      //   [result.source.droppableId]: withQuoteRemoved,
      // };
      // setColumns(orderedColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    // if (result.type === "COLUMN") {
    //   const reorderedorder = reorder(ordered, source.index, destination.index);

    //   setOrdered(reorderedorder);

    //   return;
    // }

    // const data = reorderQuoteMap({
    //   quoteMap: columns,
    //   source,
    //   destination,
    // });

    // setColumns(data.quoteMap);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {ordered.map((key, index) => (
                <Column
                  key={key}
                  index={index}
                  title={key}
                  quotes={columns[key]}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Board;
