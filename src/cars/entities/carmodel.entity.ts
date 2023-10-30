
// Converted Nestjs TypeORM Entity Class

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Brand } from '../../brand/entities/brand.entity';
import { ModerBodyes } from './moderBodyes.entity';
import { Carbody } from './carbody.entity';
import { Cars } from './cars.entity';

@Entity('model')
export class Carmodel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_arb: string;

  @Column()
  delete_status: boolean;

  @Column()
  brand_id: number;

  @OneToOne(type => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(type => Carbody, carbody => carbody.models)
  @JoinTable({
    name: 'moder_bodyes',
    joinColumn: {
      name: 'model_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'bodytype_id',
      referencedColumnName: 'id'
    }
  })
  body: Carbody[];

  @OneToMany(type => Cars, cars => cars.carmodel)
  cars: Cars[];

  @OneToMany(type => Cars, cars => cars.carmodel)
  nonExpiredCars: Cars[];
}
