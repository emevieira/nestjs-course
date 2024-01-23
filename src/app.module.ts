import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/modules/courses.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CoursesModule, PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
