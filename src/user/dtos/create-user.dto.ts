import { IsString, Length, IsStrongPassword, ValidateIf, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isDeepStrictEqual } from 'util';

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
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 0,
    minSymbols: 1,
    minUppercase: 1
  })
  @ApiProperty({
    example: 'someCool!',
    required: true,
  })
  password!: string;

  @IsString()
  @ValidateIf((user: CreateUserDto) => Boolean(user.password === user.confirmPassword))
  @ApiProperty({
    example: 'someCool!',
    required: true,
  })
  confirmPassword!: string;

  @IsString()
  @Length(2, 10, { message: 'The phoneNumber length is should be from 2 to 10 characters long.'})
  @ApiProperty({
    example: '123-56-760',
    required: true,
  })
  phoneNumber!: string;
}
