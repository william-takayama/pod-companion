export type File = {
  url: string;
  type: string;
  duration: number;
  durationAsString: string;
};

export type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  file: File;
};
