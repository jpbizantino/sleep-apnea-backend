import { PartialType } from '@nestjs/swagger';
import { CreateGroupedFieldDto } from './create-grouped-field.dto';

export class UpdateGroupedFieldDto extends PartialType(CreateGroupedFieldDto) {}
