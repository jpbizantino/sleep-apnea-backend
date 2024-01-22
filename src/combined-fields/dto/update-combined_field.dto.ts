import { PartialType } from '@nestjs/swagger';
import { CreateCombinedFieldDto } from './create-combined-field.dto';

export class UpdateCombinedFieldDto extends PartialType(
  CreateCombinedFieldDto,
) {}
