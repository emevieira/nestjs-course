import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Controller('api')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('courses')
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('courses/:id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post('courses')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Patch('courses/:id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete('courses/:id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
