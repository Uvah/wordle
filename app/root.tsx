import { ToastContainer, Slide } from "react-toastify";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";

import styles from "./app.css";
import toastifyStyle from "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

export const meta: MetaFunction = () => {
  return { title: "Wordle by UVAH" };
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: toastifyStyle },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <Meta />
        <link rel="icon" type="image/png" href="/assets/logo.svg"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600&display=swap"
          rel="stylesheet"
        ></link>
        <Links />
      </head>
      <noscript>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
          main, header { display: none; }
        `,
          }}
        ></style>
        <div className="flex justify-center items-center h-screen w-screen">
          You don't have javascript enabled. Please enable javascript to play
        </div>
      </noscript>
      <body className="bg-purple-900 text-white font-Raleway overflow-hidden">
        <Header />
        <main className="mt-16 max-w-7xl mx-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Slide}
          draggable
          limit={2}
          pauseOnHover
        />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
