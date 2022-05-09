import { CHARACTER_STATUS } from "~/constant";

export default function computeKeyboardState(
  attemptedList: WORDLE.wordList[]
): WORDLE.keyBoardState {
  const finalResult: WORDLE.keyBoardState = {};
  attemptedList.forEach((wordData) => {
    const { word, result = [] } = wordData;
    if (!result) return;
    for (let i = 0; i < word.length; i++) {
      /**
       * if not exist
       * if already has incorrect updating will have no effect or some upgrade
       * if result is correct then higher priority
       */
      if (
        !finalResult[word[i]] ||
        finalResult[word[i]] === CHARACTER_STATUS.INCORRECT ||
        result[i] === CHARACTER_STATUS.CORRECT
      ) {
        finalResult[word[i]] = result[i];
      }
    }
  });
  return finalResult;
}
