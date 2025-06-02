import {
    IsDate,
    IsNotEmpty,
    IsString,
} from 'class-validator';

import { Type } from "class-transformer";

export class CreateARVTargetDto {

    @IsString()
    @IsNotEmpty({ message: 'Event Name is required' })
    readonly eventName: string;

    @IsString()
    @IsNotEmpty({ message: 'Event Description is required' })
    readonly eventDescription: string;

    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    readonly gameTime: Date;

    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    readonly revealTime: Date;

    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    readonly outcomeTime: Date;

    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid date' })
    readonly bufferTime: Date;

    @IsString()
    @IsNotEmpty({ message: 'Control Image is required' })
    readonly controlImage: string;
}
