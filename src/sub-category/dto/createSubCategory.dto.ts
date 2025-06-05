import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'Category ID is required' })
  readonly categoryId: string;
}
