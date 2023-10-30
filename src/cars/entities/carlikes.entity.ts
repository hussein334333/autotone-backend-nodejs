
// Here is the converted code from PHP to NestJS TypeORM Entity Class:

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Images } from './images.entity';
import {Cars} from "./cars.entity"

@Entity()
export class Carlikes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'car_id'})
    carId: number;

    @Column({name: 'user_id'})
    userId: number;

    @OneToMany(type => Images, carImages => carImages.car)
    carImages: Images[];

    @ManyToOne(type => Images, carLikeImage => carLikeImage.car)
    carLikeImage: Images;

    @ManyToOne(() => Cars, cars => cars.features)
    cars: Cars

}
