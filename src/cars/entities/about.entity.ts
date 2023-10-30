import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('about')
export class About {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    description_arb: string
}
