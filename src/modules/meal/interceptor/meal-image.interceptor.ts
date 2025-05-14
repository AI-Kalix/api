import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Meal } from '@prisma/client';
import { S3Service } from 'src/modules/aws/s3/s3.service';

type MealWithUrl = Meal & { imageUrl: string };

@Injectable()
export class MealImageUrlInterceptor implements NestInterceptor {
  constructor(private readonly s3Service: S3Service) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data) => {
        const isMeal = (item: any): item is Meal =>
          item &&
          typeof item === 'object' &&
          'imageKey' in item &&
          'userId' in item;

        const transform = async (meal: Meal): Promise<MealWithUrl> => {
          const signedUrl = await this.s3Service.getUrl(meal.imageKey);
          return {
            ...meal,
            imageUrl: signedUrl,
          };
        };

        if (Array.isArray(data) && data.every(isMeal)) {
          return await Promise.all(data.map(transform));
        }

        if (
          data?.meals &&
          Array.isArray(data.meals) &&
          data.meals.every(isMeal)
        ) {
          const transformedMeals = await Promise.all(data.meals.map(transform));
          return {
            ...data,
            meals: transformedMeals,
          };
        }

        if (isMeal(data)) {
          return await transform(data);
        }

        return data;
      }),
      mergeMap((resultPromise) => resultPromise),
    );
  }
}
