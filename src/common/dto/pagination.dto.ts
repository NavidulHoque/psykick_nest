import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class PaginationDto{
    @Type(() => Number)
    @IsInt()
    @Min(1, { message: 'Page must be at least 1' })
    readonly page: number;

    @Type(() => Number)
    @IsInt()
    @Max(10, { message: 'Limit must be at most 10' })
    readonly limit: number;
}