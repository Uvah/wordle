const CHARACTER_STATUS = {
  0: "bg-stone-600 border-stone-500", // failed
  1: "bg-amber-500 border-amber-400", // incorrect position
  2: "bg-lime-700 border-lime-600", // correct position
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
        .map((char, charKey) => (
          <div
            key={`${id}-char-${charKey}`}
            className={`uppercase border border-purple-800 w-full min-h-[2rem] aspect-square sm:max-w-[4rem] flex justify-center items-center text-3xl font-semibold m-1 select-none ${
              char ? "animate-pulse border-purple-300" : ""
            } ${
              Array.isArray(result) &&
              CHARACTER_STATUS[
                (result[charKey] || 0) as keyof typeof CHARACTER_STATUS
              ]
            }`}
          >
            {char}
          </div>
        ))}
    </div>
  );
}
