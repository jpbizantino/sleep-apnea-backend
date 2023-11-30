import { ApiProperty } from '@nestjs/swagger';
import { Choice } from '@prisma/client';

export class ChoiceEntity implements Choice {
  constructor(partial: Partial<ChoiceEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  choiceId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  choiceValue: number;

  @ApiProperty()
  order: number;
}
