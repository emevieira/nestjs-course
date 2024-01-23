import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from '../entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do NestJS',
      description: 'NestJS um dos melhores framework da atualidade',
      tags: ['node.js', 'nestjs', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find(
      (course: Course) => course.id === Number(id),
    );

    if (!course) {
      throw new HttpException(
        'Course Id ' + id + ' not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return course;
  }

  create(createCurseDto: any) {
    this.courses.push(createCurseDto);
    return createCurseDto;
  }

  update(id: string, updateCouse: any) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    this.courses[indexCourse] = updateCouse;
  }

  remove(id: string) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    if (indexCourse >= 0) {
      this.courses.slice(indexCourse, 1);
    }
  }
}
