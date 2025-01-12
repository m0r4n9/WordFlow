import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsNumber()
  studySetIdId: number;

  @IsString()
  term: string;

  @IsString()
  definition: string;

  @IsNumber()
  position: number;
}
