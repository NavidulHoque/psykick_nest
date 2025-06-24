import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateTMCTargetDto {
    @Type(() => Date)
    @IsDate({ message: 'Game Time must be a valid date' })
    readonly gameTime: Date;
    
    @Type(() => Date)
    @IsDate({ message: 'Reaveal Time must be a valid date' })
    readonly revealTime: Date;

    @Type(() => Date)
    @IsDate({ message: 'Buffer Time must be a valid date' })
    readonly bufferTime: Date;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    readonly images: ImageDto[]
}

class ImageDto {
  @IsString()
  @IsNotEmpty({message: "url is required"})
  url: string;

  @IsString()
  @IsNotEmpty({message: "id is required"})
  id: string;

  @IsBoolean()
  @IsNotEmpty({message: "isTargetImage is required"})
  isTargetImage: boolean;
}