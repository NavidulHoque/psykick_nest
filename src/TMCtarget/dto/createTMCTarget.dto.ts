import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";

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
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ControlImageDto)
    readonly controlImages: ControlImageDto[]
}

class ControlImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}