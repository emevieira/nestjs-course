import { PartialType } from '@nestjs/swagger';
// import { CreateSeasonDto } from './create-season.dto';
import { Season } from '../entities/season.entity';

export class UpdateSeasonDto extends PartialType(Season) {}
