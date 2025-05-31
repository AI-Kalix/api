import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateMealDto } from './dto/update-meal.dto';
import { S3Service } from '../aws/s3/s3.service';
import { Service } from 'src/service';
import { Meal, User } from '@prisma/client';
import { PaginationDto } from 'src/common/Pagination.dto';
import { NutrionalTableDto } from './dto/aiResponse/nutrionalTable.dto';
import { QuestionDto } from './dto/aiResponse/question.dto';
import { CreateMealDto } from './dto/create-meal.dto';
import { AIresponseType } from './decorator/validate-polymorphic-data.decorator';
import { AiAnalysisService } from './aiAnalysis/aiAnalysis.service';
import { InvalidImageDto } from './dto/aiResponse/invalideImage.dto';
@Injectable()
export class MealService extends Service {
  constructor(
    private s3Service: S3Service,
    private aiAnalysisService: AiAnalysisService,
  ) {
    super(MealService.name);
  }
  async create(
    file: Express.Multer.File,
    createMealDto: CreateMealDto,
    user: User,
  ) {
    if (createMealDto.mealId) {
      const { mealId, data: answers } = createMealDto;
      if (!answers || answers.length === 0) {
        throw new BadRequestException(
          'No answers provided for AI follow-up analysis',
        );
      }

      const existing = await this.prisma.meal.findUnique({
        where: { id: mealId },
      });
      if (!existing) throw new NotFoundException("This meal doesn't exist");
      if (existing.userId !== user.id)
        throw new UnauthorizedException("You can't access this meal");
      const existingImage = await this.s3Service.getUrl(existing.imageKey);
      const aiResponse = await this.aiAnalysisOriginal(
        existingImage,
        user.id,
        answers,
      );
      if (aiResponse.type === AIresponseType.SUCCESS) {
        const table = aiResponse.data as NutrionalTableDto;
        const updated = await this.prisma.meal.update({
          where: { id: mealId },
          data: {
            questions: answers.map((answer) => ({ ...answer })),
            nutrionalTable: JSON.parse(JSON.stringify(table)),
            isAIAnalysisDone: true,
          },
        });
        return updated;
      }
    }
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const imageInfo = await this.s3Service.upload(file, 'uploads/meal');
    const key = imageInfo.key;
    const imageUrl = await this.s3Service.getUrl(imageInfo.id);

    const aiResponse = await this.aiAnalysisOriginal(imageUrl, user.id);

    if (aiResponse.type === AIresponseType.INVALID_IMAGE) {
      const invalidImage = aiResponse.data as InvalidImageDto;
      throw new BadRequestException(
        `Invalid image: ${invalidImage.reason} - ${invalidImage.errorMessage}`,
      );
    }

    const meal = await this.prisma.meal.create({
      data: {
        imageKey: key,
        userId: user.id,
        isAIAnalysisDone: false,
      },
    });
    if (aiResponse.data instanceof Array) {
      const questions = aiResponse.data as QuestionDto[];
      await this.prisma.meal.update({
        where: { id: meal.id },
        data: { questions: JSON.parse(JSON.stringify(questions)) },
      });
      return { questions, id: meal.id };
    }

    const table = aiResponse.data as NutrionalTableDto;
    const enriched = await this.prisma.meal.update({
      where: { id: meal.id },
      data: {
        nutrionalTable: JSON.parse(JSON.stringify(table)),
        isAIAnalysisDone: true,
      },
    });

    return enriched;
  }

  async findAll(user: User, paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const meals = await this.prisma.meal.findMany({
      where: {
        userId: user.id,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalMeals = await this.prisma.meal.count({
      where: { userId: user.id },
    });

    return {
      meals: meals,
      totalMeals,
      totalPages: Math.ceil(totalMeals / limit),
      currentPage: page,
    };
  }

  async findOne(mealId: string, user: User): Promise<Meal> {
    const meal = await this.prisma.meal.findUnique({
      where: { id: mealId },
    });
    if (!meal) {
      throw new NotFoundException("This meal doesn't exist");
    }
    if (meal.userId !== user.id) {
      throw new UnauthorizedException("You can't access this meal");
    }
    return meal;
  }

  update(mealId: string, updateMealDto: UpdateMealDto) {
    return `This action updates a #${mealId} meal + ${updateMealDto}`;
  }

  async remove(mealId: string, user: User): Promise<Meal> {
    const meal = await this.prisma.meal.findUnique({
      where: { id: mealId },
    });
    if (!meal) {
      throw new NotFoundException("This meal doesn't exist");
    }
    if (meal.userId !== user.id) {
      throw new UnauthorizedException("You can't access to this meal");
    }
    return await this.prisma.meal.delete({ where: { id: mealId } });
  }

  private analysisCounter = 0;

  private simulateResponseType(): AIresponseType {
    this.analysisCounter++;
    const mod = this.analysisCounter % 3;
    if (mod === 0) return AIresponseType.SUCCESS;
    if (mod === 1) return AIresponseType.DOUBTS;
    return AIresponseType.INVALID_IMAGE;
  }

  async aiAnalysisOriginal(
    resource: string,
    userId: string,
    answers?: QuestionDto[],
  ) {
    const body = {
      resource,
      userId,
    };
    if (answers && answers.length > 0) {
      body['answers'] = answers;
    }
    const response = await this.aiAnalysisService.analyze(body);
    return response;
  }
}
