import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto';
import { GetSubCategoryDto } from './dto/getSubCategory.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('sub-categories')
export class SubCategoryController {
    constructor(
        private readonly subCategoryService: SubCategoryService
    ) { }

    @Roles(Role.Admin)
    @Post("/create")
    createSubCategory(
        @Body() dto: CreateSubCategoryDto
    ) {
        return this.subCategoryService.createSubCategory(dto);
    }

    @Roles(Role.Admin)
    @Get('/get-all-sub-categories')
    getAllSubCategories() {
        return this.subCategoryService.getAllSubCategories();
    }

    @Roles(Role.Admin)
    @Get('/get-sub-category/:id')
    getSubCategoryById(
        @Param('id') id: string,
        @Query() dto: GetSubCategoryDto 
    ) {
        return this.subCategoryService.getSubCategoryById(id, dto);
    }

    @Roles(Role.Admin)
    @Patch('/update-sub-category/:id')
    updateSubCategory(
        @Param('id') id: string, 
        @Body() dto: UpdateSubCategoryDto
    ) {
        return this.subCategoryService.updateSubCategory(id, dto);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    deleteSubCategory(
        @Param('id') id: string
    ) {
        return this.subCategoryService.deleteSubCategory(id);
    }
}
