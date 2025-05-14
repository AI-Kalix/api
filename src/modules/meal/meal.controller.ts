import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { UpdateMealDto } from './dto/update-meal.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MealImageUrlInterceptor } from './interceptor/meal-image.interceptor';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role, User } from '@prisma/client';
import { ActiveUser } from '../auth/decorators/session.decorator';
import { PaginationDto } from 'src/common/Pagination.dto';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';
import { CreateMealDto } from './dto/create-meal.dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @Auth([Role.USER])
  @UseInterceptors(FileInterceptor('file'), MealImageUrlInterceptor)
  @ResponseMessage('Meal created successfully')
  async create(
    @ActiveUser() user: User,
    @Body() createMealDto: CreateMealDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('Entro al controlador');
    return this.mealService.create(file, createMealDto, user);
  }
  @Get()
  @UseInterceptors(MealImageUrlInterceptor)
  @Auth([Role.USER])
  @ResponseMessage('Meals obtained successfully')
  async findAll(
    @ActiveUser() user: User,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.mealService.findAll(user, paginationDto);
  }

  @Get(':mealId')
  @UseInterceptors(MealImageUrlInterceptor)
  @Auth([Role.USER])
  @ResponseMessage('Meal obtained successfully')
  async findOne(@Param('mealId') mealId: string, @ActiveUser() user: User) {
    return this.mealService.findOne(mealId, user);
  }

  @Patch(':mealId')
  @UseInterceptors(MealImageUrlInterceptor)
  async update(
    @Param('mealId') mealId: string,
    @Body() updateMealDto: UpdateMealDto,
  ) {
    return this.mealService.update(mealId, updateMealDto);
  }

  @Delete(':mealId')
  @UseInterceptors(MealImageUrlInterceptor)
  @Auth([Role.USER])
  async remove(@Param('mealId') mealId: string, @ActiveUser() user: User) {
    return this.mealService.remove(mealId, user);
  }
}
