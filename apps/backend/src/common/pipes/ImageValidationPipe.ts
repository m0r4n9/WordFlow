import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

interface ImageValidationOptions {
  isEmpty?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  maxSizeInBytes?: number;
  allowedMimeTypes?: string[];
}

@Injectable()
export class ImageValidationPipe implements PipeTransform<Express.Multer.File> {
  constructor(private options: ImageValidationOptions = {}) {
    this.options = {
      maxWidth: 1920,
      maxHeight: 1080,
      maxSizeInBytes: 5 * 1024 * 1024,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
      isEmpty: false,
      ...options,
    };
  }

  async transform(file: Express.Multer.File) {
    if (this.options.isEmpty && !file) return;

    if (!file) {
      throw new BadRequestException('Файл не был загружен');
    }

    if (!this.options.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Недопустимый тип файла. Разрешены только: ${this.options.allowedMimeTypes.join(', ')}`,
      );
    }

    if (file.size > this.options.maxSizeInBytes) {
      throw new BadRequestException(
        `Размер файла превышает максимально допустимый (${this.options.maxSizeInBytes / 1024 / 1024}MB)`,
      );
    }

    try {
      const metadata = await sharp(file.buffer).metadata();

      if (metadata.width > this.options.maxWidth) {
        throw new BadRequestException(
          `Ширина изображения (${metadata.width}px) превышает максимально допустимую (${this.options.maxWidth}px)`,
        );
      }

      if (metadata.height > this.options.maxHeight) {
        throw new BadRequestException(
          `Высота изображения (${metadata.height}px) превышает максимально допустимую (${this.options.maxHeight}px)`,
        );
      }

      return file;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Ошибка при обработке изображения');
    }
  }
}
