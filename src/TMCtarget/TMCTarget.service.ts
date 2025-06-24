import { Injectable } from '@nestjs/common';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTMCTargetDto, GetTMCTargetsDto, UpdateTMCTargetDto } from './dto';
import { contains } from 'class-validator';

@Injectable()
export class TmctargetService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService
    ) { }

    async createTMCTarget(dto: CreateTMCTargetDto) {

        const { images, revealTime, bufferTime, gameTime } = dto;

        let code: string;
        let isARVTargetCodeExists: boolean, isTMCTargetCodeExists: boolean;

        do {
            code = this.generateCode();

            isARVTargetCodeExists = !!(await this.prisma.aRVTarget.findUnique({
                where: { code }
            }));

            isTMCTargetCodeExists = !!(await this.prisma.tMCTarget.findUnique({
                where: { code }
            }));

        } while (isARVTargetCodeExists || isTMCTargetCodeExists);

        if (new Date(revealTime).getTime() < new Date(gameTime).getTime()) {
            this.handleErrorsService.throwBadRequestError("Reveal time should be in the future or equal to game time");
        }

        else if (new Date(revealTime).getTime() > new Date(bufferTime).getTime()) {
            this.handleErrorsService.throwBadRequestError("Reveal time should be in the past or equal to buffer time");
        }

        try {

            const TMCTarget = await this.prisma.tMCTarget.create({
                data: {
                    code,
                    revealTime,
                    bufferTime,
                    gameTime
                }
            })

            for (const image of images) {
                if (image.isTargetImage) {
                    await this.prisma.tMCTargetImages.create({
                        data: {
                            TMCTargetId: TMCTarget.id,
                            imageId: image.id,
                            isTargetImage: true
                        }
                    })
                }

                else {
                    await this.prisma.tMCTargetImages.create({
                        data: {
                            TMCTargetId: TMCTarget.id,
                            imageId: image.id
                        }
                    })
                }
            }

            return {
                message: "TMC target created successfully."
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    private generateCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {

            if (i === 3) {
                result += '-';
            }

            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }

    async getAllTMCTargets(dto: GetTMCTargetsDto) {

        const { page, limit, status } = dto;

        const query = status ? { status } : {}

        try {

            const [TMCTargets, totalItems] = await this.prisma.$transaction([
                this.prisma.tMCTarget.findMany({
                    where: query,
                    orderBy: { createdAt: "desc" },
                    skip: (page - 1) * limit,
                    take: limit,
                    select: {
                        id: true,
                        code: true,
                        status: true,
                        createdAt: true
                    }
                }),

                this.prisma.tMCTarget.count({
                    where: query
                })
            ])

            return {
                message: "TMC targets fetched successfully.",
                data: TMCTargets,
                pagination: {
                    totalItems,
                    totalPages: Math.ceil(totalItems / limit),
                    currentPage: page,
                    itemsPerPage: limit
                }
            }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async updateTMCTarget(dto: UpdateTMCTargetDto) {

        try {

        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async deleteTMCTarget(id: string) {

        try {

        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
