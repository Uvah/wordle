import React from "react";
import { toast } from "react-toastify";
import { useFetcher } from "remix";
import {
  GAME_STATE,
  MAX_TRIES,
  SUCCESS_MESSAGE,
  USER_TRIES_LIST,
} from "~/constant";
import computeKeyboardState from "~/helper/computeKeyboardState";
import isGameOver from "~/helper/isGameOver";

export default function useWordle(wordLength = 5) {
  const submitAttempt = useFetcher();
  const newGameAction = useFetcher();
  const [statsData, setStatsData] = React.useState<WORDLE.UserStats>();
  const [userAttemptList, updateList] = React.useState<WORDLE.wordList[]>([]);

  const [gameState, setGameState] = React.useState<GAME_STATE>(GAME_STATE.INIT);

  /**
   * maintain active Input
   */
  const [activeInput, setInput] = React.useState<string>("");
  /**
   * OUTPUT list exposed outside
   */
  const [output, setOutput] = React.useState<WORDLE.AppOutput>({
    wordList: [],
    keyboardState: {},
  });

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
        {
          word: activeInput,
          payload: `${userAttemptList.length + 1}${window.btoa(
            JSON.stringify(userAttemptList)
          )}`,
        },
        {
          method: "post",
          action: `/?index`,
        }
      );
    } else {
      toast("Not enough letters", { className: "mt-2 text-lg text-center" });
    }
  }, [activeInput, gameState]);

  const undoInput = React.useCallback(() => {
    setInput((word) => word.slice(0, word.length - 1));
  }, []);

  const startNewGame = React.useCallback(() => {
    newGameAction.submit(
      {
        new: "true",
      },
      {
        method: "post",
        action: `/?index`,
      }
    );
  }, []);

  const resetGameState = React.useCallback(() => {
    updateList([]);
    setGameState(GAME_STATE.INIT);
    setInput("");
  }, []);

  React.useEffect(() => {
    if (newGameAction.type === "done") {
      const responseData = newGameAction.data?.success;
      if (responseData) {
        // reset game state;
        resetGameState();
      }
    }
  }, [newGameAction, resetGameState]);

  // update stats data to localstorage
  React.useEffect(() => {
    if (statsData) {
      localStorage.setItem("userStats", JSON.stringify(statsData || {}));
    }
    try {
      const data = JSON.parse(localStorage.getItem("userStats") || "");
      if (!statsData) {
        setStatsData(data);
      }
    } catch (e) {
      // e
    }
  }, [statsData]);

  // check if game is over based on data
  React.useEffect(() => {
    isGameOver(userAttemptList) ? setGameState(GAME_STATE.OVER) : null;
  }, [userAttemptList]);

  /** read localstorage to prefill old user tries */
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

  /** prepare output data format consumed by app */
  React.useEffect(() => {
    const out = [...userAttemptList, { word: activeInput }];
    if (out.length < MAX_TRIES) {
      out.push(
        ...[...new Array(MAX_TRIES - out.length)].map(() => ({ word: "" }))
      );
    }
    const gameData = {
      wordList: out.slice(0, MAX_TRIES),
      keyboardState: computeKeyboardState(out.slice(0, MAX_TRIES)),
    };
    setOutput(gameData);
    localStorage.setItem(USER_TRIES_LIST, JSON.stringify(userAttemptList));
  }, [activeInput, userAttemptList]);

  React.useEffect(() => {
    if (submitAttempt.type === "done") {
      const responseData = submitAttempt.data as WORDLE.APIResponse;
      const result = responseData?.data;
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
          setStatsData(responseData?.stats as WORDLE.UserStats);
          if (responseData?.success) {
            toast(SUCCESS_MESSAGE[userAttemptList.length], {
              className: "mt-2 text-lg text-center",
            });
          }
          if (responseData?.answer) {
            toast(responseData?.answer, {
              className: "mt-2 text-lg text-center",
              autoClose: 3000,
            });
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

  return {
    takeInput,
    makeAttempt,
    undoInput,
    gameData: output,
    statsData,
    startNewGame,
    gameState,
  };
}
