import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import classes from "./Header.module.scss";

export default function Header(): JSX.Element {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={classes.container}>
      <img src="/assets/logo.svg" alt="Logo Pod-Companion" />

      <p className={classes.title}>
        The best companion for your dish washing time!
      </p>

      <span className={classes.date}>{currentDate}</span>
    </header>
  );
}
