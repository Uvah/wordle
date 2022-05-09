import React from "react";
import { ActionFunction, json, LoaderFunction } from "remix";
import GameBoard from "~/components/GameBoard";
import Keyboard from "~/components/Keyboard";
import checkWord from "~/helper/checkWord";
import selectWord from "~/helper/selectWord";
import useWordle from "~/hook/useWordle";
import { getSession, commitSession } from "~/session";

const WORD_LENGTH = 5;

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
  if (!session.has("w-uvah")) {
    selectWord(session);
  }
  const result = checkWord(
    (body.get("word") as string)?.toLowerCase(),
    session.get("w-uvah")
  );
  const jsonData = { data: result };
  return json(jsonData, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Index() {
  const { inputData, takeInput, makeAttempt, undoInput } =
    useWordle(WORD_LENGTH);
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
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [makeAttempt]);
  return (
    <div className="container m-auto w-full flex items-center justify-center h-[calc(100%-12rem)] flex-col">
      <GameBoard inputData={inputData} wordLength={WORD_LENGTH} />
      <Keyboard />
    </div>
  );
}
