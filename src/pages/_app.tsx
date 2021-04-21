import "../styles/global.scss";

import Header from "../components/Header/Header";
import Player from "../components/Player/Player";

import classes from "../styles/app.module.scss";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  );
}

export default MyApp;
