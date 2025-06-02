import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enum/role.enum'; 
import { CreateARVTargetDto } from './dto';
import { ArvtargetService } from './arvtarget.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('arvtarget')
export class ArvtargetController {

    constructor(
        private readonly arvtargetService: ArvtargetService
    ) {}

    @Roles(Role.Admin)
    @Post("/create")
    createARVTarget(
        @Body() dto: CreateARVTargetDto
    ) {
        this.arvtargetService.createARVTarget(dto);
    }
    
}
