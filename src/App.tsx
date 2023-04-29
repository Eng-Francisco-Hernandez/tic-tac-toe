import Board from "./components/Board";
import "./App.scss";
import { useRef, useState } from "react";

function App() {
  const [N, setN] = useState(3);

  const nInputRef = useRef(null);

  const handleSetNk = () => {
    const newValue = parseInt((nInputRef?.current! as any).value.trim());
    if (isNaN(newValue)) return;
    setN(newValue);
  };

  return (
    <div className="board-layout">
      <div>
        <div className="board-container mb-5">
          <input
            placeholder="Enter a board size"
            ref={nInputRef}
            className="mr-5"
          />
          <button onClick={handleSetNk}>Create</button>
        </div>
        <div className="board-container min-values">
          <div>
            <Board N={N} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
