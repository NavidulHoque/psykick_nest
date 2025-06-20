import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class BaseCategoryDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    readonly name: string;
}
