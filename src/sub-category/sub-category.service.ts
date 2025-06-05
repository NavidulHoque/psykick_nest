import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { FindEntityByIdService } from 'src/common/FindEntityById.service';

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

    async getSubCategoryById(id: string) {

        try {
            const category = await this.findEntityByIdService.findEntityById("subCategory", id,
                {
                    images: {
                        select: {
                            url: true
                        }
                    }
                })

            return {
                message: "Sub-category fetched successfully.",
                data: category
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async updateSubCategory(id: string, name: string) {

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
            await this.prisma.subCategory.delete({
                where: { id }
            });

            return {
                message: "Sub-category deleted successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
