import { Module } from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CommonModule, PrismaModule, ConfigModule],
  controllers: [SubCategoryController],
  providers: [SubCategoryService]
})
export class SubCategoryModule {}
