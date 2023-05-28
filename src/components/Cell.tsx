import React, { FC, useState, useEffect } from "react";

interface CellProps {
  setLiveGameBoard?: React.Dispatch<React.SetStateAction<GameBoard>>;
  liveGameBoard: number[];
  rowNumber: number;
  cellNumber: number;
}

const Cell: FC<CellProps> = ({
  setLiveGameBoard,
  rowNumber,
  cellNumber,
  liveGameBoard,
}) => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#fff");
  const [activeCell, setActiveCell] = useState(false);
  const colors = [
    "#fff",
    "#000",
    "#f00",
    "#0f0",
    "#00f",
    "#ff0",
    "#f0f",
    "#0ff",
  ];

  useEffect(() => {
    setColor(colors[liveGameBoard[cellNumber]]);
    setCount(liveGameBoard[cellNumber]);
  }, [liveGameBoard, rowNumber, cellNumber]);

  const handleClick = (count: number) => () => {
    setCount(count % colors.length);
    setColor(colors[count % colors.length]);
    setLiveGameBoard?.((prev) => {
      const newBoard = [...prev.board];
      newBoard[rowNumber][cellNumber] = count % colors.length;
      return { ...prev, board: newBoard };
    });
  };

  const handleMouseOver = (count: number) => () => {
    if (activeCell) {
      setCount(count % colors.length);
      setColor(colors[count % colors.length]);
      setLiveGameBoard?.((prev) => {
        const newBoard = [...prev.board];
        newBoard[rowNumber][cellNumber] = count % colors.length;
        return { ...prev, board: newBoard };
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    setActiveCell(true);
  };

  const handleMouseUp = () => {
    setActiveCell(false);
  };

  return (
    <button
      style={{
        width: "50px",
        height: "50px",
        border: "1px solid #55555555",
        textAlign: "center",
        padding: "0",
        borderRadius: "1px",
        backgroundColor: color,
        color: "#aaa",
      }}
      onMouseDown={handleClick(count + 1)}
      onMouseOver={handleMouseOver(count + 1)}
    >
      {count}
    </button>
  );
};

export default Cell;
