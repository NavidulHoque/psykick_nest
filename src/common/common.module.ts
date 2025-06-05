import { Module } from '@nestjs/common';
import { HandleErrorsService } from './handleErrors.service';
import { FindEntityByIdService } from './FindEntityById.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [HandleErrorsService, FindEntityByIdService],
    exports: [HandleErrorsService, FindEntityByIdService],
})
export class CommonModule {}
