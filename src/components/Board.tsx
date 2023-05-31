import { FC, useEffect, useState } from "react";
import Row from "./Row";
import WhatsLeft from "./WhatsLeft";

interface BoardProps {
  gameBoard: GameBoard;
  liveGameBoard: GameBoard;
  setLiveGameBoard?: React.Dispatch<React.SetStateAction<GameBoard>>;
}

const Board: FC<BoardProps> = ({
  gameBoard,
  liveGameBoard,
  setLiveGameBoard,
}) => {
  const getCollumnTotals = (gameBoard: GameBoard) => {
    const columnTotals: number[] = [];
    for (let i = 0; i < gameBoard.board.length; i++) {
      let total = 0;
      for (let j = 0; j < gameBoard.board.length; j++) {
        total += gameBoard.board[j][i];
      }
      columnTotals.push(total);
    }
    return columnTotals;
  };

  const [correctColumns, setCorrectColumns] = useState<number[]>([]);

  useEffect(() => {
    const newCorrectColumns: number[] = [];
    for (let i = 0; i < gameBoard.board.length; i++) {
      const column = gameBoard.board.map((row) => row[i]);
      const liveColumn = liveGameBoard.board.map((row) => row[i]);
      if (JSON.stringify(column) === JSON.stringify(liveColumn)) {
        newCorrectColumns.push(i);
      }
    }
    setCorrectColumns(newCorrectColumns);
  }, [gameBoard, liveGameBoard]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {getCollumnTotals(gameBoard).map((total, i) => (
            <p
              key={i}
              className={
                correctColumns.includes(i) ? "correct-row" : "default-row"
              }
              style={{ margin: "0", padding: "0", width: "10px" }}
            >
              {total}
            </p>
          ))}
        </div>
        <div>
          {gameBoard.board.map((row, i) => (
            <Row
              key={i}
              rowNumber={i}
              row={row}
              liveGameBoard={liveGameBoard.board[i]}
              setLiveGameBoard={setLiveGameBoard}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {getCollumnTotals(liveGameBoard).map((total, i) => (
            <p
              key={i}
              className={
                correctColumns.includes(i) ? "correct-row" : "default-row"
              }
              style={{
                margin: "0",
                padding: "0",
                width: "10px",
              }}
            >
              {total}
            </p>
          ))}
        </div>
      </div>
      <WhatsLeft gameBoard={gameBoard} liveGameBoard={liveGameBoard} />
    </div>
  );
};

export default Board;
