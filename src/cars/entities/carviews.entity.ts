import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Images } from './images.entity';
import {Cars} from "./cars.entity"

@Entity('carviews')
export class Carviews {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    car_id: number;

    @Column()
    user_id: number;

    @OneToMany(type => Images, images => images.car_id)
    carimages: Images[];

    @ManyToOne(() => Cars, cars => cars.postView)
    cars: Cars
}
