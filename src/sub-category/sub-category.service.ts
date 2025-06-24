import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { FindEntityByIdService } from 'src/common/FindEntityById.service';
import { UpdateSubCategoryDto, GetSubCategoryDto, CreateSubCategoryDto } from './dto';
import { imageSelect, subCategorySelect } from 'src/prisma/prisma-selects';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class SubCategoryService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService,
        private readonly findEntityByIdService: FindEntityByIdService,
        private readonly cloudinaryService: CloudinaryService
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

    async getAllSubCategories() {

        try {
            const subCategories = await this.prisma.subCategory.findMany({
                orderBy: { createdAt: "desc" },
                select: subCategorySelect
            })

            return {
                message: "Sub-categories fetched successfully.",
                data: subCategories
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async getSubCategoryById(id: string, dto: GetSubCategoryDto) {

        const { page, limit } = dto

        try {
            await this.findEntityByIdService.findEntityById("subCategory", id, null)

            const [subCategory, images, totalImages] = await this.prisma.$transaction([

                this.prisma.subCategory.findUnique({
                    where: { id },
                    select: subCategorySelect
                }),

                this.prisma.image.findMany({
                    where: { subCategoryId: id },
                    orderBy: { createdAt: 'desc' },
                    select: imageSelect,
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

            await this.prisma.subCategory.update({
                where: { id },
                data: { name }
            });

            return {
                message: "Sub-category name updated successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async deleteSubCategory(id: string) {

        try {
            await this.findEntityByIdService.findEntityById("subCategory", id, null)

            // at first deleting child to avoid foreign key constraint
            const images = await this.prisma.image.findMany({
                where: { subCategoryId: id }
            })

            for (const image of images) {

                const { cloudinaryPublicId, id } = image
                
                await Promise.all([
                    this.cloudinaryService.deleteImage(cloudinaryPublicId),
                    this.prisma.image.delete({
                        where: { id }
                    })
                ])
            }

            //finally deleting parent
            await this.prisma.subCategory.delete({
                where: { id }
            })

            return {
                message: "Sub-category deleted successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
