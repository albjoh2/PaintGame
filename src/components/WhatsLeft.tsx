import { FC, useEffect, useState } from "react";

interface WhatsLeftProps {
  gameBoard: GameBoard;
  liveGameBoard: GameBoard;
}

const WhatsLeft: FC<WhatsLeftProps> = ({ gameBoard, liveGameBoard }) => {
  const [colorsLeft, setColorsLeft] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
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
  const colorsLeftCount = () => {
    const colorsLeft: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < gameBoard.board.length; j++) {
        colorsLeft[gameBoard.board[i][j]]++;
        colorsLeft[liveGameBoard.board[i][j]]--;
      }
    }
    return colorsLeft;
  };

  useEffect(() => {
    setColorsLeft(colorsLeftCount());
    console.log(colorsLeft);
  }, [liveGameBoard]);

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        right: "5%",
      }}
    >
      {colorsLeft.map((color, i) => (
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <div
            key={i}
            style={{
              backgroundColor: `${colors[i]}`,
              border: "1px solid black",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <p
            style={{
              margin: "0",
              color: "black",
              width: "50px",
              textAlign: "left",
            }}
          >
            = {color}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WhatsLeft;
