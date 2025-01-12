import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsNumber()
  studySetId: number;

  @IsOptional()
  @IsString()
  term: string;

  @IsOptional()
  @IsString()
  definition: string;

  @IsOptional()
  @IsNumber()
  position: number;
}
