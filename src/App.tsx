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
      <h1>Drag and Drop Kanvan!</h1>
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
