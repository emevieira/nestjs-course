import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UsersCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.users.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async findAll(filter?: string) {
    const users = await this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (filter) {
      const lowerCaseFilter = filter.toLowerCase();
      const filteredUser = users.filter((user) =>
        user.name.toLowerCase().includes(lowerCaseFilter),
      );
      return filteredUser;
    }
    return users;
  }

  async findOne(id: string) {
    const userExist = await this.prisma.users.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userExist;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExist = await this.prisma.users.findFirst({
      where: { id },
    });

    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { name, email } = updateUserDto;
    return { name, email };
  }

  async remove(id: string) {
    const userExist = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.users.delete({
      where: { id },
      select: { id: true },
    });
  }
}
