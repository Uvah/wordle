const CHARACTER_STATUS = {
  0: "animate-flipX bg-zinc-800 border-zinc-900", // failed
  1: "animate-flipX bg-amber-500 border-amber-400", // incorrect position
  2: "animate-flipX bg-lime-700 border-lime-600", // correct position
};
export default function Word({
  wordData,
  wordLength = 5,
  id = "wordle",
}: {
  wordData: WORDLE.wordList;
  wordLength?: number;
  id?: string | number;
}) {
  const { word, result } = wordData || {};
  return (
    <div className="flex justify-start flex-nowrap w-full">
      {[...word, ...Array(wordLength)]
        .slice(0, wordLength)
        .map((char, charKey) => {
          const resultClass = Array.isArray(result)
            ? CHARACTER_STATUS[
                (result[charKey] || 0) as keyof typeof CHARACTER_STATUS
              ]
            : "";
          return (
            <div
              key={`${id}-char-${charKey}`}
              style={{
                animationDelay: resultClass ? `${charKey * 0.2}s` : "0",
              }}
              className={`character ${
                char && !resultClass ? "animate-pulse border-purple-300" : ""
              } ${resultClass ? resultClass : ""}`}
            >
              {char}
            </div>
          );
        })}
    </div>
  );
}
