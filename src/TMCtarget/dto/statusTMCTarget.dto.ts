import { TargetStatus } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class StatusTMCTargetDto {
    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toUpperCase())
    @IsEnum(TargetStatus, { message: 'Status must be pending, active, partiallyActive, queued or completed' })
    readonly status?: TargetStatus
}