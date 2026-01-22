import Board from "../src/components/Board";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [size, setSize] = useState(3);
  const [reset, setReset] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center max-h-screen max-w-full bg-gray-900 ">
      <div className="flex gap-5 my-5">
        <Button
          className="cursor-pointer  hover:bg-blue-600 hover:text-white"
          onClick={() => setSize(3)}
        >
          {" "}
          3x3
        </Button>
        <Button
          className="cursor-pointer  hover:bg-blue-600 hover:text-white"
          onClick={() => setSize(4)}
        >
          {" "}
          4x4
        </Button>
        <Button
          className="cursor-pointer  hover:bg-blue-600 hover:text-white"
          onClick={() => setSize(5)}
        >
          {" "}
          5x5
        </Button>
      </div>
      <Button
        className="cursor-pointer  hover:bg-blue-600 hover:text-white"
        onClick={() => setReset((c) => c + 1)}
      >
        {" "}
        Reset Board
      </Button>
      <Board size={size} key={`${size} - ${reset}`} />
    </div>
  );
}

export default App;
