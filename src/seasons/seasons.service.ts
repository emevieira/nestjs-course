import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Season } from './entities/season.entity';

@Injectable()
export class SeasonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSeasonDto: CreateSeasonDto): Promise<Season> {
    const { downloads, ...dataSeasons } = createSeasonDto;

    const existSeasonNumber = await this.prisma.seasons.findMany({
      where: { seasonNumber: createSeasonDto.seasonNumber },
    });

    if (existSeasonNumber.length > 0) {
      throw new HttpException(
        'Já existe uma temporada com o numero informado',
        HttpStatus.CONFLICT,
      );
    }

    const createdSeason = await this.prisma.seasons.create({
      data: {
        seasonNumber: dataSeasons.seasonNumber,
        serieId: dataSeasons.serieId,
      },
    });

    // Cria os downloads associados a serie
    const createdDownloads = await Promise.all(
      downloads.map(async (download) =>
        this.prisma.seasonDownloads.create({
          data: {
            ...download,
            seasonId: await createdSeason.seasonId,
          },
        }),
      ),
    );

    return {
      ...createdSeason,
      downloads: createdDownloads.map((d) => ({ ...d, seasonId: undefined })),
    };
  }

  // findAll() {
  //   return `This action returns all seasons`;
  // }

  async findOne(seasonId: string) {
    const seasonExist = await this.prisma.seasons.findFirst({
      where: { seasonId },
    });

    if (!seasonExist) {
      throw new HttpException('Temporada não encontrada', HttpStatus.NOT_FOUND);
    }

    const filteredDownloads = await this.prisma.seasonDownloads.findMany({
      where: { seasonId },
    });

    return {
      ...seasonExist,
      downloads: filteredDownloads.map((d) => ({
        ...d,
        seasonId: undefined,
      })),
    };
  }

  async update(seasonId: string, updateSeasonDto: UpdateSeasonDto) {
    const { downloads, ...dataSeasons } = updateSeasonDto;

    const seasonExist = await this.prisma.seasons.findFirst({
      where: { seasonId },
    });

    if (!seasonExist) {
      throw new HttpException('Temporada não encontrada', HttpStatus.NOT_FOUND);
    }

    const existSeasonNumber = await this.prisma.seasons.findMany({
      where: {
        seasonNumber: dataSeasons.seasonNumber,
      },
    });

    if (
      dataSeasons.seasonNumber !== seasonExist.seasonNumber &&
      existSeasonNumber.length > 0
    ) {
      throw new HttpException(
        'Já existe uma temporada com o numero informado',
        HttpStatus.CONFLICT,
      );
    }

    const updateSeason = await this.prisma.seasons.update({
      where: { seasonId },
      data: {
        seasonNumber: dataSeasons.seasonNumber,
      },
    });

    const updateSeasonDownloads = await Promise.all(
      downloads.map((download) =>
        !download.seasonDownloadId
          ? this.prisma.seasonDownloads.create({
              data: {
                ...download,
                seasonId,
              },
            })
          : this.prisma.seasonDownloads.update({
              where: { seasonDownloadId: download.seasonDownloadId },
              data: {
                ...download,
              },
            }),
      ),
    );

    return {
      ...updateSeason,
      downloads: updateSeasonDownloads,
    };
  }

  async remove(seasonId: string) {
    const seasonExist = await this.prisma.seasons.findFirst({
      where: { seasonId },
    });

    if (!seasonExist) {
      throw new HttpException('Temporada não encontrada', HttpStatus.NOT_FOUND);
    }

    return this.prisma.seasons.delete({
      where: { seasonId },
      select: { seasonId: true },
    });
  }
}
