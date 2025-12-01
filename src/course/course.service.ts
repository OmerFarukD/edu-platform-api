import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    instructorId: string,
  ): Promise<Course> {
    if (!createCourseDto.isFree && !createCourseDto.price) {
      throw new BadRequestException('Ucretli kurslar için fiyat zorunludur.');
    }

    const categories = await this.validateCategories(
      createCourseDto.categoryIds,
    );

    const course = this.courseRepository.create({
      title: createCourseDto.title,
      description: createCourseDto.description,
      thumbnail: createCourseDto.thumbnail,
      isFree: createCourseDto.isFree,
      price: createCourseDto.price,
      level: createCourseDto.level,
      language: createCourseDto.language,
      instructor: { id: instructorId } as any,
      categories: categories,
    });
    return await this.courseRepository.save(course);
  }

  async findAll() {
    return await this.courseRepository.find({
      relations: ['instructor', 'categories'],
    });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['instructor', 'categories'],
    });

    if (!course) {
      throw new NotFoundException('Kurs bulunamadı');
    }

    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
    userId: string,
    userRoles: string[],
  ) {
    const course = await this.findOne(id);

    this.checkOwnership(course, userId, userRoles);

    if (
      updateCourseDto.isFree === false &&
      !updateCourseDto.price &&
      !course.price
    ) {
      throw new BadRequestException('Ücretli kurslar için fiyat zorunludur');
    }

    if (updateCourseDto.categoryIds) {
      const categories = await this.validateCategories(
        updateCourseDto.categoryIds,
      );
      course.categories = categories;
    }

    Object.assign(course, {
      ...updateCourseDto,
      categoryIds: undefined,
    });

    return await this.courseRepository.save(course);
  }

  async remove(id: string, userId: string, userRoles: string[]) {
    const course = await this.findOne(id);

    this.checkOwnership(course, userId, userRoles);

    await this.courseRepository.remove(course);
  }

  private async validateCategories(categoryIds: string[]) {
    const categories = await this.categoryService.findAll();
    const validIds = categories.map((category) => category.id);

    const invalidIds = categoryIds.filter((id) => !validIds.includes(id));
    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `Geçersiz Kategoriler : ${invalidIds.join(', ')}`,
      );
    }

    return categories.filter((c) => categoryIds.includes(c.id));
  }


  private checkOwnership(course: Course, userId: string, userRoles: string[]) {
    const isOwner = course.instructor.id === userId;
    const isAdmin = userRoles.includes('admin');

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Bu kursu düzenleme yetkiniz yok');
    }
  }
}
