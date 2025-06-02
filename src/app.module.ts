import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { ArvtargetModule } from './arvtarget/arvtarget.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { TmctargetModule } from './tmctarget/tmctarget.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CommonModule,
    ArvtargetModule,
    CategoryModule,
    SubCategoryModule,
    TmctargetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
