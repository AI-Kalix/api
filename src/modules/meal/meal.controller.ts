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
import { Meal, Role, User } from '@prisma/client';
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
  INVALID_IMAGE_400,
  MEAL_DOSENT_EXIST_404,
  NO_ANSWER_PROVIDED_400,
  POST_MEAL_RESPONSE_QUESTION_201,
  POST_MEAL_RESPONSE_SUCCESS_201,
  POST_MEAL_RESPONSE_SUCCESS_201_V2,
} from './docs/mealResponses';
import { UNAUTHORIZEDEXCEPTION_RESPONSE_401 } from '../auth/docs/authResponses';
import { QuestionDto } from './dto/aiResponse/question.dto';
import { MealResponseDto } from './dto/mealApiResponses/meal.response.dto';
import { ApiResponseDto } from 'src/common/apiResponse.dto';
import { AiQuestionResponseDto } from './dto/mealApiResponses/aiQuestionResponse.dto';
import { ApiErrorResponseDto } from 'src/common/apiErrorResponse.dto';
import { MealPaginatedResponseDto } from './dto/mealApiResponses/mealPaginatedResponse.dto';

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
@ApiExtraModels(
  CreateMealDto,
  UpdateMealDto,
  PaginationDto,
  QuestionDto,
  ApiResponseDto,
  MealResponseDto,
  AiQuestionResponseDto,
  ApiErrorResponseDto,
  MealPaginatedResponseDto,
)
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @Auth([Role.USER])
  @UseInterceptors(FileInterceptor('file'), MealImageUrlInterceptor)
  @ResponseMessage('Meal created successfully')
  @ApiOperation({
    summary: 'Meal AI Analysis',
    description: `
  **This endpoint supports two flows:**
  
  ---
  
  ### 📸 1. Image Upload (First Call)
  - Send an image file using \`multipart/form-data\` (key: \`file\`).
  - The server creates a new meal and performs AI analysis.
  - If the AI detects more information is needed, it responds with:
  
  \`\`\`json
  {
    "questions": [
      {
        "choiceType": "MULTIPLE",
        "question": "What ingredients does the dish have?",
        "options": ["CHICKEN", "RICE", "VEGETABLES"]
      },
      {
        "choiceType": "SINGLE",
        "question": "What is the fat level?",
        "options": ["High", "Medium", "Low"]
      }
    ],
    "id": "7ab123d1-fd44-4b87-bb47-43f38fa83e89"
  }
  \`\`\`
  
  ---
  
  ### 📝 2. Answer Submission (Second Call)
  - Send an object with:
    - \`mealId\`: ID of the meal to update.
    - \`data: QuestionDto[]\`: Array of questions with answers.
  
  Example of Dto that you need to send to complete the ai analysis:
  
  \`\`\`json
  {
    "mealId": "7ab123d1-fd44-4b87-bb47-43f38fa83e89",
    "data": [
      {
        "choiceType": "MULTIPLE",
        "question": "What ingredients does the dish have?",
        "options": ["CHICKEN", "RICE", "VEGETABLES"],
        "answer": ["CHICKEN", "RICE"]
      },
      {
        "choiceType": "SINGLE",
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
  @ApiExtraModels(
    CreateMealDto,
    ApiResponseDto,
    ApiErrorResponseDto,
    MealResponseDto,
    AiQuestionResponseDto,
    QuestionDto,
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        mealId: { type: 'string', description: 'Optional ID of the meal' },
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(QuestionDto) },
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Optional image file of the meal (only for first call)',
        },
      },
      required: [],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Meal created successfully or updated after AI analysis',
    content: {
      'application/json': {
        schema: {
          oneOf: [
            {
              title: 'MealResponse',
              allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                  properties: {
                    data: { $ref: getSchemaPath(MealResponseDto) },
                  },
                },
              ],
            },
            {
              title: 'AiQuestionsResponse',
              allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                  properties: {
                    data: { $ref: getSchemaPath(AiQuestionResponseDto) },
                  },
                },
              ],
            },
          ],
        },
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
            summary: 'Meal created affter answering AI questions',
            value: POST_MEAL_RESPONSE_SUCCESS_201_V2,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - multiple causes',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        examples: {
          noAnswers: {
            summary: 'No answers provided',
            value: NO_ANSWER_PROVIDED_400,
          },
          invalidImage: {
            summary: 'Invalid image',
            value: INVALID_IMAGE_400,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized or forbidden access',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        examples: {
          unauthorized: {
            summary: 'Not authenticated',
            value: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
          },
          forbidden: {
            summary: "Can't access meal",
            value: CANT_ACCESS_MEAL_401,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Resource not found',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        examples: {
          mealNotFound: {
            summary: 'Meal not found',
            value: MEAL_DOSENT_EXIST_404,
          },
        },
      },
    },
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
  @ApiOperation({ summary: 'Get all meals by authUser' })
  @ApiResponse({
    status: 200,
    description: 'Meals obtained successfully',
    content: {
      'application/json': {
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
              properties: {
                data: { $ref: getSchemaPath(MealPaginatedResponseDto) },
              },
            },
          ],
        },
        examples: {
          hasMeals: {
            summary: 'User has meals',
            value: GET_ALL_MEALS_BY_USERID_200,
          },
          emptyMeals: {
            summary: 'No meals found',
            value: GET_ALL_MEALS_BY_USERID_200_EMPTY,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
      },
    },
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
    content: {
      'application/json': {
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
              properties: {
                data: { $ref: getSchemaPath(MealResponseDto) },
              },
            },
          ],
        },
        example: GET_MEAL_BY_ID_200,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "You can't access this meal",
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        example: CANT_ACCESS_MEAL_401,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Meal not found',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        example: MEAL_DOSENT_EXIST_404,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
      },
    },
  })
  async findOne(
    @Param('mealId') mealId: string,
    @ActiveUser() user: User,
  ): Promise<Meal> {
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
    content: {
      'application/json': {
        schema: {
          allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
              properties: {
                data: { $ref: getSchemaPath(MealResponseDto) },
              },
            },
          ],
        },
        example: DELETE_MEAL_200,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "You can't access this meal",
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        example: CANT_ACCESS_MEAL_401,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "This meal doesn't exist",
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        example: MEAL_DOSENT_EXIST_404,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
        example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
      },
    },
  })
  async remove(
    @Param('mealId') mealId: string,
    @ActiveUser() user: User,
  ): Promise<Meal> {
    return this.mealService.remove(mealId, user);
  }
}
