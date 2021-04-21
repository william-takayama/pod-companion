import cn from "clsx";
import classes from "./Player.module.scss";

export default function Player(): JSX.Element {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <img src="/assets/playing.svg" alt="Playing now" />
        <strong className={classes.title}>Playing now</strong>
      </header>

      <div className={classes.emptyPlayer}>
        <strong>
          Select a podcast <br />
          to listen
        </strong>
      </div>

      <footer
        className={cn(classes.footer, {
          [classes.empty]: true,
        })}
      >
        <div className={classes.progress}>
          <span>00:00</span>
          <div className={classes.slider}>
            <div className={classes.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={classes.controls}>
          <button type="button">
            <img src="/assets/shuffle.svg" alt="Shuffle" />
          </button>

          <button type="button">
            <img src="/assets/play-previous.svg" alt="Previous" />
          </button>

          <button type="button" className={classes.playButton}>
            <img src="/assets/play.svg" alt="Play" />
          </button>

          <button type="button">
            <img src="/assets/play-next.svg" alt="Play Next" />
          </button>

          <button type="button">
            <img src="/assets/repeat.svg" alt="Repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
}
