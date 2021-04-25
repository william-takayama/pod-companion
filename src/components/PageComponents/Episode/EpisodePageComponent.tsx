import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { EpisodePageProps } from "../../../pages/episodes/[slug]";
import classes from "./EpisodePageComponent.module.scss";

export function EpisodePageComponent({ episode }: EpisodePageProps) {
  return (
    <div className={classes.episode}>
      <div className={classes.thumbnail}>
        <Link href="/">
          <motion.button
            whileHover={{
              filter: "brightness(0.9)",
            }}
            type="button"
            className={classes.button}
          >
            <img src="/assets/arrow-left.svg" alt="Back" />
          </motion.button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <motion.button
          whileHover={{
            filter: "brightness(0.9)",
          }}
          type="button"
          className={classes.button}
        >
          <img src="/assets/play.svg" alt="Play episode" />
        </motion.button>
      </div>

      <header className={classes.header}>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.published_at}</span>
        <span>{episode.file?.durationAsString}</span>
      </header>

      <div
        className={classes.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}
