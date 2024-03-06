import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(2, 32, { message: 'The username length is should be from 2 to 32 characters long.' })
  @ApiProperty({
    example: 'someCoolUser',
    required: true,
  })
  username!: string;

  @IsString()
  @Length(6, 12, { message: 'The password length is should be from 6 to 12 characters long.'})
  @ApiProperty({
    example: 'someCoolPassword',
    required: true,
  })
  password!: string;

  @IsString()
  @Length(6, 12, { message: 'The password length is should be from 6 to 12 characters long.'})
  @ApiProperty({
    example: 'someCoolPassword',
    required: true,
  })
  confirmPassword!: string;

  @IsString()
  @Length(6, 12, { message: 'The password length is should be from 6 to 12 characters long.'})
  @ApiProperty({
    example: '123-56-760',
    required: true,
  })
  phoneNumber!: string;
}
