import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ImageValidationPipe } from 'src/common/pipes/ImageValidationPipe';

import { CreateStudySetDto } from './dto/create-study-set';
import { UpdateStudySetDto } from './dto/update-study-set.dto';
import { StudySetsService } from './study-sets.service';

@ApiTags('Study Sets')
@Controller('study-sets')
export class StudySetsController {
  constructor(private studySetsService: StudySetsService) {}

  @Get()
  async findAll() {
    return this.studySetsService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new study set',
    description: 'Creates a new study set with optional image upload',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Mathematics 101',
        },
        description: {
          type: 'string',
          example: 'Basic mathematics concepts',
        },
        userId: {
          type: 'number',
          example: 1,
        },
        image: {
          type: 'string',
          format: 'binary',
          description:
            'Image file (JPEG or PNG, max 5MB, max dimensions 1920x1080)',
        },
      },
      required: ['title', 'description', 'userId'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The study set has been successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input (Bad Request)',
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createStudySetDto: CreateStudySetDto,
    @UploadedFile(
      new ImageValidationPipe({
        isEmpty: true,
        maxWidth: 1920,
        maxHeight: 1080,
        maxSizeInBytes: 5 * 1024 * 1024,
        allowedMimeTypes: ['image/jpeg', 'image/png'],
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.studySetsService.create(createStudySetDto, file);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a study set',
    description: 'Deletes a study set by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Study set ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The study set has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Study set not found',
  })
  async delete(@Param('id') id: number) {
    return this.studySetsService.delete(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a study set',
    description: 'Updates a study set by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Study set ID',
    type: 'number',
    example: 1,
  })
  @ApiBody({
    type: UpdateStudySetDto,
    examples: {
      studySet: {
        value: {
          title: 'string',
          description: 'string',
          imageUrl: 'string',
          alt: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The study set has been successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input (Bad Request)',
  })
  @ApiResponse({
    status: 404,
    description: 'Study set not found',
  })
  async update(
    @Param('id') id: number,
    @Body() updateStudySetDto: UpdateStudySetDto,
  ) {
    return this.studySetsService.update(id, updateStudySetDto);
  }
}
