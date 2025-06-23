import { Body, Controller, Delete, Param, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CreateImageDto } from './dto'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/cloudinary/multer.config';
import { Multer } from 'multer';

@UseGuards(AuthGuard, RolesGuard)
@Controller('images')
export class ImageController {

    constructor(
        private readonly imageService: ImageService
    ){}

    @Roles(Role.Admin)
    @Post('upload')
    @UseInterceptors(FileInterceptor('image', multerOptions))
    uploadImage(
        @UploadedFile() file: Multer.File,
        @Body() dto: CreateImageDto
    ){
        return this.imageService.uploadImage(dto, file)
    }

    @Roles(Role.Admin)
    @Delete(':id')
    deleteImage(
        @Param('id') id: string,
    ){
        return this.imageService.deleteImage(id)
    }
}
