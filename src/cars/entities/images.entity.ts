import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn} from "typeorm"
import {Cars} from "./cars.entity"

// NestJS TypeORM Entity Class
@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  car_id: number;

  @Column()
  image: string;

  @ManyToOne(() => Cars, todoList => todoList.carimages)
  car: Cars;
}
