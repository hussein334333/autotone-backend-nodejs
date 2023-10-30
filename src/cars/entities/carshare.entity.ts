
// CarShare.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Images } from './Images.entity';
import { Cars } from './Cars.entity';
import {User} from "./users.entity"

@Entity()
export class CarShare {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    car_id: number;

    @Column()
    user_id: number;

    @OneToMany(type => Images, images => images.car_id)
    carimages: Images[];

    @OneToOne(type => Images)
    @JoinColumn({ name: "car_id" })
    carshareimage: Images;

    @ManyToOne(type => Cars, cars => cars.id)
    car: Cars;

    @ManyToOne(type => User, cars => cars.carShares)
    vendor: Cars;
}
