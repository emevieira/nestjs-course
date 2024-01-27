import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDownloadDto } from './dto/create-download.dto';
import { UpdateDownloadDto } from './dto/update-download.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DownloadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDownloadDto: CreateDownloadDto[]) {
    // Cria os downloads associados ao filme
    const createdDownloads = await Promise.all(
      createDownloadDto.map((download) =>
        this.prisma.download.create({
          data: download,
        }),
      ),
    );
    return createdDownloads.map((download) => ({
      ...download,
      movieId: download.movieId ?? undefined,
      serieId: download.serieId ?? undefined,
    }));
  }

  async findOne(downloadId: number) {
    const downloadExist = await this.prisma.download.findFirst({
      where: { downloadId },
    });

    if (!downloadExist) {
      throw new HttpException('Download not found', HttpStatus.NOT_FOUND);
    }

    return {
      ...downloadExist,
      movieId: downloadExist.movieId ?? undefined,
      serieId: downloadExist.serieId ?? undefined,
    };
  }

  async update(downloadId: number, updateDownloadDto: UpdateDownloadDto) {
    const downloadExist = await this.prisma.download.findFirst({
      where: { downloadId },
    });

    if (!downloadExist) {
      throw new HttpException('Download not found', HttpStatus.NOT_FOUND);
    }

    const updateDownload = await this.prisma.download.update({
      where: { downloadId },
      data: updateDownloadDto,
    });
    return {
      ...updateDownload,
      movieId: updateDownload.movieId ?? undefined,
      serieId: updateDownload.serieId ?? undefined,
    };
  }

  async remove(downloadId: number) {
    const downloadExist = await this.prisma.download.findFirst({
      where: { downloadId },
    });

    if (!downloadExist) {
      throw new HttpException('Download not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.download.delete({
      where: { downloadId },
      select: { downloadId: true },
    });
  }
}
