import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Cars } from './cars.entity';
import { Followers } from './followers.entity';

@Entity()
export class Notifications {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vendor_id: number;

    @Column()
    user_id: number;

    @Column()
    table_id: number;

    @Column()
    table_name: string;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column()
    title_arb: string;

    @Column()
    message_arb: string;

    @Column({
        default: 1
    })
    type: number;

    @Column({
        default: 1
    })
    status: number;

    @OneToOne(type => Cars)
    @JoinColumn({ name: 'table_id' })
    car: Cars;

    @OneToOne(type => Followers)
    @JoinColumn({ name: 'table_id' })
    follower: Followers;

}
