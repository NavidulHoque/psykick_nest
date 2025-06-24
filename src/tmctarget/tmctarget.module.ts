import { Module } from '@nestjs/common';
import { TmctargetController } from './tmctarget.controller';
import { TmctargetService } from './tmctarget.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, CommonModule, ConfigModule],
  controllers: [TmctargetController],
  providers: [TmctargetService]
})
export class TmctargetModule {}
