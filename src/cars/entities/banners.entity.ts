import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity('banners')
export class Banners {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'benner_image'})
    bennerImage: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    get imageUrl(): string {
        return this.bennerImage
    }

}
