import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'

@Entity()
export class NotifyUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    task_id: string

    @Column()
    action: string

    @Column()
    users_id: string
}
