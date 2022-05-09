import Word from "./Word";

export default function GameBoard({
  wordData,
  wordLength = 5,
}: {
  wordData: WORDLE.wordList[];
  wordLength: number;
}) {
  return (
    <div id="gameBoard" className="mx-2 w-[85%] sm:m-auto max-w-xs sm:w-full ">
      {[...wordData].map((wordData, key) => (
        <Word
          key={`word-${key}`}
          wordData={wordData}
          wordLength={wordLength}
          id={key}
        />
      ))}
    </div>
  );
}
