import { MAX_TRIES } from "~/constant";

export default function isGameOver(list: WORDLE.wordList[] = []) {
  const wordList = list.filter((x) => x.word && x.result);
  const lastAttempt = wordList[wordList.length - 1];
  if (!lastAttempt) return;
  const set = new Set(lastAttempt.result);
  if ((set.has(2) && set.size === 1) || wordList.length === MAX_TRIES) {
    // success/over
    return true;
  }
  return false;
}
