import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, CommonModule, PrismaModule, JwtModule.register({
    global: true,
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
