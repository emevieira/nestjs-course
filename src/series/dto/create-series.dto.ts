import { IsString } from 'class-validator';

export class CreateSeriesDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  bannerUrl: string;

  @IsString()
  imageUrl: string;

  @IsString()
  trailerLink: string;

  @IsString()
  categoryId: string;

  @IsString()
  releaseYear: string;
}
