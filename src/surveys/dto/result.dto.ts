import { ApiProperty } from '@nestjs/swagger';

export class ResultDto {
  @ApiProperty()
  positive: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  recomendation: string;

  @ApiProperty()
  score: number = 0;
}
