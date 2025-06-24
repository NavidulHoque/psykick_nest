import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTMCTargetDto {
    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    readonly gameTime: Date;
    
    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    readonly revealTime: Date;

    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    readonly bufferTime: Date;

    @IsString()
    @IsNotEmpty()
    readonly targetImage: string

    @IsArray()
    @IsNotEmpty()
    @ArrayNotEmpty()
    @IsString({ each: true })
    readonly controlImages: string[]
}