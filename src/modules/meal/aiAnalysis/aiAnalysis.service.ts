import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AIResponseDto } from '../dto/aiResponse/aiResponse.dto';
import { AnalyzeMealDto } from '../dto/aiResponse/analyzeMealDto';

@Injectable()
export class AiAnalysisService {
  constructor(private httpService: HttpService) {}

  async analyze(data: AnalyzeMealDto): Promise<AIResponseDto> {
    const url = 'url/ia';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error calling external AI API:',
        error?.response?.data || error,
      );
      throw new BadRequestException('Error calling AI service');
    }
  }
}
