import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { HandleErrorsService } from 'src/common/handleErrors.service';

@Injectable()
export class SubCategoryService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService
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

    async getSubCategoryById(id: string){

        try {
            return await this.prisma.subCategory.findUnique({
                where: { id },
                include: {
                    images: {
                        select: {
                            url: true
                        }
                    }
                }
            });
        } 
        
        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async updateSubCategory(id: string, name: string) {

        try {
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
