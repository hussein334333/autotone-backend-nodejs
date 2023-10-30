import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

//Converting Laravel Model file into Nestjs TypeORM Entity Class

@Entity('user_addresses')
export class UserAddresses {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column()
    user_id: number

    @Column({nullable: true})
    landmark: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    country: string

    @Column()
    longitude: number

    @Column()
    latitude: number

    @Column({default: '1'})
    is_current: string

}
