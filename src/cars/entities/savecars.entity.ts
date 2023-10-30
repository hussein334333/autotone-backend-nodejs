import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import {Images} from './images.entity'
import {Cars} from './cars.entity'

@Entity('user_saved_cars')
export class Savecars {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Images, images => images.car_id)
    carimages: Images[]

    @OneToMany(type => Images, images => images.car_id)
    carlikeimage: Images

    @ManyToOne(type => Cars, cars => cars.id)
    car: Cars
}
