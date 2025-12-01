import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';
import { CourseLevel } from '../enums/course-level.enum';
import { CourseLanguage } from '../enums/course-language.enum';
import { CourseStatus } from '../enums/course-status.enum';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true, length: 500 })
  thumbnail: string;

  @Column({ default: false })
  isFree: boolean;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: CourseLevel,
  })
  level: CourseLevel;

  @Column({
    type: 'enum',
    enum: CourseLanguage,
  })
  language: CourseLanguage;

  @Column({ default: 0 })
  duration: number;

  @Column({
    type: 'enum',
    enum: CourseStatus,
    default: CourseStatus.DRAFT,
  })
  status: CourseStatus;

  // Relations
  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  instructor: User;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'course_category',
  })
  categories: Category[];

  // todo: @OneToMany(() => Section, section => section.course)
  // todo: sections: Section[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
