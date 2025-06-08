import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('sub-category')
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
    @Get('/get-sub-category/:id')
    getSubCategoryById(
        @Param('id') id: string,
        @Query("page") page: number,
        @Query("limit") limit: number
    ) {
        return this.subCategoryService.getSubCategoryById(id, page, limit);
    }

    @Roles(Role.Admin)
    @Patch('/update-sub-category:id')
    updateSubCategory(
        @Param('id') id: string, 
        @Body("name") name: string
    ) {
        return this.subCategoryService.updateSubCategory(id, name);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    deleteSubCategory(
        @Param('id') id: string
    ) {
        return this.subCategoryService.deleteSubCategory(id);
    }
}
