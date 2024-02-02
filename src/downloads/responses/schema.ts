export const DownloadRequest = {
  schema: {
    default: [
      {
        movieDownloadId: 'string',
        provedorName: 'string',
        movieId: 'string',
      },
    ],
  },
};

export const DownloadDeleteResponse = {
  schema: {
    default: {
      movieDownloadId: 'string',
    },
  },
};
