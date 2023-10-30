import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    image: string

    @Column()
    task_id: number
}
