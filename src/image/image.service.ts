import { Injectable } from '@nestjs/common';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from './dto';
import * as path from 'path';
import { Multer } from 'multer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FindEntityByIdService } from 'src/common/FindEntityById.service';

@Injectable()
export class ImageService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly handleErrorsService: HandleErrorsService,
        private readonly cloudinary: CloudinaryService,
        private readonly findEntityByIdService: FindEntityByIdService
    ) { }

    async uploadImage(dto: CreateImageDto, file: Multer.File) {
        const { subCategoryId, categoryId } = dto

        try {
            await this.findEntityByIdService.findEntityById("subCategory", subCategoryId, null)
            await this.findEntityByIdService.findEntityById("category", categoryId, null)
            
            const ext = path.extname(file.originalname).toLowerCase();
            const isImage = /jpeg|jpg|png|gif/.test(ext);

            if (!isImage) this.handleErrorsService.throwBadRequestError('Only image files are allowed');

            const publicId = path.parse(file.filename).name;
            const folder = `images`;

            const upload = await this.cloudinary.uploadImage(file.path, publicId, folder);

            await this.prismaService.image.create({
                data: {
                    subCategoryId,
                    categoryId,
                    url: upload.secure_url,
                    cloudinaryPublicId: upload.public_id
                }
            })

            return {
                message: 'Image uploaded successfully'
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async deleteImage(id: string) {

        try {
            const image = await this.findEntityByIdService.findEntityById("image", id, { 
                cloudinaryPublicId: true
            })

            const { cloudinaryPublicId } = image

            await Promise.all([
                this.cloudinary.deleteImage(cloudinaryPublicId),
                this.prismaService.image.delete({
                    where: { id }
                })
            ])

            return {
                message: 'Image deleted successfully'
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
