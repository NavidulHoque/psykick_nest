import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto';

export class GetCategoryDto extends PaginationDto {

    @IsString()
    @IsOptional()
    readonly search?: string;
}
