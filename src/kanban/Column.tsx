import { Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import Droppable from "../Droppable";
import { MdAddCircleOutline } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const Column = ({ item, index, children, name, addTask }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const inputRef = useRef(null);

  const focusOut = () => {
    if (newTaskDescription !== "") {
      addTask(item, newTaskDescription);
    }
    setIsAddingTask(false);
    setNewTaskDescription("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
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
            <div className="new-task">
              {isAddingTask ? (
                <input
                  ref={inputRef}
                  placeholder="Introduzca una descripción"
                  className="new-task-input"
                  onChange={(event) =>
                    setNewTaskDescription(event.target.value)
                  }
                  value={newTaskDescription}
                  onBlur={focusOut}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      focusOut();
                    }
                  }}
                />
              ) : (
                <div onClick={() => setIsAddingTask(true)}>
                  Añadir una tarea <MdAddCircleOutline />
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
