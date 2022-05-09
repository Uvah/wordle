import Word from "./Word";

export default function GameBoard({
  wordData,
  wordLength = 5,
  style,
}: {
  wordData: WORDLE.wordList[];
  wordLength: number;
  style: any;
}) {
  return (
    <div
      id="gameBoard"
      className="mx-2 sm:m-auto max-w-xs lg:max-w-sm sm:w-full h-auto flex flex-col justify-center fixed top-[4rem]"
      style={style}
    >
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
