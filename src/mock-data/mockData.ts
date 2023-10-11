import { Task, Column, ColumnsOrderArray } from "../types/kanban";

const mockTasks: Task[] = [
  {
    id: 0,
    description: "Análisis funcionalidad 2",
  },
  {
    id: 1,
    description: "Desarrollo funcionalidad 2",
  },
  {
    id: 2,
    description: "Pruebas funcionalidad 2",
  },
  {
    id: 3,
    description: "Implementación funcionalidad 1",
  },
  {
    id: 4,
    description: "Pruebas de Integración funcionalidad 1",
  },
  {
    id: 5,
    description: "Soporte funcionalidad 0",
  },
  {
    id: 6,
    description: "Desarrollo funcionalidad 0",
  },
  {
    id: 7,
    description: "Implementación funcionalidad 0",
  },
];

const mockColumns: Column[] = [
  { id: 0, name: "Sin realizar", tasks: [0, 1, 2] },
  { id: 1, name: "En proceso", tasks: [3, 4, 5] },
  { id: 2, name: "Realizado", tasks: [6, 7] },
];

const mockColumnsOrder: ColumnsOrderArray = [0, 1, 2];

export { mockTasks, mockColumns, mockColumnsOrder };
