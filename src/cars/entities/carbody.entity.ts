//First, create the Nestjs TypeORM Entity Class for the Laravel Model file.
import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from 'typeorm'
import {Carmodel} from './carmodel.entity'
import {ModerBodyes} from './moderbodyes.entity'
import {Cars} from "./cars.entity"

@Entity('car_body')
export class Carbody {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    model_id: number

    @Column()
    delete_status: boolean

    @Column()
    name: string

    @Column()
    name_arb: string

    @OneToOne(type => Carmodel)
    @JoinColumn({name: 'model_id'})
    model: Carmodel

    @OneToMany(type => Cars, cars => cars.carmodel)
    cars: Cars[];

    @Column()
    image: string

}
