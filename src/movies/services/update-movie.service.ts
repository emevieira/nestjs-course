import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Injectable()
export class UpdateMovieService {
  constructor(private readonly prisma: PrismaService) {}

  async update(movieId: string, updateMovieDto: UpdateMovieDto) {
    const { downloads, ...dataMovie } = updateMovieDto;
    const movieExist = await this.prisma.movies.findFirst({
      where: { movieId },
    });

    if (!movieExist) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }

    const updateMovie = await this.prisma.movies.update({
      where: { movieId },
      data: {
        name: dataMovie.name,
        description: dataMovie.description,
        bannerUrl: dataMovie.bannerUrl,
        imageUrl: dataMovie.imageUrl,
        trailerLink: dataMovie.trailerLink,
        releaseYear: dataMovie.releaseYear,
        categoryId: dataMovie.categoryId,
        Download: {
          updateMany: downloads
            .filter((download) => download.movieDownloadId) // Filtra apenas os downloads existentes (que possuem movieDownloadId)
            .map((download) => ({
              where: { movieDownloadId: Number(download.movieDownloadId) },
              data: {
                provedorName: download.provedorName,
                linkDownload: download.linkDownload,
              },
            })),
          createMany: {
            data: downloads
              .filter((download) => !download.movieDownloadId) // Filtra apenas os novos downloads (que não possuem movieDownloadId)
              .map((download) => ({
                provedorName: download.provedorName,
                linkDownload: download.linkDownload,
              })),
          },
        },
      },
    });

    const filterDownloads = await this.prisma.movieDownloads.findMany({
      where: {
        movieId: updateMovie.movieId,
      },
    });

    return {
      ...updateMovie,
      downloads: filterDownloads,
    };
  }
}
