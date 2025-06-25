import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TmctargetService } from './TMCTarget.service';
import { AuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CreateTMCTargetDto, GetTMCTargetsDto, UpdateTMCTargetDto } from './dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('tmctargets')
export class TmctargetController {

    constructor(
        private readonly tmctargetService: TmctargetService
    ) { }

    @Roles(Role.Admin)
    @Post('/create-TMC-Target')
    createTMCTarget(
        @Body() dto: CreateTMCTargetDto
    ) {
        return this.tmctargetService.createTMCTarget(dto)
    }

    @Roles(Role.Admin)
    @Get('/get-all-TMC-Targets')
    getAllTMCTargets(
        @Query() dto: GetTMCTargetsDto
    ) {
        return this.tmctargetService.getAllTMCTargets(dto)
    }

    @Roles(Role.Admin)
    @Patch('/update-TMC-Target/:id')
    updateTMCTarget(
        @Body() dto: UpdateTMCTargetDto,
        @Param("id") id: string
    ) {
        return this.tmctargetService.updateTMCTarget(dto, id)
    }

    @Roles(Role.Admin)
    @Delete('/delete-TMC-Target/:id')
    deleteTMCTarget(
        @Param('id') id: string
    ) {
        this.tmctargetService.deleteTMCTarget(id)
    }
}
