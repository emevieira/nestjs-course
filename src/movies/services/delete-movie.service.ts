import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteMovieService {
  constructor(private readonly prisma: PrismaService) {}

  async remove(movieId: string) {
    const movieExist = await this.prisma.movies.findFirst({
      where: { movieId },
    });

    if (!movieExist) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.prisma.movies.delete({
      where: { movieId },
      select: { movieId: true },
    });
  }
}
