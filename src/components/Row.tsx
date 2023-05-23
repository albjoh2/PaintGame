import { FC } from "react";
import Cell from "./Cell";

interface RowProps {
  row: number[];
  rowNumber: number;
  liveGameBoard: number[];
  setLiveGameBoard?: React.Dispatch<React.SetStateAction<GameBoard>>;
}

const Row: FC<RowProps> = ({
  row,
  setLiveGameBoard,
  liveGameBoard,
  rowNumber,
}) => {
  const correctRowValue = row.reduce((total, number) => total + number, 0);
  const rowValue = liveGameBoard.reduce((total, number) => total + number, 0);

  return (
    <div>
      <p style={{ width: "25px", display: "inline-block", margin: "0" }}>
        {correctRowValue}
      </p>
      {row.map((_, i) => (
        <Cell
          key={i}
          rowNumber={rowNumber}
          cellNumber={i}
          setLiveGameBoard={setLiveGameBoard}
          liveGameBoard={liveGameBoard}
        />
      ))}
      <p style={{ width: "25px", display: "inline-block", margin: "0" }}>
        {rowValue}
      </p>
    </div>
  );
};

export default Row;
