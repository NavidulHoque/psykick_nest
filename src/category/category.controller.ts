import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { GetCategoryDto } from './dto/getCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}

    @Roles(Role.Admin)
    @Post('/create')
    createCategory(
        @Body() dto: CreateCategoryDto
    ) {
        return this.categoryService.createCategory(dto);
    }

    @Roles(Role.Admin)
    @Get('/get-all-categories')
    getAllCategories(
        @Query() dto: GetCategoryDto
    ) {
        return this.categoryService.getAllCategories(dto);
    }

    @Roles(Role.Admin)
    @Get('/get-category/:id')
    getCategoryById(
        @Param('id') id: string,
        @Query() dto: GetCategoryDto
    ) {
        return this.categoryService.getCategoryById(id, dto);
    }

    @Roles(Role.Admin)
    @Put('/update-category/:id')
    updateCategory(
        @Body() dto: UpdateCategoryDto,
        @Param('id') id: string,
    ) {
        return this.categoryService.updateCategory(id, dto);
    }

    @Roles(Role.Admin)
    @Put('/delete-category/:id')
    deleteCategory(id: string) {
        return this.categoryService.deleteCategory(id);
    }
}
