type Task = {
  id: number;
  description: string;
};
type TasksArray = Task[];
type Column = {
  id: number;
  name: string;
  tasks: number[];
};
type ColumnsArray = Column[];
type ColumnsOrderArray = number[];

export { Task, TasksArray, Column, ColumnsArray, ColumnsOrderArray };
