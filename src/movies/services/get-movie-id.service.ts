import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetMovieService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(movieId: string) {
    const movieExist = await this.prisma.movies.findFirst({
      where: { movieId },
    });

    if (!movieExist) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }

    const { categoryId } = movieExist;

    const filteredCategory = await this.prisma.categories.findMany({
      where: { categoryId },
    });

    const filteredDownloads = await this.prisma.movieDownloads.findMany({
      where: { movieId },
    });

    return {
      ...movieExist,
      categoryId: undefined,
      categories: filteredCategory.map((c) => ({
        categoryId: c.categoryId,
        categoryName: c.name,
      })),
      downloads: filteredDownloads.map((d) => ({
        movieDownloadId: d.movieDownloadId,
        provedorName: d.provedorName,
        linkDownload: d.linkDownload,
      })),
    };
  }
}
