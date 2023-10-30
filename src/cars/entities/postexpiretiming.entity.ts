import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {Cars} from "./cars.entity"

@Entity()
export class Postexpiretiming {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    expiretime: string

    @ManyToOne(() => Cars, cars => cars.expirePost)
    cars: Cars
}
