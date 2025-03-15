import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { ProductoEntity } from 'src/entities/producto/producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-produc.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly _productoRepository: Repository<ProductoEntity>,
  ) {}

  // crear un producto
  async crearProducto(producto: CreateProductoDto): Promise<MessageDto> {
    try {
      const { prod_nombre } = producto;

      // validar si el producto ya existe
      const productoEncontrado = await this._productoRepository.findOne({
        where: { prod_nombre },
      });

      if (productoEncontrado)
        throw new NotFoundException(new MessageDto('El producto ya existe'));

      // crear el producto
      const productoNuevo = this._productoRepository.create(producto);
      await this._productoRepository.save(productoNuevo);

      return new MessageDto('Producto creado correctamente');
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        new MessageDto('Error en el servidor'),
      );
    }
  }

  // obtener todos los productos
  async obtenerProductos(): Promise<ProductoEntity[]> {
    try {
      const productos = await this._productoRepository
        .createQueryBuilder('producto')
        .select(['producto.prod_nombre', 'producto.prod_precio'])
        .getMany();

      if (!productos) {
        throw new NotFoundException(
          new MessageDto('No hay productos registrados'),
        );
      }

      return productos;
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageDto('Error en el servidor'),
      );
    }
  }

  // obtener un producto por id
  async obtenerProducto(id: number): Promise<ProductoEntity> {
    try {
      const producto = await this._productoRepository.findOne({
        where: { prod_id: id },
      });

      if (!producto) {
        throw new NotFoundException(new MessageDto('Producto no encontrado'));
      }

      return producto;
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageDto('Error en el servidor'),
      );
    }
  }

  // actualizar un producto
  async actualizarProducto(
    id: number,
    producto: UpdateProductoDto,
  ): Promise<MessageDto> {
    try {
      const productoEncontrado = await this._productoRepository.findOne({
        where: { prod_id: id },
      });

      const exists = await this._productoRepository
        .createQueryBuilder('producto')
        .where('producto.prod_id != :id', { id })
        .andWhere('producto.prod_nombre = :prod_nombre', {
          prod_nombre: producto.prod_nombre,
        })
        .getOne();

      if (exists) {
        throw new BadRequestException(new MessageDto('El producto ya existe'));
      }

      if (!productoEncontrado) {
        throw new NotFoundException(new MessageDto('Producto no encontrado'));
      }

      productoEncontrado.prod_nombre =
        producto.prod_nombre ?? productoEncontrado.prod_nombre;
      productoEncontrado.prod_precio =
        producto.prod_precio ?? productoEncontrado.prod_precio;

      await this._productoRepository.save(productoEncontrado);

      return new MessageDto('Producto actualizado correctamente');
    } catch (error) {
      throw new InternalServerErrorException(
        new MessageDto('Error en el servidor'),
      );
    }
  }

  // eliminar un producto
  async eliminarProducto(id: number): Promise<MessageDto> {
    try {
      const productoEncontrado = await this._productoRepository.findOne({
        where: { prod_id: id },
      });

      if (!productoEncontrado) {
        throw new NotFoundException('Producto no encontrado');
      }

      await this._productoRepository.delete(productoEncontrado);

      return new MessageDto('Producto eliminado correctamente');
    } catch (error) {
        throw new InternalServerErrorException(
            new MessageDto('Error en el servidor'),
        );
    }
  }
}
