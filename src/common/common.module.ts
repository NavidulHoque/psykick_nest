import { Module } from '@nestjs/common';
import { HandleErrorsService } from './handleErrors.service';

@Module({
    providers: [HandleErrorsService],
    exports: [HandleErrorsService],
})
export class CommonModule {}
