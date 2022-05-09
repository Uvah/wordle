import { Session } from "remix";

// this function will execute on every guess
export default function computeStats(
  session: Session,
  apiResponse: WORDLE.APIResponse,
  guessNumber: number
) {
  let stats: WORDLE.UserStats = {
    winPercentage: 0,
    maxStreak: 0,
    gamesWon: 0,
    gamesPlayed: 0,
    currentStreak: 0,
    averageGuesses: 0,
    totalGuesses: 0,
    guessesDistribution: {},
  };
  try {
    if (session.has("w-stats")) {
      stats = JSON.parse(session.get("w-stats"));
    }
  } catch (e) {
    //
  }

  stats.totalGuesses += 1;

  if (apiResponse.success) {
    stats.gamesWon += 1;
    stats.currentStreak += 1;
    if (!stats.guessesDistribution[guessNumber.toString()]) {
      stats.guessesDistribution[guessNumber.toString()] = 0;
    }
    stats.guessesDistribution[guessNumber.toString()] += 1;
  }
  if (apiResponse.answer) {
    // game over
    if (stats.maxStreak < stats.currentStreak) {
      stats.maxStreak = stats.currentStreak;
    }
    stats.currentStreak = 0;
  }
  /**
   * if api response has answer means its last try of user and end of game
   */
  if (apiResponse.answer || apiResponse.success) {
    stats.gamesPlayed += 1;
    stats.winPercentage = +((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(
      2
    );
  }
  stats.averageGuesses = +(stats.totalGuesses / stats.gamesPlayed).toFixed(2);
  apiResponse.stats = stats;
  session.set("w-stats", JSON.stringify(stats));
}
