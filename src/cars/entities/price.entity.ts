import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('admin_price')
export class Car {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    price: string
}

