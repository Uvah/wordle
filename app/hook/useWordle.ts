import React from "react";
import { toast } from "react-toastify";

export const MAX_TRIES = 6;

/**
 * TODO Integrate api
 * @param word
 * @returns
 */
const checkWord = (word: string) =>
  new Promise((resolve) => {
    if (word === "hello") {
      return resolve(true);
    }
    Math.random() > 0.5
      ? resolve("invalid")
      : resolve(
          [...new Array(word.length)].map(() => Math.floor(Math.random() * 3))
        ); // WORD_POSITION
  });

export default function useWordle(wordLength = 5) {
  const [userAttemptList, updateList] = React.useState<WORDLE.wordList[]>([]);
  /**
   * maintain active Input
   */
  const [activeInput, setInput] = React.useState<string>("");
  /**
   * OUTPUT list exposed outside
   */
  const [output, setOutput] = React.useState<WORDLE.wordList[]>([]);

  React.useEffect(() => {
    const out = [...userAttemptList, { word: activeInput }];
    if (out.length < MAX_TRIES) {
      out.push(
        ...[...new Array(MAX_TRIES - out.length)].map(() => ({ word: "" }))
      );
    }
    setOutput(out);
  }, [activeInput, userAttemptList]);

  const takeInput = React.useCallback((char: string) => {
    setInput((word) => {
      if (word.length >= wordLength) {
        return word;
      }
      return `${word}${char}`.toUpperCase();
    });
  }, []);

  const makeAttempt = React.useCallback(() => {
    if (userAttemptList.length + 1 >= MAX_TRIES) {
      return;
    }
    if (activeInput.length === wordLength) {
      // make API call to check
      checkWord(activeInput).then((result) => {
        if (result === "invalid") {
          toast("Not in word list", { className: "mt-2 text-lg text-center" });
          return;
        } else {
          setInput("");
          if (result === true) {
            // assert for true only
            // TODO success
          } else if (Array.isArray(result)) {
            updateList((list) => [
              ...list,
              {
                word: activeInput,
                result: result,
              },
            ]);
          }
        }
      });
    } else {
      // throw alert
      toast("Not enough letters", { className: "mt-2 text-lg text-center" });
    }
  }, [activeInput]);

  const undoInput = React.useCallback(() => {
    setInput((word) => word.slice(0, word.length - 1));
  }, []);

  React.useEffect(() => {
    console.info(activeInput);
  }, [activeInput]);

  return {
    takeInput,
    makeAttempt,
    undoInput,
    inputData: output,
  };
}
