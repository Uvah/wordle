import React from "react";
import GameBoard from "~/components/GameBoard";
import Keyboard from "~/components/Keyboard";
import useWordle from "~/hook/useWordle";

const WORD_LENGTH = 5;

export default function Index() {
  const { inputData, takeInput, makeAttempt, undoInput } =
    useWordle(WORD_LENGTH);
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.key === "Meta" ||
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "alt"
      ) {
        return;
      }
      if (key.length === 1 && key >= "a" && key <= "z") {
        takeInput(e.key);
      } else if (key === "enter") {
        makeAttempt();
      } else if (key === "backspace") {
        undoInput();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [makeAttempt]);
  return (
    <div className="container m-auto w-full flex items-center justify-center h-[calc(100%-12rem)] flex-col">
      <GameBoard inputData={inputData} wordLength={WORD_LENGTH} />
      <Keyboard />
    </div>
  );
}
