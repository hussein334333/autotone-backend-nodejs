import { Entity,Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Attachment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    attachment: string;

    @Column()
    task_id: number;
}
