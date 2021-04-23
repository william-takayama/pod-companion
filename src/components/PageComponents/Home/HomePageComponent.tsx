import Image from "next/image";
import { motion } from "framer-motion";
import cn from "clsx";
import classes from "./HomePageComponent.module.scss";
import { Episode } from "../../../interfaces/Episodes";

interface HomePageComponentProps {
  allEpisodes: Episode[];
  latestEpisodes: Episode[];
}

export default function HomePageComponent({
  allEpisodes,
  latestEpisodes,
}: HomePageComponentProps) {
  return (
    <div className={classes.container}>
      <section className={classes.latestEpisodes}>
        <h2 className={classes.title}>Last Releases</h2>

        <ul className={classes.list}>
          {latestEpisodes?.map((episode) => (
            <li key={episode.id} className={classes.item}>
              <Image
                width={192}
                height={192}
                objectFit="cover"
                src={episode.thumbnail}
                alt={episode.title}
                className={classes.img}
              />

              <div className={classes.episodeDetails}>
                <a href="a">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.file.durationAsString}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, filter: "brightness(0.9)" }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={cn(classes.button, classes.reposition)}
              >
                <img src="/assets/play-green.svg" alt="Play episode" />
              </motion.button>
            </li>
          ))}
        </ul>
      </section>

      <section className={classes.allEpisodes}>
        <h2>All Episodes</h2>

        <table cellSpacing={0} className={classes.table}>
          <thead>
            <th aria-label="white space" />
            <th>Podcast</th>
            <th>Members</th>
            <th>Data</th>
            <th>Duration</th>
            <th aria-label="white space" />
          </thead>
          <tbody>
            {allEpisodes?.map((episode) => (
              <tr key={episode.id}>
                <td className={classes.thumbnailContainer}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>
                <td>
                  <motion.a
                    whileHover={{ textDecoration: "underline" }}
                    href=""
                  >
                    {episode.title}
                  </motion.a>
                </td>
                <td>{episode.members}</td>
                <td className={classes.publishedAt}>{episode.publishedAt}</td>
                <td>{episode.file.durationAsString}</td>
                <td>
                  <motion.button
                    whileHover={{ scale: 1.05, filter: "brightness(0.9)" }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className={classes.button}
                  >
                    <img src="/assets/play-green.svg" alt="Play Episode" />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
