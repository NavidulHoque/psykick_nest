import { IsString, IsNotEmpty } from 'class-validator';

export class BaseSubCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;
}
