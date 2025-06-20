import { Injectable, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { GetCategoryDto } from './dto/getCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService
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
                    select: {
                        id: true,
                        name: true,
                        createdAt: true
                    }
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

        const { page, limit } = dto

        try {
            const [category, subCategories, totalSubCategories] = await this.prisma.$transaction([
                this.prisma.category.findUnique({
                    where: { id },
                    select: {
                        id: true,
                        name: true,
                        createdAt: true
                    }
                }),

                this.prisma.subCategory.findMany({
                    where: { categoryId: id },
                    skip: (page - 1) * limit,
                    take: limit,
                    select: {
                        id: true,
                        name: true,
                        createdAt: true
                    }
                }),

                this.prisma.subCategory.count({
                    where: { categoryId: id }
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
            const category = await this.prisma.category.update({
                where: { id },
                data: { name },
                select: {
                    id: true,
                    name: true
                }
            });

            return {
                message: "Category name updated successfully.",
                data: category
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async deleteCategory(id: string) {

        try {
            await this.prisma.$transaction([
                this.prisma.category.delete({
                    where: { id }
                }),

                this.prisma.subCategory.deleteMany({
                    where: { categoryId: id }
                }),

                this.prisma.image.deleteMany({
                    where: { categoryId: id }
                })
            ])

            return {
                message: "Category deleted successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
