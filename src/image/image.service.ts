import { Injectable } from '@nestjs/common';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from './dto/createImage.dto';

@Injectable()
export class ImageService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly handleErrorsService: HandleErrorsService
    ){}

    async uploadImage(dto: CreateImageDto){
        const { subCategoryId } = dto
        try {
            // await this.prismaService.image.create({
            //     data: {
            //         subCategoryId
            //     }
            // })

            return {
                message: 'Image uploaded successfully'
            }
        } 
        
        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async deleteImage(id: string){

        try {
            await this.prismaService.image.delete({
                where: { id }
            })
            
            return {
                message: 'Image deleted successfully'
            }
        } 
        
        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
