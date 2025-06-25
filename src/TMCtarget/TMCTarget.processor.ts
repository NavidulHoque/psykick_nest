import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TmctargetService } from './TMCTarget.service';

@Processor('tmctarget-queue')
export class TmctargetProcessor {
    constructor(
        private readonly tmctargetService: TmctargetService
    ) { }

    @Process('update-tmctarget-status')
    async handleUpdateTMCTargetStatus(job: Job) {
        await this.tmctargetService.updateTMCTarget(job.data.id, 'ACTIVE');
    }
}
