export const DownloadRequest = {
  schema: {
    default: [
      {
        downloadId: 'string',
        provedorName: 'string',
        movieId: 'string', //ou serieId
      },
    ],
  },
};

export const DownloadDeleteResponse = {
  schema: {
    default: {
      downloadId: 'string',
    },
  },
};
