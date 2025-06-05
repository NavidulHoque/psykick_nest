import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, CommonModule, ConfigModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
