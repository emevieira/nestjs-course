import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeasonDownloadsService {
  constructor(private readonly prisma: PrismaService) {}

  async remove(seasonDownloadId: number) {
    const downloadExist = await this.prisma.seasonDownloads.findFirst({
      where: { seasonDownloadId },
    });

    if (!downloadExist) {
      throw new HttpException('Download não encontrado', HttpStatus.NOT_FOUND);
    }
    return this.prisma.seasonDownloads.delete({
      where: { seasonDownloadId },
      select: { seasonDownloadId: true },
    });
  }
}
