export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  imageHint?: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
};
