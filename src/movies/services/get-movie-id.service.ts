import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetMovieService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(movieId: string) {
    const movieExist = await this.prisma.movies.findUnique({
      where: { movieId },
      include: {
        category: {
          select: {
            categoryId: true,
            name: true,
          },
        },

        Download: {
          select: {
            movieDownloadId: true,
            provedorName: true,
            linkDownload: true,
          },
        },
      },
    });

    if (!movieExist) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      ...movieExist,
      categories: movieExist.category,
      downloads: movieExist.Download,
      categoryId: undefined,
      category: undefined,
      Download: undefined,
    };
  }
}
