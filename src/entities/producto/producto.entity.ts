import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { CategoriaEntity } from '../categoria/categoria.entity';

@Entity({ name: 'producto' })
export class ProductoEntity {
    @PrimaryGeneratedColumn()
    prod_id: number;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    prod_nombre: string;

    @Column({ type: 'decimal', nullable: false })
    prod_precio: number;

    @ManyToOne(() => CategoriaEntity, categoria => categoria.cat_id, { onDelete: 'CASCADE' })
    categoria: CategoriaEntity;
}