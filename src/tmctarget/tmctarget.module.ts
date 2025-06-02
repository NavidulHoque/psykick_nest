import { Module } from '@nestjs/common';
import { TmctargetController } from './tmctarget.controller';
import { TmctargetService } from './tmctarget.service';

@Module({
  controllers: [TmctargetController],
  providers: [TmctargetService]
})
export class TmctargetModule {}
