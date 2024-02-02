import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Injectable()
export class UpdateMovieService {
  constructor(private readonly prisma: PrismaService) {}

  async update(movieId: string, updateMovieDto: UpdateMovieDto) {
    const movieExist = await this.prisma.movies.findFirst({
      where: { movieId },
    });

    if (!movieExist) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }

    const updateMovie = await this.prisma.movies.update({
      where: { movieId },
      data: updateMovieDto,
    });

    return updateMovie;
  }
}
