import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStudySetDto } from './dto/create-study-set';
import { UpdateStudySetDto } from './dto/update-study-set.dto';
import { StudySet } from './entities/study-set.entity';

@Injectable()
export class StudySetsService {
  constructor(
    @InjectRepository(StudySet)
    private studySetRepository: Repository<StudySet>,
  ) {}

  async findAll() {
    return this.studySetRepository.find();
  }

  async create(
    createStudySetDto: CreateStudySetDto,
    image?: Express.Multer.File,
  ) {
    const studySet = this.studySetRepository.create(createStudySetDto);

    if (image) {
      const timestamp = Date.now();
      const encodedFilename = encodeURIComponent(image.originalname);
      const filename = `${timestamp}-${encodedFilename}`;
      const filePath = `/uploads/${filename}`;

      studySet.imageUrl = filePath;
    }

    return this.studySetRepository.save(studySet);
  }

  async delete(id: number) {
    return this.studySetRepository.delete(id);
  }

  async update(id: number, updateStudySetDto: UpdateStudySetDto) {
    return this.studySetRepository.update(id, updateStudySetDto);
  }

  async getImage(id: number) {
    const studySet = await this.studySetRepository.findOne({
      where: { id },
      select: ['imageUrl'],
    });

    if (!studySet || !studySet.imageUrl) {
      return null;
    }

    return {
      data: studySet.imageUrl,
    };
  }
}
