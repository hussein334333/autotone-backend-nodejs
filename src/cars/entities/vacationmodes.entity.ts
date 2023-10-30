//This is the NestJS TypeORM Entity Class that corresponds to the given Laravel Model file

import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class VacationModes {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
