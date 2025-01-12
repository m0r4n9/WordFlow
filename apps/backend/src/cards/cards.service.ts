import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    return this.cardRepository.save(createCardDto);
  }

  async findAll() {
    return this.cardRepository.find();
  }

  async findById(id: number) {
    return this.cardRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    return this.cardRepository.update(id, updateCardDto);
  }

  async delete(id: number) {
    return this.cardRepository.delete(id);
  }
}
