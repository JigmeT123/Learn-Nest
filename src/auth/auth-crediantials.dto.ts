import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateAuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "The password is too weak"})
  password: string;
}
