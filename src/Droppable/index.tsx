// StrictModeDroppable.tsx
// Workaround to fix 'Unable to find draggable with id' in 'react-beautiful-dnd' library
import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};
export default StrictModeDroppable;
