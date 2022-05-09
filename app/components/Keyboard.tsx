import { FaBackspace } from "@react-icons/all-files/fa/FaBackspace";

const CHARACTER_STATUS = {
  0: "bg-stone-600 border-stone-500", // failed
  1: "bg-amber-500 border-amber-400", // incorrect position
  2: "bg-lime-700 border-lime-600", // correct position
};

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  [
    "enter",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    <FaBackspace className="text-lg sm:mx-3" />,
  ],
];
export default function Keyboard({
  state = {},
}: {
  state: WORDLE.keyBoardState;
}) {
  return (
    <div className="h-44 sm:h-48 w-full max-w-xl fixed bottom-0" id="keyboard">
      {keyboardKeys.map((rowKeys, rowIndex) => (
        <div
          key={`keyboard-${rowIndex}`}
          className={`flex justify-center w-full flex-nowrap ${
            rowIndex === 1 ? "w-[90%] m-auto" : ""
          }`}
        >
          {rowKeys.map((key) => {
            let stateClass: string = "";
            if (typeof key === "string") {
              stateClass =
                CHARACTER_STATUS[
                  state[key.toUpperCase()] as keyof typeof CHARACTER_STATUS
                ] || "";
            }
            return (
              <button
                onClick={() => {
                  let triggerKey = key as string;
                  if (typeof key !== "string") {
                    triggerKey = "backspace";
                  }
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: triggerKey })
                  );
                }}
                key={`keyboard-${rowIndex}-${key}`}
                type="button"
                className={`keyboard-key ${stateClass}`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
