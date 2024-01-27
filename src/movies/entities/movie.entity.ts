class DownloadTypes {
  downloadId?: number;
  provedorName: string;
  linkDownload: string;
  movieId?: string;
}

export class Movie {
  movieId?: string;
  name: string;
  description: string;
  bannerUrl: string;
  imageUrl: string;
  trailerLink: string;
  categoryId: string;
  releaseYear: string;
  downloads: DownloadTypes[];
}
