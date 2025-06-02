import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateARVTargetDto } from './dto';

@Injectable()
export class ArvtargetService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    createARVTarget(dto: CreateARVTargetDto) {

    }
}
