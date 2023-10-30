
// First, create the Entity Class file with a name that corresponds to the Model name: Notification.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    user_id: number;

    @Column()
    action_id: number;

    @Column()
    read_status: boolean;
}