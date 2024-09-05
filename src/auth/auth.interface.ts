import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface AuthServiceInterface {
  login(
    email: LoginDto['email'],
    password: LoginDto['password'],
  ): Promise<{ access_token: string }>;
  register(registerDto: RegisterDto): Promise<User>;
}
