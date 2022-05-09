import { CHARACTER_STATUS } from "~/constant";
import wordList from "~/data/wordList";

export default function checkWord(
  given: string,
  expected: string
): number[] | "invalid" {
  if (wordList.indexOf(given) === -1) {
    return "invalid";
  }
  console.log("expected", expected);
  const result: number[] = [];
  const temp: string[] = [];
  for (let i = 0; i < expected.length; i++) {
    result[i] =
      given[i] === expected[i]
        ? CHARACTER_STATUS.CORRECT
        : CHARACTER_STATUS.INCORRECT;
    if (result[i] === CHARACTER_STATUS.INCORRECT) {
      temp.push(expected[i]);
    }
  }
  for (let index in result) {
    if (result[index] === CHARACTER_STATUS.INCORRECT) {
      // now check for incorrect position
      const position = temp.indexOf(given[index]);
      if (position > -1) {
        result[index] = CHARACTER_STATUS.INCORRECT_POSITION;
        temp[index] = "-1"; // invalid character
      }
    }
  }
  return result;
}
