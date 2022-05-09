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

  export interface APIResponse {
    data: number[] | "invalid";
    success: boolean;
    answer?: string;
    stats?: UserStats;
  }

  export interface UserStats {
    winPercentage: number;
    maxStreak: number;
    gamesWon: number;
    gamesPlayed: number;
    currentStreak: number;
    averageGuesses: number;
    totalGuesses: number;
    guessesDistribution: { [x: string]: number };
  }

  export interface AppContext {
    actionData: { help: boolean; stats: boolean };
    setActionData: (key: keyof AppContext["actionData"], data: any) => void;
  }
}
