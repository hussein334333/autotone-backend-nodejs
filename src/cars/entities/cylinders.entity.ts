
//Nestjs TypeORM Entity Class

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('cylinders')
export class Cylinders {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    number: string;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;
}