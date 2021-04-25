import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetStaticPaths, GetStaticProps } from "next";
import { EpisodePageComponent } from "../../components/PageComponents/Episode/EpisodePageComponent";
import { Episode } from "../../interfaces/Episodes";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export interface EpisodePageProps {
  episode: Episode;
}

export default function EpisodePage({ ...rest }: EpisodePageProps) {
  return <EpisodePageComponent {...(rest as EpisodePageProps)} />;
}

// We must implement it in every route that is generated dynamically (with params)
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const a = "";

  return {
    // which paths we want to create during build time
    paths: [
      {
        params: {
          slug: "a-importancia-da-contribuicao-em-open-source",
        },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    published_at: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    thumbnail: data.thumbnail,
    description: data.description,
    file: {
      url: data.file.url,
      type: data.file.type,
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    },
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24hours
  };
};
