import { ApiProperty } from '@nestjs/swagger';

export class RuleEntity {
  constructor(partial: Partial<RuleEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  processingRule: string;

  @ApiProperty()
  valueA: number;

  @ApiProperty()
  valueB: number;
}
