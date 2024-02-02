export const MovieForId = {
  movieId: 'string',
  name: 'string',
  description: 'string',
  bannerUrl: 'string',
  imageUrl: 'string',
  trailerLink: 'string',
  releaseYear: 'string',
  categories: [
    {
      categoryId: 'string',
      categoryName: 'string',
    },
  ],
  downloads: [
    {
      movieDownloadId: 0,
      provedorName: 'string',
      linkDownload: 'string',
    },
  ],
};

export const UpdateMovie = {
  movieId: 'string',
  name: 'string',
  description: 'string',
  bannerUrl: 'string',
  imageUrl: 'string',
  trailerLink: 'string',
  categoryId: 'string',
  releaseYear: 'string',
};

export const GetMoviesResponse = {
  totalItems: 230,
  itemsPerPage: 10,
  page: 1,
  items: [
    {
      movieId: 'string',
      name: 'string',
      description: 'string',
      bannerUrl: 'string',
      imageUrl: 'string',
      trailerLink: 'string',
      categoryId: 'string',
      releaseYear: 'string',
      downloads: [
        {
          movieDownloadId: 0,
          provedorName: 'string',
          linkDownload: 'string',
        },
      ],
    },
  ],
};
