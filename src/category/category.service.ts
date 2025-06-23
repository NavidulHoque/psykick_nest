import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { GetCategoryDto } from './dto/getCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { categorySelect, subCategorySelect } from 'src/prisma/prisma-selects';
import { FindEntityByIdService } from 'src/common/FindEntityById.service';

@Injectable()
export class CategoryService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService,
        private readonly findEntityByIdService: FindEntityByIdService
    ) { }

    async createCategory(dto: CreateCategoryDto) {
        try {
            await this.prisma.category.create({
                data: dto
            });

            return {
                message: "Category created successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async getAllCategories(dto: GetCategoryDto) {

        const { search, page, limit } = dto;

        const query = search ? { name: { contains: search } } : {}

        try {
            const [categories, totalItems] = await this.prisma.$transaction([
                this.prisma.category.findMany({
                    where: query,
                    orderBy: { createdAt: "desc" },
                    skip: (page - 1) * limit,
                    take: limit,
                    select: categorySelect
                }),

                this.prisma.category.count({
                    where: query
                })
            ])

            return {
                message: "Categories fetched successfully.",
                data: categories,
                pagination: {
                    totalItems,
                    totalPages: Math.ceil(totalItems / limit),
                    currentPage: page,
                    itemsPerPage: limit
                }
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async getCategoryById(id: string, dto: GetCategoryDto) {

        const { page, limit, search } = dto

        const query = search ? { name: { contains: search }, categoryId: id } : { categoryId: id }

        try {
            await this.findEntityByIdService.findEntityById("category", id, null)

            const [category, subCategories, totalSubCategories] = await this.prisma.$transaction([
                this.prisma.category.findUnique({
                    where: { id },
                    select: categorySelect
                }),

                this.prisma.subCategory.findMany({
                    where: query,
                    orderBy: { createdAt: "desc" },
                    skip: (page - 1) * limit,
                    take: limit,
                    select: subCategorySelect
                }),

                this.prisma.subCategory.count({
                    where: query
                })
            ])

            return {
                message: "Category fetched successfully.",
                data: {
                    category,
                    subCategories
                },
                pagination: {
                    totalItems: totalSubCategories,
                    totalPages: Math.ceil(totalSubCategories / limit),
                    currentPage: page,
                    itemsPerPage: limit
                }
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async updateCategory(id: string, dto: UpdateCategoryDto) {

        const { name } = dto

        try {
            await this.findEntityByIdService.findEntityById("category", id, null)

            await this.prisma.category.update({
                where: { id },
                data: { name }
            });

            return {
                message: "Category name updated successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async deleteCategory(id: string) {

        try {
            await this.findEntityByIdService.findEntityById("category", id, null)

            //need to delete child first before deleting parent
            await this.prisma.$transaction([

                this.prisma.subCategory.deleteMany({
                    where: { categoryId: id }
                }),

                this.prisma.image.deleteMany({
                    where: { categoryId: id }
                })
            ])

            await this.prisma.category.delete({
                where: { id }
            })

            return {
                message: "Category deleted successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
