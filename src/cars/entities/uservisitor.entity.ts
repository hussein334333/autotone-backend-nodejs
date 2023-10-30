import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class UserVisitor {

    @PrimaryGeneratedColumn()
    id: number

}
