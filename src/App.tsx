import "./App.css";
import { FC, useState } from "react";
import Board from "./components/Board";
import gameBoards from "./gameBoards.json";

const App: FC = () => {
  const [level, setLevel] = useState(1);

  const [gameBoard, setGameBoard] = useState<GameBoard>(
    gameBoards[`Level${level}` as keyof typeof gameBoards]
  );

  const [liveGameBoard, setLiveGameBoard] = useState<GameBoard>({
    name: "Live Game Board",
    board: Array.from({ length: gameBoard.board.length }, () =>
      Array.from({ length: gameBoard.board.length }, () => 0)
    ),
  });

  const handleClick = () => {
    if (
      JSON.stringify(liveGameBoard.board) !== JSON.stringify(gameBoard.board)
    ) {
      alert("It is not the correct solution. Try again.");
      return;
    }

    setLevel((prevLevel) => prevLevel + 1);
    const nextLevelBoard =
      gameBoards[`Level${level + 1}` as keyof typeof gameBoards];
    setGameBoard(nextLevelBoard);

    const resetBoard = Array.from({ length: nextLevelBoard.board.length }, () =>
      Array.from({ length: nextLevelBoard.board.length }, () => 0)
    );
    setLiveGameBoard({
      name: "Live Game Board",
      board: resetBoard,
    });
  };

  return (
    <div>
      <div>
        <h1>Click and paint</h1>
        <h2>
          Level: {level} - {gameBoard.name}:
        </h2>
        <Board
          gameBoard={gameBoard}
          liveGameBoard={liveGameBoard}
          setLiveGameBoard={setLiveGameBoard}
        />
        <button onClick={handleClick} style={{ margin: "20px" }}>
          Done
        </button>
      </div>
    </div>
  );
};

export default App;
