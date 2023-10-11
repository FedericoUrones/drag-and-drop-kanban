import { Draggable } from "react-beautiful-dnd";
import Droppable from "../Droppable";
import { MdAddCircleOutline } from "react-icons/md";
import { ReactNode, useEffect, useRef, useState } from "react";

const Column = ({
  item,
  index,
  children,
  name,
  addTask,
}: {
  item: number;
  index: number;
  children: ReactNode;
  name: string;
  addTask: (item: number, newTaskDescription: string) => void;
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const inputRef = useRef<null | HTMLInputElement>(null);

  const focusOut = () => {
    if (newTaskDescription !== "") {
      addTask(item, newTaskDescription);
    }
    setIsAddingTask(false);
    setNewTaskDescription("");
  };

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(target as Node)) {
        focusOut();
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <>
      <Draggable key={item} draggableId={name} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="column"
          >
            <h2>{name}</h2>
            <Droppable droppableId={name}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {children}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {isAddingTask ? (
              <input
                type="text"
                ref={inputRef}
                placeholder="Introduzca una descripción"
                className="new-task-input"
                onChange={(event) => setNewTaskDescription(event.target.value)}
                value={newTaskDescription}
                onBlur={focusOut}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    focusOut();
                  }
                }}
              />
            ) : (
              <div
                onClick={() => setIsAddingTask(true)}
                className="new-task-wrapper"
              >
                <div>Añadir una tarea</div> <MdAddCircleOutline />
              </div>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
