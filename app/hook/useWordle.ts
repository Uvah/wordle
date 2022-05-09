import React from "react";
import { toast } from "react-toastify";
import { useFetcher } from "remix";

export const MAX_TRIES = 6;

enum GAME_STATE {
  INIT,
  OVER,
}

const USER_TRIES_LIST = "userAttemptList";

export default function useWordle(wordLength = 5) {
  const submitAttempt = useFetcher();
  const [userAttemptList, updateList] = React.useState<WORDLE.wordList[]>([]);

  const [gameState, setGameState] = React.useState<GAME_STATE>(GAME_STATE.INIT);

  /**
   * maintain active Input
   */
  const [activeInput, setInput] = React.useState<string>("");
  /**
   * OUTPUT list exposed outside
   */
  const [output, setOutput] = React.useState<
    Array<WORDLE.wordList & { keyboard?: { [char: string]: number } }>
  >([]);

  React.useEffect(() => {
    try {
      if (localStorage.getItem(USER_TRIES_LIST)) {
        const data = JSON.parse(
          localStorage.getItem(USER_TRIES_LIST) || ""
        ) as WORDLE.wordList[];
        updateList(data);
      }
    } catch (e) {
      //
    }
  }, []);

  React.useEffect(() => {
    const out = [...userAttemptList, { word: activeInput }];
    if (out.length < MAX_TRIES) {
      out.push(
        ...[...new Array(MAX_TRIES - out.length)].map(() => ({ word: "" }))
      );
    } else {
      setGameState(GAME_STATE.OVER);
    }
    setOutput(out.slice(0, MAX_TRIES));
    localStorage.setItem(USER_TRIES_LIST, JSON.stringify(userAttemptList));
  }, [activeInput, userAttemptList]);

  React.useEffect(() => {
    if (submitAttempt.type === "done") {
      const result = submitAttempt.data?.data;
      if (result === "invalid") {
        toast("Not in word list", { className: "mt-2 text-lg text-center" });
        return;
      } else {
        setInput("");
        if (Array.isArray(result)) {
          updateList((list) => [
            ...list,
            {
              word: activeInput,
              result: result,
            },
          ]);
          const set = new Set(result);
          if (set.has(2) && set.size === 1) {
            // success
            setGameState(GAME_STATE.OVER);
          }
        } else {
          toast("Something went wrong", {
            className: "mt-2 text-lg text-center",
            type: "error",
          });
        }
      }
    }
  }, [submitAttempt]);

  const takeInput = React.useCallback(
    (char: string) => {
      if (gameState === GAME_STATE.OVER) return;
      setInput((word) => {
        if (word.length >= wordLength) {
          return word;
        }
        return `${word}${char}`.toUpperCase();
      });
    },
    [gameState]
  );

  const makeAttempt = React.useCallback(() => {
    if (
      userAttemptList.length + 1 > MAX_TRIES ||
      gameState === GAME_STATE.OVER
    ) {
      return;
    }
    if (activeInput.length === wordLength) {
      submitAttempt.submit(
        { word: activeInput },
        {
          method: "post",
          action: `/?index`,
        }
      );
      // make API call to check
      // checkWord(activeInput).then((result) => {

      // });
    } else {
      // throw alert
      toast("Not enough letters", { className: "mt-2 text-lg text-center" });
    }
  }, [activeInput, gameState]);

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
