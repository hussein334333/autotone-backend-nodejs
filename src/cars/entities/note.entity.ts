import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {User} from "./users.entity"

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @Column()
    task_id: number;

    @Column()
    parent_id: number;

    @OneToMany(type => User, user => user.id)
    createdtask: User[];
}
