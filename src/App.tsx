import "./App.css";
import Board from "./kanban";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <a
        href="https://github.com/FedericoUrones/drag-and-drop-kanban"
        target="_blank"
        className="signature"
      >
        by Federico Urones
      </a>
      <h1>Drag and Drop Kanban!</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Board />
      </div>
    </div>
  );
}

export default App;
