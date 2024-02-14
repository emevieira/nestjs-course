import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetMoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    itemsPerPage: number,
    page: number,
    filter?: string,
    categoryId?: string,
  ) {
    const total = await this.prisma.movies.count();

    const movies = this.prisma.movies.findMany({
      where: {
        name: {
          contains: filter,
        },
        categoryId: {
          contains: categoryId,
        },
      },
      include: {
        category: {
          select: {
            categoryId: true,
            name: true,
          },
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
      items: (await movies).map((m) => ({
        ...m,
        categoryId: undefined,
        category: undefined,
        categories: m.category,
      })),
    };

    return metadata;
  }
}
