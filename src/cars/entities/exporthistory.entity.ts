import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExportHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    owner_id: number;

}
