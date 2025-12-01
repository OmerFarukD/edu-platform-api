import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const isExist = await this.categoryRepository.exists({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (isExist) {
      throw new BadRequestException('Kategori adı benzersiz olmalıdır.');
    }

    const category = this.categoryRepository.create({
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    });

    const created = await this.categoryRepository.save(category);

    return created;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (!category) {
      throw new NotFoundException(`Kategori Bulunamadı.`);
    }
    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async delete(id: string): Promise<void> {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }

    if (updateCategoryDto.description) {
      category.description = updateCategoryDto.description;
    }
    const updated = await this.categoryRepository.save(category);
    return updated;
  }
}
