import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({
    type: CreateCardDto,
    description: 'Card creation payload',
    examples: {
      example: {
        value: {
          study_set_id: 0,
          term: 'string',
          definition: 'string',
          position: 0,
        },
        summary: 'Basic Card Creation Example',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created.',
    type: Card,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createCardDto: CreateCardDto) {
    console.log('Body:', createCardDto);
    return this.cardsService.create(createCardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  @ApiResponse({
    status: 200,
    description: 'Return all cards.',
    type: [Card],
  })
  async findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by id' })
  @ApiParam({ name: 'id', description: 'Card identifier' })
  @ApiResponse({
    status: 200,
    description: 'Return the card.',
    type: Card,
  })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  async findOne(@Param('id') id: number) {
    return this.cardsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a card' })
  @ApiParam({ name: 'id', description: 'Card identifier' })
  @ApiBody({
    type: UpdateCardDto,
    description: 'Card update payload',
    examples: {
      example1: {
        value: {
          studySetId: 0,
          term: 'string',
          definition: 'string',
          position: 0,
        },
        summary: 'Basic Card Update Example',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully updated.',
    type: Card,
  })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  async update(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card' })
  @ApiParam({ name: 'id', description: 'Card identifier' })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  async delete(@Param('id') id: number) {
    return this.cardsService.delete(id);
  }
}
