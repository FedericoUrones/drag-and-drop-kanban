import { useState } from "react";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "react-beautiful-dnd";
import Column from "./Column";
import Droppable from "../Droppable";
import "./index.css";
import {
  mockColumns,
  mockTasks,
  mockColumnsOrder,
} from "../mock-data/mockData";
import Task from "./Task";
import {
  ColumnsArray,
  Task as TaskType,
  Column as ColumnType,
  ColumnsOrderArray,
  TasksArray,
} from "../types/kanban";

const findTaskByDescription = (
  taskDescription: string,
  tasks: TasksArray
): TaskType => {
  return tasks.find(
    (singleTask) => singleTask.description === taskDescription
  )!;
};

const findColumnByName = (
  columnName: string,
  columns: ColumnsArray
): ColumnType => {
  return columns.find((singleColumn) => singleColumn.name === columnName)!;
};

const findColumnIndexByName = (
  columnName: string,
  columns: ColumnsArray
): number => {
  return columns.findIndex(
    (singleColumn: ColumnType) => singleColumn.name === columnName
  );
};

const Board = () => {
  const [columns, setColumns] = useState<ColumnsArray>(mockColumns);
  const [tasks, setTasks] = useState<TasksArray>(mockTasks);
  const [columnsOrder, setColumnsOrder] =
    useState<ColumnsOrderArray>(mockColumnsOrder);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === "all-colums") {
      // handle column movement
      handleColumnMovement(source.index, destination.index, draggableId);
    } else {
      // handle task movement
      handleTaskMovement(source, destination, draggableId);
    }
  };

  const handleColumnMovement = (
    sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => {
    const columnId = findColumnIndexByName(draggableId, columns);
    const newColumnsOrder = [...columnsOrder];
    newColumnsOrder.splice(sourceIndex, 1);
    newColumnsOrder.splice(destinationIndex, 0, columnId);

    setColumnsOrder(newColumnsOrder);
  };

  const handleTaskMovement = (
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string
  ) => {
    const startColumn = findColumnByName(source.droppableId, columns);
    const finishColumn = findColumnByName(destination.droppableId, columns);

    if (startColumn === finishColumn) {
      handleTaskMovementSameColumn(
        source,
        destination,
        draggableId,
        startColumn
      );
    } else {
      handleTaskMovementDifferentColumns(
        source,
        destination,
        draggableId,
        startColumn,
        finishColumn
      );
    }
  };

  const handleTaskMovementSameColumn = (
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string,
    column: ColumnType
  ) => {
    const newTasks = [...column.tasks];
    newTasks.splice(source.index, 1);
    newTasks.splice(
      destination.index,
      0,
      findTaskByDescription(draggableId, tasks).id
    );
    const newColumn = {
      ...column,
      tasks: newTasks,
    };
    const newColumns = [...columns];
    const columnIndex = findColumnIndexByName(column.name, columns);

    newColumns[columnIndex] = newColumn;
    setColumns(newColumns);
  };

  const handleTaskMovementDifferentColumns = (
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string,
    startColumn: ColumnType,
    finishColumn: ColumnType
  ) => {
    const startTasks = [...startColumn.tasks];
    startTasks.splice(source.index, 1);

    const newColumnStart = {
      ...startColumn,
      tasks: startTasks,
    };
    const finishTasks = [...finishColumn.tasks];
    finishTasks.splice(
      destination.index,
      0,
      findTaskByDescription(draggableId, tasks).id
    );
    const newColumnFinish = {
      ...finishColumn,
      tasks: finishTasks,
    };
    const newColumns = [...columns];
    const startColumnIndex = findColumnIndexByName(startColumn.name, columns);
    const finishColumnIndex = findColumnIndexByName(finishColumn.name, columns);
    newColumns[startColumnIndex] = newColumnStart;
    newColumns[finishColumnIndex] = newColumnFinish;

    setColumns(newColumns);
  };

  const addTask = (column: number, newDescription: string) => {
    const newTaskId = tasks.length;
    const newTask = { id: newTaskId, description: newDescription };
    setTasks((currentTasks) => [...currentTasks, newTask]);
    const newColumns = [...columns];
    newColumns[column].tasks = [...newColumns[column].tasks, newTaskId];
    setColumns(newColumns);
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
                {columnsOrder.map((columnId, index) => (
                  <Column
                    key={columnId}
                    item={columnId}
                    index={index}
                    name={columns[columnId].name}
                    addTask={addTask}
                  >
                    {tasks
                      .filter((task) =>
                        columns[columnId].tasks.includes(task.id)
                      )
                      .map((task, idx) => (
                        <Task
                          key={task.description}
                          description={task.description}
                          sequence={idx}
                        />
                      ))}
                  </Column>
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
