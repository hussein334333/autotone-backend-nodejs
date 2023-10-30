//Nestjs Entity Class
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'
import {Cars} from "./cars.entity"

@Entity()
export class Features {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'varchar', length: 255})
    name: string

    @Column({type: 'varchar', length: 255})
    delete_status: string

    @Column({type: 'varchar', length: 255})
    name_arb: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Cars, cars => cars.features)
    cars: Cars
}
