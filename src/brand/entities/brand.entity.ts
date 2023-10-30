import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Carmodel } from '../../cars/entities/carmodel.entity';
import { Cars } from '../../cars/entities/cars.entity';

@Entity('brand')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'delete_status' })
  deleteStatus: boolean;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'name_arb' })
  nameArb: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(type => Carmodel, carmodel => carmodel.brand)
  model: Carmodel[];

  @ManyToOne(type => Carmodel, carmodel => carmodel.brand)
  models: Carmodel[];

  @OneToMany(type => Cars, cars => cars.brand)
  cars: Cars[];

  @OneToOne(type => Cars, cars => cars.brand)
  nonExpiredCars: Cars[];

  public getImageAttribute(img: string) {
    return img;
  }

}
