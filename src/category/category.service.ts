import { Injectable, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { GetCategoryDto } from './dto/getCategory.dto';

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

        const query = search ? { name: { contains: search, mode: "insensitive" } } : {}

        try {
            const [categories, totalItems] = await this.prisma.$transaction([
                this.prisma.category.findMany({
                    where: query,
                    skip: (page - 1) * limit,
                    take: limit
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
            const category = await this.prisma.category.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    subCategories: {
                        select: {
                            id: true,
                            name: true,
                            createdAt: true,
                            images: {
                                select: {
                                    id: true,
                                    url: true
                                }
                            }
                        }
                    }
                }
            })
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
