import type { AppProps } from "next/app";
import "../styles/global.scss";

import Header from "../components/Header/Header";
import Player from "../components/Player/Player";
import { PlayerContext } from "../contexts/PlayerContext";

import classes from "../styles/app.module.scss";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <PlayerContext.Provider value={{}}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </PlayerContext.Provider>
    </div>
  );
}
