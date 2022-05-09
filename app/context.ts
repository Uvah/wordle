import { Context, createContext } from "react";

const context: Context<WORDLE.AppContext> = createContext(
  {}
) as unknown as Context<WORDLE.AppContext>;
export default context;
