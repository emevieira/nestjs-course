import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class CreateMovieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { downloads, ...dataMovie } = createMovieDto;
    const createdMovie = await this.prisma.movies.create({
      data: {
        name: dataMovie.name,
        description: dataMovie.description,
        bannerUrl: dataMovie.bannerUrl,
        imageUrl: dataMovie.imageUrl,
        trailerLink: dataMovie.trailerLink,
        releaseYear: dataMovie.releaseYear,
        categoryId: dataMovie.categoryId,
      },
    });

    // Cria os downloads associados ao filme
    const createdDownloads = await Promise.all(
      downloads.map(async (download) =>
        this.prisma.download.create({
          data: {
            ...download,
            movieId: await createdMovie.movieId,
          },
        }),
      ),
    );

    return {
      ...createdMovie,
      downloads: createdDownloads.map((d) => ({ ...d, serieId: undefined })),
    };
  }
}
