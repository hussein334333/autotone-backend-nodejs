import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('device_data')
export class Devicedata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id'
    })
    userId: number;

    @Column({
        name: 'device_token'
    })
    deviceToken: string;

    @Column({
        name: 'platform'
    })
    platform: string;
}
