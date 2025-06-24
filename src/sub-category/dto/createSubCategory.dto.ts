import { IsString, IsNotEmpty } from 'class-validator';
import { BaseSubCategoryDto } from './baseSubCategory.dto';

export class CreateSubCategoryDto extends BaseSubCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  readonly categoryId: string;
}
