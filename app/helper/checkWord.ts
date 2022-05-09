import wordList from "~/data/wordList";
enum CHARACTER_STATUS {
  INCORRECT,
  INCORRECT_POSITION,
  CORRECT,
}

export default function checkWord(
  given: string,
  expected: string
): number[] | "invalid" | true {
  if (wordList.indexOf(given) === -1) {
    return "invalid";
  }
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
