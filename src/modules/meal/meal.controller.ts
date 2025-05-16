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
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  CANT_ACCESS_MEAL_401,
  DELETE_MEAL_200,
  GET_ALL_MEALS_BY_USERID_200,
  GET_ALL_MEALS_BY_USERID_200_EMPTY,
  GET_MEAL_BY_ID_200,
  MEAL_DOSENT_EXIST_404,
  NO_ANSWER_PROVIDED_400,
  NO_FILE_UPLOADED_400,
  POST_MEAL_RESPONSE_QUESTION_201,
  POST_MEAL_RESPONSE_SUCCESS_201,
  POST_MEAL_RESPONSE_SUCCESS_201_V2,
} from './docs/mealResponses';
import { UNAUTHORIZEDEXCEPTION_RESPONSE_401 } from '../auth/docs/authResponses';

@ApiTags('Meal')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
  example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
})
@ApiExtraModels(CreateMealDto, UpdateMealDto, PaginationDto)
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @Auth([Role.USER])
  @UseInterceptors(FileInterceptor('file'), MealImageUrlInterceptor)
  @ResponseMessage('Meal created successfully')
  @ApiOperation({
    summary: 'Create or update a meal using image and/or AI answers',
    description: `
  **This endpoint supports two flows:**
  
  ---
  
  ### 📸 1. Image Upload (First Call)
  - Send an image file using \`multipart/form-data\` (key: \`file\`).
  - The server creates a new meal and performs AI analysis.
  - If the AI detects more information is needed, it responds with:
  
  API Response when ai needs more information:

  \`\`\`json
  {
    "questions": [
      {
        "question": "¿Qué ingredientes tiene el plato?",
        "options": ["ARROZ", "CARNE", "VERDURAS"]
      },
      {
        "question": "¿Qué nivel de grasa tiene?",
        "options": ["Alta", "Media", "Baja"]
      }
    ],
    "mealId": "7ab123d1-fd44-4b87-bb47-43f38fa83e89"
  }
  \`\`\`
  
  ---
  
  ### 📝 2. Answer Submission (Second Call)
  - Send an object with:
    - \`mealId\`: ID of the meal to update.
    - \`data: QuestionDto[]\`: Array of questions with answers.
  - This updates the existing meal and completes the AI analysis.

  Example of Dto that you need to send to complete the ai analysis:
  
  \`\`\`json
  {
    "mealId": "7ab123d1-fd44-4b87-bb47-43f38fa83e89",
    "data": [
      {
        "question": "What ingredients does the dish have?",
        "options": ["CHICKEN", "RICE", "VEGETABLES"],
        "answer": ["chicken", "rice"]
      },
      {
        "question": "What is the fat level?",
        "options": ["High", "Medium", "Low"],
        "answer": ["Medium"]
      }
    ]
  }
  \`\`\`
  
  ---
  
  **Note:** You must provide **either** a \`file\` **or the object** \`mealId + data\`, but **not both**.
  `,
  })
  @ApiConsumes('multipart/form-data')
  @ApiExtraModels(CreateMealDto)
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateMealDto) },
        {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description:
                'Optional image file of the meal (only for first call)',
            },
          },
          required: [],
        },
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Meal created successfully or updated after AI analysis',
    examples: {
      createSuccess: {
        summary: 'Meal created with full AI analysis (no questions)',
        value: POST_MEAL_RESPONSE_SUCCESS_201,
      },
      createWithQuestions: {
        summary: 'Meal created, questions returned by AI',
        value: POST_MEAL_RESPONSE_QUESTION_201,
      },
      createWithSuccessV2: {
        summary: 'Alternative response format with enriched data',
        value: POST_MEAL_RESPONSE_SUCCESS_201_V2,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Meal not found',
    example: MEAL_DOSENT_EXIST_404,
  })
  @ApiResponse({
    status: 400,
    description: 'No answers provided for AI follow-up analysis',
    example: NO_ANSWER_PROVIDED_400,
  })
  @ApiResponse({
    status: 400,
    description: "You can't access this meal",
    example: CANT_ACCESS_MEAL_401,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
  })
  async create(
    @ActiveUser() user: User,
    @Body() createMealDto: CreateMealDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.mealService.create(file, createMealDto, user);
  }
  @Get()
  @UseInterceptors(MealImageUrlInterceptor)
  @Auth([Role.USER])
  @ResponseMessage('Meals obtained successfully')
  @ApiOperation({ summary: 'Get all meals' })
  @ApiResponse({
    status: 200,
    description: 'Meals obtained successfully',
    example: GET_ALL_MEALS_BY_USERID_200,
  })
  @ApiResponse({
    status: 200,
    description: 'No meals found',
    example: GET_ALL_MEALS_BY_USERID_200_EMPTY,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
  })
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
  @ApiOperation({ summary: 'Get meal by id' })
  @ApiResponse({
    status: 200,
    description: 'Meal obtained successfully',
    example: GET_MEAL_BY_ID_200,
  })
  @ApiResponse({
    status: 400,
    description: "You can't access this meal",
    example: CANT_ACCESS_MEAL_401,
  })
  @ApiResponse({
    status: 404,
    description: 'Meal not found',
    example: MEAL_DOSENT_EXIST_404,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
  })
  async findOne(@Param('mealId') mealId: string, @ActiveUser() user: User) {
    return this.mealService.findOne(mealId, user);
  }

  @Patch(':mealId')
  @UseInterceptors(MealImageUrlInterceptor)
  @ApiOperation({ summary: "Update Meal (still doesn't work)" })
  async update(
    @Param('mealId') mealId: string,
    @Body() updateMealDto: UpdateMealDto,
  ) {
    return this.mealService.update(mealId, updateMealDto);
  }

  @Delete(':mealId')
  @UseInterceptors(MealImageUrlInterceptor)
  @Auth([Role.USER])
  @ResponseMessage('Meal deleted successfully')
  @ApiOperation({ summary: 'Delete meal' })
  @ApiResponse({
    status: 200,
    description: 'Meal deleted successfully',
    example: DELETE_MEAL_200,
  })
  @ApiResponse({
    status: 401,
    description: "You can't access this meal",
    example: CANT_ACCESS_MEAL_401,
  })
  @ApiResponse({
    status: 404,
    description: "This meal doesn't exist",
    example: MEAL_DOSENT_EXIST_404,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
  })
  async remove(@Param('mealId') mealId: string, @ActiveUser() user: User) {
    return this.mealService.remove(mealId, user);
  }
}
