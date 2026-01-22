import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface TileProps {
  Size?: number;
}

const Tile = ({ Size = 3 }: TileProps) => {
  const boardSize: number = Size;
  const [turn, setTurn] = useState("X");
  const [tiles, setTiles] = useState<string[]>(
    Array(boardSize * boardSize).fill(null),
  );
  const [winnerr, setWinnerr] = useState<string | null>(null);
  function handleClick(index: number): void {
    if (tiles[index] === null && !winnerr) {
      const newTiles: string[] = [...tiles];
      newTiles[index] = turn;
      setTiles(newTiles);

      const winner = winCondition(newTiles);

      if (winner != null && winner != "Draw") {
        toast(`${winner} Has won!`);
        setWinnerr(winner);
        return;
      } else if (winner === "Draw") {
        toast(`It's a draw!`);
        setWinnerr(winner);
        return;
      }

      if (turn === "O") {
        setTurn("X");
      } else {
        setTurn("O");
      }
    }
  }
  function winCondition(tiles: string[]): string | null {
    //check rows
    for (let row = 0; row < boardSize; ++row) {
      const startIndex = row * boardSize;
      const winner = tiles[startIndex];
      if (winner === null) {
        continue;
      }
      let isWin = true;

      for (let col = 0; col < boardSize; col++) {
        const index = startIndex + col;
        if (winner != tiles[index]) {
          isWin = false;
          break;
        }
      }
      if (isWin) return winner;
    }

    //check cols
    for (let col = 0; col < boardSize; ++col) {
      const startIndex = col;
      const winner = tiles[startIndex];
      if (winner === null) {
        continue;
      }
      let isWin = true;
      for (let row = 0; row < boardSize; ++row) {
        const index = startIndex + row * boardSize;
        if (tiles[index] != winner) {
          isWin = false;
          break;
        }
      }
      if (isWin) return winner;
    }
    //check diagonal
    const mainDiagonal = tiles[0];
    if (mainDiagonal != null) {
      let isWin = true;
      for (let i = 0; i < boardSize; ++i) {
        const index = i * (boardSize + 1);
        if (tiles[index] != mainDiagonal) {
          isWin = false;
          break;
        }
      }
      if (isWin) return mainDiagonal;
    }

    //check anti diagonal
    const antiDiagonal = tiles[boardSize - 1];
    if (antiDiagonal != null) {
      let isWin = true;
      for (let i = 0; i < boardSize; ++i) {
        const index = boardSize - 1 + i * (boardSize - 1);
        if (tiles[index] != antiDiagonal) {
          isWin = false;
          break;
        }
      }
      if (isWin) return antiDiagonal;
    }
    //check for draw
    let isFull = true;
    for (let i = 0; i < tiles.length; ++i) {
      if (tiles[i] === null) {
        isFull = false;
      }
    }
    if (isFull) {
      return "Draw";
    }

    return null;
  }

  return (
    <>
      {" "}
      <Toaster />
      <div
        className="grid gap-2 w-full h-full overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
          width: "100%",
          height: "100%",
        }}
      >
        {tiles.map((tileValue, index) => {
          return (
            <div
              key={index}
              className="border-2 border-black flex  items-center justify-center text-3xl cursor-pointer hover:bg-gray-600 transition  min-h-0 min-w-0 rounded-2xl"
              onClick={() => handleClick(index)}
            >
              <p className="text-center text-white font-mono text-6xl">
                {tileValue}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tile;
