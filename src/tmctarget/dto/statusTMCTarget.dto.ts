import { TargetStatus } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class StatusTMCTargetDto {
    @IsString()
    @IsOptional()
    readonly status?: TargetStatus
}