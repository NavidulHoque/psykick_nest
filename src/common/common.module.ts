import { Module } from '@nestjs/common';
import { HandleErrorsService } from './handleErrors.service';
import { FindEntityByIdService } from './FindEntityById.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FetchUserService } from './fetchUser.service';

@Module({
    imports: [PrismaModule],
    providers: [HandleErrorsService, FindEntityByIdService, FetchUserService],
    exports: [HandleErrorsService, FindEntityByIdService, FetchUserService],
})
export class CommonModule {}
