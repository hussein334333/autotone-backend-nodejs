
// Nestjs TypeORM Entity Class
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscriptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  day: number;

  @Column()
  name_arb: string;

  @Column()
  car_post: string;
}