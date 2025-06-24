import { Injectable, Get } from '@nestjs/common';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTMCTargetDto, GetTMCTargetsDto, UpdateTMCTargetDto } from './dto';

@Injectable()
export class TmctargetService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService
    ) { }

    async createTMCTarget(dto: CreateTMCTargetDto) {

        try {

        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async getAllTMCTargets(dto: GetTMCTargetsDto) {

        try {

        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async updateTMCTarget(dto: UpdateTMCTargetDto){

        try {
            
        } 
        
        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
