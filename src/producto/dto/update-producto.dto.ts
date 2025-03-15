import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  prod_nombre?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  prod_precio?: number;
}