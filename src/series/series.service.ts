import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSeriesDto: CreateSeriesDto) {
    const createdSerie = await this.prisma.series.create({
      data: createSeriesDto,
    });

    return createdSerie;
  }

  async findAll(
    itemsPerPage: number,
    page: number,
    filter?: string,
    categoryId?: string,
  ) {
    const total = await this.prisma.series.count();

    const series = this.prisma.series.findMany({
      where: {
        name: {
          contains: filter,
        },
        categoryId: {
          contains: categoryId,
        },
      },
      orderBy: {
        name: 'asc',
      },
      take: Number(itemsPerPage),
      skip: itemsPerPage * (page - 1),
    });

    const metadata = {
      totalItems: total,
      itemsPerPage: Number(itemsPerPage),
      page: Number(page),
      items: (await series).map((s) => ({ ...s })),
    };

    return metadata;
  }

  async findOne(serieId: string) {
    const serieExist = await this.prisma.series.findFirst({
      where: { serieId },
    });

    if (!serieExist) {
      throw new HttpException('Serie não encontrada', HttpStatus.NOT_FOUND);
    }

    const { categoryId } = serieExist;

    const filteredCategory = await this.prisma.categories.findMany({
      where: { categoryId },
    });

    const filteredSeasons = await this.prisma.seasons.findMany({
      where: { serieId },
    });

    return {
      ...serieExist,
      categoryId: undefined,
      categories: filteredCategory.map((c) => ({
        categoryId: c.categoryId,
        categoryName: c.name,
      })),
      seasons: filteredSeasons.map((s) => ({
        seasonId: s.seasonId,
        seasonNumber: s.seasonNumber,
      })),
    };
  }

  async update(serieId: string, updateSeriesDto: UpdateSeriesDto) {
    const serieExist = await this.prisma.series.findFirst({
      where: { serieId },
    });

    if (!serieExist) {
      throw new HttpException('Serie não encontrada', HttpStatus.NOT_FOUND);
    }

    const updateSerie = await this.prisma.series.update({
      where: { serieId },
      data: updateSeriesDto,
    });

    return updateSerie;
  }

  async remove(serieId: string) {
    const serieExist = await this.prisma.series.findFirst({
      where: { serieId },
    });

    if (!serieExist) {
      throw new HttpException('Serie não encontrada', HttpStatus.NOT_FOUND);
    }

    return this.prisma.series.delete({
      where: { serieId },
      select: { serieId: true },
    });
  }
}
