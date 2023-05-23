import { FC } from "react";
import Row from "./Row";

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
    const collumnTotals: number[] = [];
    for (let i = 0; i < gameBoard.board.length; i++) {
      let total = 0;
      for (let j = 0; j < gameBoard.board.length; j++) {
        total += gameBoard.board[j][i];
      }
      collumnTotals.push(total);
    }
    return collumnTotals;
  };

  console.log(liveGameBoard);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {getCollumnTotals(gameBoard).map((total, i) => (
          <p key={i} style={{ margin: "0", padding: "0", width: "10px" }}>
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
  );
};

export default Board;
