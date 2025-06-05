import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CreateImageDto } from './dto/createImage.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('images')
export class ImageController {

    constructor(
        private readonly imageService: ImageService
    ){}

    @Roles(Role.Admin)
    @Post('upload')
    uploadImage(
        @Body() dto: CreateImageDto
    ){
        return this.imageService.uploadImage(dto)
    }

    @Roles(Role.Admin)
    @Delete(':id')
    deleteImage(
        @Param('id') id: string,
    ){
        return this.imageService.deleteImage(id)
    }
}
