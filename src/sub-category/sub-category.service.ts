import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { FindEntityByIdService } from 'src/common/FindEntityById.service';
import { UpdateSubCategoryDto } from './dto';
import { GetSubCategoryDto } from './dto/getSubCategory.dto';

@Injectable()
export class SubCategoryService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService,
        private readonly findEntityByIdService: FindEntityByIdService
    ) { }

    async createSubCategory(dto: CreateSubCategoryDto) {

        try {
            await this.prisma.subCategory.create({
                data: dto
            })

            return {
                message: "Sub-category created successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }

    }

    async getSubCategoryById(id: string, dto: GetSubCategoryDto) {

        const { page, limit } = dto

        try {
            const [subCategory, images, totalImages] = await this.prisma.$transaction([

                this.prisma.subCategory.findUnique({
                    where: { id },
                    select: {
                        id: true,
                        name: true,
                        createdAt: true
                    }
                }),

                this.prisma.image.findMany({
                    where: { subCategoryId: id },
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        url: true,
                        createdAt: true
                    },
                    take: limit,
                    skip: (page - 1) * limit
                }),

                this.prisma.image.count({
                    where: { subCategoryId: id }
                })
            ])

            return {
                message: "Sub-category fetched successfully.",
                data: {
                    subCategory,
                    images
                },
                pagination: {
                    totalItems: totalImages,
                    totalPages: Math.ceil(totalImages / limit),
                    currentPage: page,
                    itemsPerPage: limit
                }
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async updateSubCategory(id: string, dto: UpdateSubCategoryDto) {

        const { name } = dto

        try {
            await this.findEntityByIdService.findEntityById("subCategory", id, null)

            const subCategory = await this.prisma.subCategory.update({
                where: { id },
                data: { name },
                select: {
                    id: true,
                    name: true
                }
            });

            return {
                message: "Sub-category name updated successfully.",
                data: subCategory
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async deleteSubCategory(id: string) {

        try {
            await this.prisma.$transaction([
                this.prisma.subCategory.delete({
                    where: { id }
                }),

                this.prisma.image.deleteMany({
                    where: { subCategoryId: id }
                })
            ])

            return {
                message: "Sub-category deleted successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
