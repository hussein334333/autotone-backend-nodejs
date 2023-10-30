import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auto_task')
export class CroneTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'next_date' })
  nextDate: string;

  @Column({ name: 'date' })
  date: string;
}
