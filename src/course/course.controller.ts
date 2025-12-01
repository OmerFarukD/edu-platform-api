import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles('instructor', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createCourseDto: CreateCourseDto, @Request() req) {
    const instructorId = req.user.userId;
    return this.courseService.create(createCourseDto, instructorId);
  }

  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    const userRoles = req.user.roles;

    return await this.courseService.update(
      id,
      updateCourseDto,
      userId,
      userRoles,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    const userRoles = req.user.roles;

    await this.courseService.remove(id, userId, userRoles);
    return { message: 'Kurs başarıyla silindi' };
  }
}
