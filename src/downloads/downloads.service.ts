import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDownloadDto } from './dto/create-movie-download.dto';
import { UpdateDownloadDto } from './dto/update-movie-download.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DownloadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDownloadDto: CreateDownloadDto[]) {
    // Cria os downloads associados ao filme
    const createdDownloads = await Promise.all(
      createDownloadDto.map((download) =>
        this.prisma.movieDownloads.create({
          data: download,
        }),
      ),
    );
    return createdDownloads.map((download) => ({
      ...download,
      movieId: download.movieId ?? undefined,
    }));
  }

  async findOne(movieDownloadId: number) {
    const downloadExist = await this.prisma.movieDownloads.findFirst({
      where: { movieDownloadId },
    });

    if (!downloadExist) {
      throw new HttpException('Download not found', HttpStatus.NOT_FOUND);
    }

    return {
      ...downloadExist,
      movieId: downloadExist.movieId ?? undefined,
    };
  }

  async update(movieDownloadId: number, updateDownloadDto: UpdateDownloadDto) {
    const downloadExist = await this.prisma.movieDownloads.findFirst({
      where: { movieDownloadId },
    });

    if (!downloadExist) {
      throw new HttpException('Download not found', HttpStatus.NOT_FOUND);
    }

    const updateDownload = await this.prisma.movieDownloads.update({
      where: { movieDownloadId },
      data: updateDownloadDto,
    });
    return {
      ...updateDownload,
      movieId: updateDownload.movieId ?? undefined,
    };
  }

  async remove(movieDownloadId: number) {
    const downloadExist = await this.prisma.movieDownloads.findFirst({
      where: { movieDownloadId },
    });

    if (!downloadExist) {
      throw new HttpException('Download not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.movieDownloads.delete({
      where: { movieDownloadId },
      select: { movieDownloadId: true },
    });
  }
}
