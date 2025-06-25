import { Module } from '@nestjs/common';
import { TmctargetController } from './TMCTarget.controller';
import { TmctargetService } from './TMCTarget.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tmctarget-queue',
    }),
    PrismaModule, 
    CommonModule, 
    ConfigModule
  ],
  controllers: [TmctargetController],
  providers: [TmctargetService]
})
export class TmctargetModule {}
