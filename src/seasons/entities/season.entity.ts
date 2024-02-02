class DownloadTypes {
  seasonDownloadId?: number;
  provedorName: string;
  linkDownload: string;
  seasonId: string;
}

export class Season {
  seasonId?: string;
  seasonNumber: number;
  serieId: string;
  downloads: DownloadTypes[];
}
