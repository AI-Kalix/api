import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HealthplanService } from './healthplan.service';
import { CreateHealthplanDto } from './dto/create-healthplan.dto';
import { UpdateHealthplanDto } from './dto/update-healthplan.dto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import {
  ALREADY_DID_INITIAL_HEALTH_FORM_401,
  INITIAL_HEALTH_PLAN_201,
} from '../auth/docs/authResponses';
import { GenerateInitialHealthPlanDto } from './dto/generateInitialHealthPlan.dto';
import { ActiveUser } from '../auth/decorators/session.decorator';
import { Role, User } from '@prisma/client';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';

@ApiTags("healthplan (still doesn't work)")
@ApiHeader({
  name: 'Healthplan (no está en funcionamiento)',
  description: 'Heltplan Endpoints',
})
@Controller('healthplan')
export class HealthplanController {
  constructor(private readonly healthplanService: HealthplanService) {}

  @Post()
  async create(@Param('formId') formId: string) {
    return this.healthplanService.create(formId);
  }

  @Post('generate-initialPlan')
  @Auth([Role.USER])
  @ApiOperation({ summary: 'Generate Initial Plan' })
  @ResponseMessage('Initial health plan generated successfully')
  @ApiResponse({
    status: 201,
    description: 'Initial health plan generated successfully',
    example: INITIAL_HEALTH_PLAN_201,
  })
  @ApiResponse({
    status: 401,
    description: 'User has already completed the initial health form',
    example: ALREADY_DID_INITIAL_HEALTH_FORM_401,
  })
  async generatePlan(
    @Body() generateInitialHealthPlanDto: GenerateInitialHealthPlanDto,
    @ActiveUser() user: User,
  ) {
    return this.healthplanService.generatePlan(
      generateInitialHealthPlanDto,
      user,
    );
  }

  @Get()
  async findAll() {
    return this.healthplanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.healthplanService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHealthplanDto: UpdateHealthplanDto,
  ) {
    return this.healthplanService.update(+id, updateHealthplanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.healthplanService.remove(+id);
  }
}
