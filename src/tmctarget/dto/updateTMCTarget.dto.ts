import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { StatusTMCTargetDto } from "./statusTMCTarget.dto";

export class UpdateTMCTargetDto extends StatusTMCTargetDto {

    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    @IsOptional()
    readonly gameTime?: Date;

    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    @IsOptional()
    readonly revealTime?: Date;

    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    @IsOptional()
    readonly bufferTime?: Date;
}