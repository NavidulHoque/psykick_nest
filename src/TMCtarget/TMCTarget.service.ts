import { Injectable } from '@nestjs/common';
import { HandleErrorsService } from 'src/common/handleErrors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTMCTargetDto, GetTMCTargetsDto, UpdateTMCTargetDto } from './dto';
import { FindEntityByIdService } from '../common/FindEntityById.service';

@Injectable()
export class TmctargetService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly handleErrorsService: HandleErrorsService,
        private readonly findEntityByIdService: FindEntityByIdService
    ) { }

    async createTMCTarget(dto: CreateTMCTargetDto) {

        const { images, revealTime, bufferTime, gameTime } = dto;

        if (new Date(gameTime).getTime() <= new Date().getTime()) {
            this.handleErrorsService.throwBadRequestError("Game time should be in the future");
        }

        else if (new Date(revealTime).getTime() < new Date(gameTime).getTime()) {
            this.handleErrorsService.throwBadRequestError("Reveal time should be in the future or equal to game time");
        }

        else if (new Date(bufferTime).getTime() < new Date(revealTime).getTime()) {
            this.handleErrorsService.throwBadRequestError("Buffer time should be in the future or equal to reveal time");
        }

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
                    include: {
                        images: {
                            select: {
                                image: {
                                    select: {
                                        id: true,
                                        url: true
                                    }
                                },
                                isTargetImage: true
                            }
                        },
                        usersPlayed: true
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

    async updateTMCTarget(dto: UpdateTMCTargetDto, id: string) {

        const { status: dtoStatus, revealTime: dtoRevealTime, bufferTime: dtoBufferTime, gameTime: dtoGameTime } = dto;

        let data = {};
        let message = '';

        try {

            const TMCTarget = await this.findEntityByIdService.findEntityById('tMCTarget', id, { gameTime: true, revealTime: true, bufferTime: true, status: true });

            const { gameTime: TMCTargetGameTime, revealTime: TMCTargetRevealTime, bufferTime: TMCTargetBufferTime, status: TMCTargetStatus } = TMCTarget;

            if (dtoStatus) {

                if (dtoStatus === "QUEUED") {

                    if (new Date(TMCTargetGameTime).getTime() < new Date().getTime()) {
                        this.handleErrorsService.throwBadRequestError("Current time exceeds game time");
                    }
                }

                data = { status: dtoStatus };

                message = "TMC target status updated successfully.";
            }

            else if (dtoGameTime || dtoRevealTime || dtoBufferTime) {

                if (TMCTargetStatus !== "QUEUED" && TMCTargetStatus !== "PENDING") {
                    this.handleErrorsService.throwBadRequestError("You can only update game time, reveal time and buffer time when the target is in QUEUED or PENDING status");
                }

                else if (dtoGameTime) {

                    if (new Date(TMCTargetRevealTime).getTime() < new Date(dtoGameTime).getTime()) {
                        this.handleErrorsService.throwBadRequestError("Reveal time should be in the future or equal to game time");
                    }

                    data = { gameTime: dtoGameTime }
                    message = "TMC target game time updated successfully.";
                }

                else if (dtoRevealTime) {
                    if (new Date(TMCTargetBufferTime).getTime() < new Date(dtoRevealTime).getTime()) {
                        this.handleErrorsService.throwBadRequestError("Buffer time should be in the future or equal to reveal time");
                    }

                    data = { revealTime: dtoRevealTime }
                    message = "TMC target reveal time updated successfully.";
                }

                else if (dtoBufferTime) {

                    data = { bufferTime: dtoBufferTime }
                    message = "TMC target buffer time updated successfully.";
                }
            }

            await this.prisma.tMCTarget.update({
                where: { id },
                data
            })

            return { message }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }

    async deleteTMCTarget(id: string) {

        try {

            const TMCTarget = await this.findEntityByIdService.findEntityById('tMCTarget', id, { status: true });

            if (TMCTarget.status !== "QUEUED" && TMCTarget.status !== "PENDING") {
                this.handleErrorsService.throwBadRequestError("You can only delete TMC target when it is in QUEUED or PENDING status");
            }

            await this.prisma.tMCTarget.delete({
                where: { id }
            })

            return { message: "TMC target deleted successfully." }
        }

        catch (error) {
            this.handleErrorsService.handleError(error)
        }
    }
}
