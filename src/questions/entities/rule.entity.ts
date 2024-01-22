import { ApiProperty } from '@nestjs/swagger';

export class RuleEntity {
  constructor(partial: Partial<RuleEntity>) {
    Object.assign(this, partial);
  }

  // @ApiProperty()
  // singleResult: boolean;

  // @ApiProperty()
  // groupScore: boolean;

  @ApiProperty()
  scoreAction: string;

  @ApiProperty()
  processingRule: string;

  @ApiProperty()
  valueA: number;

  @ApiProperty()
  valueB: number;

  @ApiProperty()
  scoreToAdd: number;
}
