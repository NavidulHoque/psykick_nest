import { Module } from '@nestjs/common';
import { ArvtargetController } from './arvtarget.controller';
import { ArvtargetService } from './arvtarget.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ConfigModule, JwtModule, CommonModule, PrismaModule],
  controllers: [ArvtargetController],
  providers: [ArvtargetService]
})
export class ArvtargetModule {}
