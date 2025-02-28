import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { ProductoEntity } from 'src/entities/producto/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity)
        private readonly _productoRepository: Repository<ProductoEntity>,
    ) {}

    // crear un producto
    async crearProducto (producto: ProductoEntity): Promise<MessageDto> {
        const nuevoProducto = this._productoRepository.create(producto);

        await this._productoRepository.save(nuevoProducto);
        
        return new MessageDto('Producto creado correctamente')
    }

    // obtener todos los productos
    async obtenerProductos(): Promise<ProductoEntity[]> {
        return await this._productoRepository
            .createQueryBuilder('producto')
            .select(['producto.prod_nombre', 'producto.prod_precio'])
            .getMany();
    }

    // obtener un producto por id
    async obtenerProducto(id: number): Promise<ProductoEntity> {
        const producto = await this._productoRepository.findOne({ where: { prod_id: id } });

        if (!producto) {
            throw new NotFoundException('Producto no encontrado');
        }

        return producto
    }

    // actualizar un producto
    async actualizarProducto(id: number, producto: ProductoEntity): Promise<MessageDto> {
        const productoEncontrado = await this._productoRepository.findOne({ where: { prod_id: id } });

        if (!productoEncontrado) {
            throw new NotFoundException('Producto no encontrado');
        }

        await this._productoRepository.update(id, producto);

        return new MessageDto('Producto actualizado correctamente');
    }

    // eliminar un producto
    async eliminarProducto(id: number): Promise<MessageDto> {
        const productoEncontrado = await this._productoRepository.findOne({ where: { prod_id: id } });

        if (!productoEncontrado) {
            throw new NotFoundException('Producto no encontrado');
        }

        await this._productoRepository.delete(id);

        return new MessageDto('Producto eliminado correctamente');
    }
}
