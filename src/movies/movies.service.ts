import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Prisma } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    // const data: Prisma.MoviesCreateInput = {
    //   ...createMovieDto,
    // };

    const createdMovie = await this.prisma.movies.create({
      data: createMovieDto,
    });

    // // Cria os downloads associados ao filme
    // const createdDownloads = await Promise.all(
    //   downloads.map((download) =>
    //     this.prisma.download.create({
    //       data: {
    //         ...download,
    //         movieId: createdMovie.movieId,
    //       },
    //     }),
    //   ),
    // );

    return createdMovie;
  }

  async findAll(filter?: string, categoryId?: string) {
    const movies = this.prisma.movies.findMany();

    if (filter) {
      const lowerCaseFilter = filter.toLowerCase();

      const filteredMovie = (await movies).filter((m) =>
        m.name.toLowerCase().includes(lowerCaseFilter),
      );

      const filteredMovieCategoryId = (await movies).filter(
        (m) => m.categoryId === categoryId,
      );

      return filteredMovie || filteredMovieCategoryId;
    }
    return movies;
  }

  async findOne(movieId: string) {
    const movieExist = await this.prisma.movies.findFirst({
      where: { movieId },
    });

    const { categoryId } = movieExist;

    const filteredCategory = await this.prisma.categories.findMany({
      where: { categoryId },
    });

    const filteredDownloads = await this.prisma.download.findMany({
      where: { movieId },
    });

    return {
      ...movieExist,
      categories: filteredCategory.map((c) => ({
        categoryId: c.categoryId,
        categoryName: c.name,
      })),
      downloads: filteredDownloads.map((d) => ({
        downloadId: d.downloadId,
        provedorName: d.provedorName,
        linkDownload: d.linkDownload,
      })),
    };
  }

  async update(movieId: string, updateMovieDto: UpdateMovieDto) {
    const movieExist = await this.prisma.movies.findFirst({
      where: { movieId },
    });

    if (!movieExist) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    const updateMovie = await this.prisma.movies.update({
      where: { movieId },
      data: updateMovieDto,
    });

    return updateMovie;
  }

  async remove(movieId: string) {
    const movieExist = await this.prisma.movies.findFirst({
      where: { movieId },
    });

    if (!movieExist) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.movies.delete({
      where: { movieId },
      select: { movieId: true },
    });
  }
}
