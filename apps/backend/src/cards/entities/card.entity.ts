import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { StudySet } from '../../study-sets/entities/study-set.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudySet, (StudySet) => StudySet.id, { onDelete: 'CASCADE' })
  study_set: StudySet;

  @Column({ name: 'study_set_id' })
  study_set_id: number;

  @Column()
  term: string;

  @Column()
  definition: string;

  @Column()
  position: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
