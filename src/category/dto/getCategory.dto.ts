import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetCategoryDto {

    @Type(() => Number)
    @IsInt()
    @Min(1, { message: 'Page must be at least 1' })
    readonly page: number;

    @Type(() => Number)
    @IsInt()
    @Max(10, { message: 'Limit must be at most 10' })
    readonly limit: number;

    @IsString()
    @IsOptional()
    readonly search?: string;
}
