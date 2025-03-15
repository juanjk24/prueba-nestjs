import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'producto' })
export class ProductoEntity {
    @PrimaryGeneratedColumn()
    prod_id: number;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    prod_nombre: string;

    @Column({ type: 'decimal', nullable: false })
    prod_precio: number;
}