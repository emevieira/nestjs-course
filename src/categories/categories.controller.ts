import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('api')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    schema: {
      default: [
        {
          categoryId: 'string',
          name: 'string',
        },
      ],
    },
  })
  @Get('categories')
  findAll() {
    return this.categoriesService.findAll();
  }
}
