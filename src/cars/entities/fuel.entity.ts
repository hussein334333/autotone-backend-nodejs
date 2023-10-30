import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'

@Entity()
export class Fuel {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    name_arb: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}
