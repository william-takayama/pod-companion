import { InferGetStaticPropsType } from "next";
import React from "react";

export default function Home({
  episodes,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <div>
      <h1>index</h1>
      <pre>{JSON.stringify(episodes, null, 2)}</pre>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
