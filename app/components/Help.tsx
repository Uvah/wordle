import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import Word from "./Word";

export default function Help({
  show = false,
  onHide,
}: {
  show: boolean;
  onHide?: () => void;
}) {
  console.log("show", show);
  return (
    <div className={`modal ${show ? "top-0" : ""} p-2 px-4`}>
      <div className="flex justify-between">
        <div></div>
        <div className="text-xl font-semibold uppercase">How To Play</div>
        <FaTimes
          className="text-2xl"
          onClick={() => {
            if (typeof onHide === "function") onHide();
          }}
        />
      </div>
      <div className="text-sm mt-4 border-b border-b-slate-600">
        <p className="mb-2">
          Guess the <strong>WORDLE</strong> in six tries.
        </p>
        <p className="mb-2">
          Each guess must be a valid five-letter word. Hit the enter button to
          submit.
        </p>
        <p className="mb-3">
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
      </div>
      <div className="py-4">
        <strong className="mb-4 block">Examples</strong>
        <Word
          wordData={{
            word: "hello",
            result: [2, -1, -1, -1, -1],
          }}
        />
        <p className="my-3 text-sm">
          The letter <strong>H</strong> is in the word and in the correct spot.
        </p>
        <Word
          wordData={{
            word: "world",
            result: [-1, 1, -1, -1, -1],
          }}
        />
        <p className="my-3 text-sm">
          The letter <strong>I</strong> is in the word but in the wrong spot.
        </p>
        <Word
          wordData={{
            word: "table",
            result: [-1, -1, -1, 0, -1],
          }}
        />
        <p className="my-3 text-sm">
          The letter <strong>L</strong> is not in the word in any spot.
        </p>
      </div>
    </div>
  );
}
