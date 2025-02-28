import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';

@Entity({ name: 'categoria' })
export class CategoriaEntity {
    @PrimaryGeneratedColumn()
    cat_id: number;

    @Column({ type: 'varchar', length: 40, nullable: false, unique: true })
    cat_nombre: string;

    @OneToMany(() => ProductoEntity, producto  => producto.prod_id, { onDelete: 'CASCADE' })
    producto: ProductoEntity[];
}