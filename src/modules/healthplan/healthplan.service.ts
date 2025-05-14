import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateHealthplanDto } from './dto/update-healthplan.dto';
import { Service } from 'src/service';
import { HealthPlan, User } from '@prisma/client';
import { GenerateInitialHealthPlanDto } from './dto/generateInitialHealthPlan.dto';

@Injectable()
export class HealthplanService extends Service {
  constructor() {
    super(HealthplanService.name);
  }
  async create(formId: string) {
    const form = await this.prisma.healthPlanForm.findUnique({
      where: { id: formId },
      include: { user: { include: { userDetail: true } } },
    });
    if (!form) throw new NotFoundException('Form not found');
    const userDetail = form.user.userDetail;
    if (!userDetail) throw new NotFoundException('UserDetail missing');

    const age = Math.floor(
      (Date.now() - userDetail.dateOfBirth.getTime()) /
        (365.25 * 24 * 60 * 60 * 1000),
    );

    const weight = userDetail.weight;
    const heightCm = userDetail.height * 100;
    let BMR: number;
    if (userDetail.gender === 'MALE') {
      BMR = 10 * weight + 6.25 * heightCm - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * heightCm - 5 * age - 161;
    }

    const activityMap = {
      LOW_0_2: 1.2,
      MEDIUM_3_5: 1.55,
      HIGH_6_PLUS: 1.725,
    } as const;
    const factor = activityMap[form.workoutsPerWeek];
    const TDEE = BMR * factor;

    let dailyCalorieAdjustment = 0;
    const kcalPerKg = 7700;
    const kcalWeekly = form.weightChangePerWeek * kcalPerKg;
    if (form.goal === 'GAIN_WEIGHT') {
      dailyCalorieAdjustment = kcalWeekly / 7;
    } else if (form.goal === 'LOSE_WEIGHT') {
      dailyCalorieAdjustment = -kcalWeekly / 7;
    }

    const dailyCalories = TDEE + dailyCalorieAdjustment;

    const proteinGrams = weight * 1.6;
    const proteinCalories = proteinGrams * 4;
    const fatCalories = dailyCalories * 0.25;
    const fatGrams = fatCalories / 9;
    const remainCal = dailyCalories - (proteinCalories + fatCalories);
    const carbGrams = remainCal / 4;
    return this.prisma.healthPlan.create({
      data: {
        userId: form.userId,
        healthPlanformId: form.id,
        dailyCalories,
        dailyProtenis: proteinGrams,
        dailyCarbohydrates: carbGrams,
        dailyFats: fatGrams,
        globalStatus: 'ACTIVE',
      },
    });
  }

  async generatePlan(
    generateInitialGoalDto: GenerateInitialHealthPlanDto,
    user: User,
  ): Promise<HealthPlan> {
    const userFind = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        userDetail: true,
      },
    });

    if (
      userFind.userDetail &&
      userFind.userDetail.isInitialHealthPlanFormComplete === true
    ) {
      throw new UnauthorizedException('You Already did this form');
    }

    const userDetail = await this.prisma.userDetail.create({
      data: {
        userId: userFind.id,
        gender: generateInitialGoalDto.gender,
        dateOfBirth: new Date(generateInitialGoalDto.dateOfBirth),
        height: generateInitialGoalDto.height,
        weight: generateInitialGoalDto.weight,
        triedOtherApps: generateInitialGoalDto.triedOtherApps,
        isInitialHealthPlanFormComplete: true,
      },
    });

    const healthForm = await this.prisma.healthPlanForm.create({
      data: {
        userId: userFind.id,
        desiredWeight: generateInitialGoalDto.healthPlanForm.desiredWeight,
        workoutsPerWeek: generateInitialGoalDto.healthPlanForm.workoutsPerWeek,
        dietType: generateInitialGoalDto.healthPlanForm.dietType,
        breakFastTime: generateInitialGoalDto.healthPlanForm.breakFastTime,
        lunchTime: generateInitialGoalDto.healthPlanForm.lunchTime,
        dinnerTime: generateInitialGoalDto.healthPlanForm.dinnerTime,
        goal: generateInitialGoalDto.healthPlanForm.goal,
        weightChangePerWeek:
          generateInitialGoalDto.healthPlanForm.weightChangePerWeek,
        desiredOutcome: generateInitialGoalDto.healthPlanForm.desiredOutcome,
        mainChallenge: generateInitialGoalDto.healthPlanForm.mainChallenge,
      },
    });
    return await this.create(healthForm.id);
  }

  findAll() {
    return `This action returns all healthplan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthplan`;
  }

  update(id: number, updateHealthplanDto: UpdateHealthplanDto) {
    return `This action updates a #${id} healthplan`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthplan`;
  }
}
