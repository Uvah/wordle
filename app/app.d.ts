declare namespace WORDLE {
  export interface wordList {
    word: string;
    result?: number[];
  }

  export interface keyBoardState {
    [char: string]: number;
  }

  export interface AppOutput {
    wordList: wordList[];
    keyboardState: keyBoardState;
  }
}
