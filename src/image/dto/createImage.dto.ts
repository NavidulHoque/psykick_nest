import { IsNotEmpty, IsString } from "class-validator";

export class CreateImageDto {

    @IsString()
    @IsNotEmpty()
    readonly subCategoryId: string;
}