import { IsString, IsNotEmpty } from 'class-validator';
import { BaseSubCategoryDto } from './baseSubCategory.dto';

export class CreateSubCategoryDto extends BaseSubCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category ID is required' })
  readonly categoryId: string;
}
