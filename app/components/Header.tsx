import { FaQuestion } from "@react-icons/all-files/fa/FaQuestion";
import React from "react";
import Help from "./Help";
export default function Header() {
  // TODO only first time user
  const [showHelp, setHelpState] = React.useState(true);
  return (
    <>
      <header className="h-11 sm:h-16 py-2 px-6 fixed w-screen top-0 shadow-sm shadow-purple-800">
        <nav className="flex justify-between items-center h-full max-w-7xl m-auto">
          <div className="h-full">
            <img className="h-full" src="/assets/logo.svg" alt="Uvah.tech" />
          </div>
          <div className="text-2xl sm:text-4xl">
            Wordle <span className="text-[10px]">by UVAH</span>
          </div>
          <div>
            <FaQuestion
              onClick={() => setHelpState(true)}
              className="text-xl sm:text-2xl cursor-pointer"
            />
          </div>
        </nav>
      </header>
      <Help show={showHelp} onHide={() => setHelpState(false)} />
    </>
  );
}
