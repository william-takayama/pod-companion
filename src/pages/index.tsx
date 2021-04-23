import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetStaticProps } from "next";
import React from "react";
import HomePageComponent from "../components/PageComponents/Home/HomePageComponent";
import { Episode } from "../interfaces/Episodes";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

interface HomeProps {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ ...rest }: HomeProps): JSX.Element {
  return <HomePageComponent {...rest} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<Episode[]>("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data?.map((episode) => {
    const {
      id,
      title,
      members,
      published_at,
      thumbnail,
      description,
      file,
    } = episode;

    return {
      id,
      title,
      members,
      publishedAt: format(parseISO(published_at), "d MMM yy", { locale: ptBR }),
      thumbnail,
      description,
      file: {
        url: file.url,
        type: file.type,
        duration: Number(file.duration),
        durationAsString: convertDurationToTimeString(Number(file.duration)),
      },
    };
  });

  const latestEpisodes = episodes?.slice(0, 2);
  const allEpisodes = episodes?.slice(2, episodes?.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
