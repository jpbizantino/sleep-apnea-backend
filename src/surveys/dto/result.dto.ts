import { ApiProperty } from '@nestjs/swagger';

export class ResultDto {
  @ApiProperty()
  positive: boolean;

  @ApiProperty()
  determinations: string[];

  @ApiProperty()
  score: number = 0;
}
