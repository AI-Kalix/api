import { PartialType } from '@nestjs/swagger';
import { CreateHealthplanDto } from './create-healthplan.dto';

export class UpdateHealthplanDto extends PartialType(CreateHealthplanDto) {}
