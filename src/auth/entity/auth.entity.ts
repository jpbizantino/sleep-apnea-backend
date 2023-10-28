import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class AuthEntity {
  @ApiProperty()
  user: UserEntity | null;

  @ApiProperty()
  token: string;

  @ApiProperty()
  role: string | null;
}
