import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleErrorsService } from './handleErrors.service';

@Injectable()
export class FindEntityByIdService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService
    ) { }

    async findEntityById(modelName: string, id: string, select: any | null) {

        if (!select) {

            const entity = await this.prisma[modelName].findUnique({ where: { id } })

            if (!entity) {
                this.handleErrorsService.throwNotFoundError(`${modelName} not found`)
            }

            return
        }

        else if (select) {

            const entity = await this.prisma[modelName].findUnique({
                where: { id },
                select
            })

            if (!entity) {
                this.handleErrorsService.throwNotFoundError(`${modelName} not found`)
            }

            return entity
        }
    }
}