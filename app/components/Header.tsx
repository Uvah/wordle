import { FaQuestion } from "@react-icons/all-files/fa/FaQuestion";

export default function Header({
  setData,
}: {
  setData: (key: string, value: any) => void;
}) {
  return (
    <>
      <header className="h-11 sm:h-16 py-2 px-6 fixed w-screen top-0 shadow-sm shadow-purple-800">
        <nav className="flex justify-between items-center h-full max-w-7xl m-auto">
          <div className="h-full">
            <img className="h-full" src="/assets/logo.svg" alt="Uvah.tech" />
          </div>
          <div className="text-2xl sm:text-4xl">
            Wordle{" "}
            <a
              href="https://uvah.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px]"
            >
              by UVAH
            </a>
          </div>
          <div className="flex">
            <svg
              onClick={() => {
                setData("stats", true);
              }}
              role="button"
              className="fill-current mr-3"
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <rect fill="none" height="24" width="24" />
              <g>
                <path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z" />
              </g>
            </svg>
            <FaQuestion
              role="button"
              onClick={() => {
                setData("help", true);
              }}
              className="text-xl sm:text-2xl cursor-pointer"
            />
          </div>
        </nav>
      </header>
    </>
  );
}
