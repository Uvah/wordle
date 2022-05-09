import React from "react";
import { ActionFunction, json, LoaderFunction } from "remix";
import GameBoard from "~/components/GameBoard";
import Help from "~/components/Help";
import Keyboard from "~/components/Keyboard";
import Stats from "~/components/Stats";
import { MAX_TRIES, SHOW_HELP_KEY, WORD_LENGTH } from "~/constant";
import context from "~/context";
import checkWord from "~/helper/checkWord";
import computeStats from "~/helper/computeStats";
import isGameOver from "~/helper/isGameOver";
import selectWord from "~/helper/selectWord";
import useWordle from "~/hook/useWordle";
import { getSession, commitSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("w-uvah")) {
    // select word & set session
    selectWord(session);
  }
  return json(
    {},
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const newGame = body.get("new") === "true";
  if (!session.has("w-uvah") || newGame) {
    selectWord(session);
  }
  // new game set new word
  if (newGame) {
    return json(
      {
        success: true,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }
  const userInput = (body.get("word") as string)?.toLowerCase();
  const selectedWord = session.get("w-uvah").toLowerCase();
  const result = checkWord(userInput, selectedWord);
  let success = userInput === selectedWord;
  const jsonData: WORDLE.APIResponse = {
    data: result,
    success,
  };
  let tries = 0;
  if (typeof body.get("payload") === "string") {
    tries = Number(body.get("payload")?.slice(0, 1));
    if (!isNaN(tries) && tries === MAX_TRIES) {
      jsonData.answer = session.get("w-uvah");
    }
  }
  // compute Stats & update response
  computeStats(session, jsonData, tries);
  return json(jsonData, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Index() {
  const { actionData, setActionData }: WORDLE.AppContext =
    React.useContext(context);

  const { gameData, takeInput, makeAttempt, undoInput, statsData, startNewGame } =
    useWordle(WORD_LENGTH);

  const hideHelp = React.useCallback(() => {
    setActionData("help", false);
    localStorage.setItem(SHOW_HELP_KEY, "true");
  }, []);

  const hideStats = React.useCallback(() => {
    setActionData("stats", false);
  }, []);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        return;
      }
      if (key.length === 1 && key >= "a" && key <= "z") {
        takeInput(e.key);
      } else if (key === "enter") {
        makeAttempt();
      } else if (key === "backspace") {
        undoInput();
      } else if (key === "escape") {
        hideHelp();
        hideStats();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [makeAttempt]);

  React.useEffect(() => {
    if (isGameOver(gameData?.wordList)) {
      setActionData("stats", true);
    }
  }, [gameData]);

  React.useEffect(() => {
    if (localStorage.getItem(SHOW_HELP_KEY)) {
      hideHelp();
    } else {
      setActionData("help", true);
    }
  }, [hideHelp]);

  return (
    <>
      <div className="container m-auto w-full flex items-center justify-center h-[calc(100%-12rem)] flex-col">
        <GameBoard wordData={gameData.wordList} wordLength={WORD_LENGTH} />
        <Keyboard state={gameData.keyboardState} />
      </div>
      <Help show={actionData.help} onHide={hideHelp} />
      <Stats show={actionData.stats} data={statsData} onHide={hideStats} startNewGame={startNewGame} />
    </>
  );
}
