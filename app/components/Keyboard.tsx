import { FaBackspace } from "@react-icons/all-files/fa/FaBackspace";

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
export default function Keyboard() {
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
                className="bg-purple-800 shadow-lg uppercase h-12 sm:h-14 sm:min-w-[2.5rem] cursor-pointer rounded-sm flex items-center justify-center m-1 text-sm flex-1 select-none"
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
