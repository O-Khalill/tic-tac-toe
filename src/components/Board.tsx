import Tile from "./Tile";

interface boardProps {
  size?: number;
  reset: boolean;
}

const Board = ({ size = 3 }: boardProps) => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-8 overflow-hidden">
      <div className="bg-blue-950 w-[90%] h-[90%] max-w-4xl rounded-3xl border-4 border-teal-400 flex flex-col items-center justify-center p-8 ">
        <div className="w-full h-full">
          <Tile Size={size} key={size} />
        </div>
      </div>
    </div>
  );
};

export default Board;
