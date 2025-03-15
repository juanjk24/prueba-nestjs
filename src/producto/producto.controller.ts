import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoEntity } from 'src/entities/producto/producto.entity';
import { CreateProductoDto } from './dto/create-produc.dto';
import { MessageDto } from 'src/common/message.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('producto')
export class ProductoController {
    constructor(
        private readonly _productoService: ProductoService,
    ) {}

    // crear un producto
    @Post()
    async crearProducto(@Body() producto: CreateProductoDto): Promise<MessageDto> {
        return await this._productoService.crearProducto(producto);
    }

    // obtener todos los productos
    @Get()
    async obtenerProductos(): Promise<ProductoEntity[]> {
        return await this._productoService.obtenerProductos();
    }

    // obtener un producto por id
    @Get(':id')
    async obtenerProducto(@Param('id', ParseIntPipe) id: number): Promise<ProductoEntity> {
        return await this._productoService.obtenerProducto(id);
    }

    // actualizar un producto
    @Put(':id')
    async actualizarProducto(@Param('id', ParseIntPipe) id: number, @Body() producto: UpdateProductoDto): Promise<MessageDto> {
        return await this._productoService.actualizarProducto(id, producto);
    }

    // eliminar un producto
    @Delete(':id')
    async eliminarProducto(@Param('id', ParseIntPipe) id: number): Promise<MessageDto> {
        return await this._productoService.eliminarProducto(id);
    }
}
