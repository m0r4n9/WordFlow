import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStudySetDto {
  @ApiProperty({
    example: 'Mathematics 101',
    description: 'Title of the study set',
    minLength: 4,
    maxLength: 200,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    example: 'A comprehensive study set for basic mathematics',
    description: 'Description of the study set',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the user creating the study set',
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 'Mathematics textbook cover',
    description: 'Alternative text for the image',
    required: false,
  })
  @IsString()
  @IsOptional()
  alt?: string;
}
