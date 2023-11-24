import { PartialType } from '@nestjs/swagger';
import { CreateCalculatedFieldDto } from './create-calculated-field.dto';

export class UpdateCalculatedFieldDto extends PartialType(
  CreateCalculatedFieldDto,
) {}
