import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';

export class AuthEntity {
  @ApiProperty()
  user: UserEntity | null;

  @ApiProperty()
  token: string;

  @ApiProperty()
  role: string | null;
}
