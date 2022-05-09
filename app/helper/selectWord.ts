import type { Session } from "remix";
import wordList from "~/data/wordList";

export default function selectWord(session: Session) {
  const usedData = session.get("x-word");
  let data = [];
  try {
    if (usedData) {
      data = JSON.parse(usedData);
    }
  } catch (e) {
    // e
  }
  let selectedWordIndex;
  for (;;) {
    selectedWordIndex = Math.floor(Math.random() * wordList.length);
    if (data.indexOf(selectedWordIndex) === -1) {
      break;
    }
  }
  session.set("x-word", JSON.stringify([...data, selectedWordIndex]));
  session.set("w-uvah", wordList[selectedWordIndex]);
}
