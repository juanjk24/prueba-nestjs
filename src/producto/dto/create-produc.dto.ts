import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  prod_nombre: string;

  @IsNumber()
  @IsNotEmpty()
  prod_precio: number;
}