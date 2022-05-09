import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import React from "react";
import { MAX_TRIES } from "~/constant";

type distributionDataType = { width: number; count: number }[];

export default function Stats({
  show,
  data,
  onHide,
  startNewGame,
}: {
  show: boolean;
  data: WORDLE.UserStats | undefined;
  onHide: () => void;
  startNewGame: () => void;
}) {
  const divRef = React.useRef<HTMLDivElement | null>();
  React.useEffect(() => {
    if (typeof onHide === "function") {
      function handleOutsideClick(event: MouseEvent) {
        const modalRef = divRef.current;
        if (
          show &&
          event.target !== modalRef &&
          !modalRef?.contains(event.target as Node)
        ) {
          onHide();
        }
      }
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [onHide, show]);

  const [statsData, setData] = React.useState<
    { value: number; label: string }[]
  >([]);

  const [distributionData, setDistributionData] =
    React.useState<distributionDataType>([]);

  React.useEffect(() => {
    setData([
      {
        value: data?.gamesPlayed || 0 as number,
        label: "Played",
      },
      {
        value: data?.winPercentage || 0 as number,
        label: "Win %",
      },
      {
        value: data?.currentStreak || 0 as number,
        label: "Current Streak",
      },
      {
        value: data?.maxStreak || 0 as number,
        label: "Max Streak",
      },
    ]);
    let maxWinBasedOnGuessDistribution: number = 0;
    for (let i = 0; i < MAX_TRIES; i++) {
      const winRate = data?.guessesDistribution[i + 1];
      if (winRate && winRate > maxWinBasedOnGuessDistribution) {
        maxWinBasedOnGuessDistribution = winRate;
      }
    }
    const finalDistributionPercentage: distributionDataType = [];
    for (let i = 0; i < MAX_TRIES; i++) {
      const winRate = data?.guessesDistribution[i + 1] || 0;
      finalDistributionPercentage.push({
        width: winRate ? (winRate / maxWinBasedOnGuessDistribution) * 100 : 8,
        count: winRate,
      });
    }
    setDistributionData(finalDistributionPercentage);
  }, [data]);

  return (
    <div
      ref={(ref) => {
        divRef.current = ref;
      }}
      className={`modal ${
        show ? "top-0 bottom-0" : ""
      } p-2 px-4 h-3/6 min-h-[28rem]`}
    >
      <div className="flex justify-between">
        <div></div>
        <div className="text-xl font-semibold uppercase mt-2">STATISTICS</div>
        <FaTimes
          className="text-2xl cursor-pointer"
          onClick={() => {
            if (typeof onHide === "function") onHide();
          }}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-center sm:w-2/3 my-4">
          {statsData.map((stats) => (
            <div className="flex flex-col items-center mx-2 text-center">
              <div className="text-2xl font-semibold">{stats.value}</div>
              <div className="text-xs">{stats.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-9/12">
          <div className="uppercase text-center mb-2">Guess distribution</div>
          {distributionData.map(({ width, count }, index) => {
            return (
              <div className="flex my-1">
                <div className="w-[20px]">{index + 1}</div>
                <div className="w-full">
                  <div
                    className="bg-gray-600 text-right pr-2 font-bold"
                    style={{
                      width: `${width}%`,
                    }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-2">
          <button
            onClick={() => {
              startNewGame();
              onHide();
            }}
            className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
