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
  // When getStaticPaths fallback is true
  // const { isFallback } = useRouter();

  // if (isFallback) {
  //   return <p>Loading</p>;
  // }

  return <EpisodePageComponent {...(rest as EpisodePageProps)} />;
}

// We must implement it in every route that is generated dynamically (with params)
// Think aboug an e-commerce - /category/c1 and we have 1000 categories
// Then if we pass every category to the paths, it'll take a MASSIVE AMOUNT OF TIME to run the build
//
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const paths = data?.map((episode) => ({
    params: {
      slug: episode.id,
    },
  }));

  return {
    // which paths we want to create during build time
    paths,
    // false = does not return anything if the path was not created during build time
    //
    // true = episode not created statically during build time it will try
    // to retrieve data to create the page on CLIENT SIDE = INCREMETAL STATIC REGENERATION
    // then we need to ensure that our DATA is available - on client side use:
    // const { isFallback } = useRouter();
    // if(isFallback) <p>Loading</p>
    //
    // 'blocking' = same as true but will run on NEXTJS side = INCREMETAL STATIC REGENERATION
    // BEST for SEO
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
