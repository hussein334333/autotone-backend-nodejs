
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  validates: string;

  @Column()
  description: string;

  @Column()
  user_id: number;

  @Column()
  name: string;
}
