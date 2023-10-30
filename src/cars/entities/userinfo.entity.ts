import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('usersinfo')
export class Userinfo {

    // add the necessary columns
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    gender: string

    @Column()
    born: Date

    @Column()
    fathername: string

    @Column()
    address1: string

    @Column()
    address2: string

    @Column()
    interior_house: string

    @Column()
    exterior_house: string

    @Column()
    zipcode: number

    @Column()
    country: string

    @Column()
    chronic_illness: string

    @Column()
    consume_medicines: string

    @Column()
    allergic_medication: string

    @Column()
    fractures: string

    @Column()
    supervison: string

    @Column()
    marital_status: string

    @Column()
    education_level: string

}
