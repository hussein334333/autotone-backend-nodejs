import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'department' })
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: string;

}
