import "./Board.scss";
import { useEffect, useState } from "react";

export default function Board({ N }: { N: number }) {
  const [board, setBoard] = useState<Array<Array<string | null>>>([]);
  const [currentSymbol, setCurrentSymbol] = useState("X");
  const [winnerSymbol, setWinnerSymbol] = useState("");
  const [turnsLeft, setTurnsLeft] = useState(N * N);

  const setInitialBoard = () => {
    const newBoard: Array<Array<string | null>> = [];
    for (let i = 0; i < N; i++) {
      newBoard.push([]);
      for (let j = 0; j < N; j++) {
        newBoard[i][j] = null;
      }
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    setInitialBoard();
  }, [N]);

  const handleTurn = (a: number, b: number) => {
    setBoard((prevBoard) => {
      const newBoard: Array<Array<string | null>> = [];
      for (let i = 0; i < N; i++) {
        newBoard.push([]);
        for (let j = 0; j < N; j++) {
          if (a === i && b === j) {
            newBoard[i][j] = currentSymbol;
          } else {
            newBoard[i][j] = prevBoard[i][j];
          }
        }
      }
      checkForAWinner(newBoard);
      return newBoard;
    });
    setCurrentSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));
    setTurnsLeft((prevVal) => prevVal - 1);
  };

  const checkForAWinner = (newBoard: Array<Array<string | null>>) => {
    checkWinnerInRows(newBoard);
    checkWinnerInColumns(newBoard);
    checkWinnerInDiagonalLeft(newBoard);
    checkWinnerInDiagonalRight(newBoard);
  };

  const checkWinnerInRows = (newBoard: Array<Array<string | null>>) => {
    for (let i = 0; i < N; i++) {
      let winner = true;
      let prevSymbol = newBoard[i][0];
      for (let j = 0; j < N; j++) {
        if (!newBoard[i][j]) {
          winner = false;
          break;
        }
        if (!(prevSymbol === newBoard[i][j])) winner = false;
      }
      if (winner) {
        setWinnerSymbol(prevSymbol!);
        break;
      }
    }
  };

  const checkWinnerInColumns = (newBoard: Array<Array<string | null>>) => {
    for (let i = 0; i < N; i++) {
      let winner = true;
      let prevSymbol = board[0][i];
      for (let j = 0; j < N; j++) {
        if (!newBoard[j][i]) {
          winner = false;
          break;
        }
        if (!(prevSymbol === newBoard[j][i])) winner = false;
      }
      if (winner) {
        setWinnerSymbol(prevSymbol!);
        break;
      }
    }
  };

  const checkWinnerInDiagonalLeft = (newBoard: Array<Array<string | null>>) => {
    let winner = true;
    let prevSymbol = newBoard[0][0];
    for (let i = 0; i < N; i++) {
      if (!newBoard[i][i]) {
        winner = false;
        break;
      }
      if (!(prevSymbol === newBoard[i][i])) winner = false;
    }
    if (winner) {
      setWinnerSymbol(prevSymbol!);
    }
  };

  const checkWinnerInDiagonalRight = (
    newBoard: Array<Array<string | null>>
  ) => {
    let winner = true;
    let prevSymbol = newBoard[0][newBoard.length - 1];
    for (let i = newBoard.length - 1; i >= 0; i--) {
      if (!newBoard[newBoard.length - 1 - i][i]) {
        winner = false;
        break;
      }
      if (!(prevSymbol === newBoard[newBoard.length - 1 - i][i]))
        winner = false;
    }
    if (winner) {
      setWinnerSymbol(prevSymbol!);
    }
  };

  const handleReset = () => {
    setInitialBoard();
    setCurrentSymbol("X");
    setWinnerSymbol("");
    setTurnsLeft(N * N);
  };

  return (
    <>
      {board.map((row, i) => {
        return (
          <div key={i} className="row-container">
            {board.map((col, j) => {
              return (
                <div
                  key={j}
                  onClick={
                    board[i][j] === null && winnerSymbol.trim() === ""
                      ? () => handleTurn(i, j)
                      : undefined
                  }
                  className={`board-cell ${
                    board[i][j] === null && winnerSymbol.trim() === ""
                      ? ""
                      : "not-allowed"
                  }`}
                >
                  {board[i][j]}
                </div>
              );
            })}
            <br />
          </div>
        );
      })}
      {winnerSymbol.trim() !== "" || turnsLeft === 0 ? (
        <div className="results-container mt-5">
          <div className="board-info-container mb-5">
            {turnsLeft === 0 ? "Game tied" : `The winner is: ${winnerSymbol}`}
          </div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <div className="board-info-container mt-15">
          Current turn: "{currentSymbol}"
        </div>
      )}
    </>
  );
}
