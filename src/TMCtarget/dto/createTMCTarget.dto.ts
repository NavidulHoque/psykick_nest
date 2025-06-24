import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";

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

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly images: ImageDto[]
}

class ImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  isTargetImage: boolean;
}