import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    ManyToOne
} from 'typeorm'
import {hashSync} from 'bcryptjs'
import {CarShare} from './CarShare.entity'
import {Cars} from "./cars.entity" // Import the CarShare entity if it exists in your project

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    role: string

    @Column({nullable: true})
    username: string

    @Column()
    password: string

    // ... (other columns)

    @Column({default: 0})
    total_visitor: number

    @Column({default: 0})
    total_likes: number

    @Column({default: 0})
    total_carviews: number

    @Column({default: 0})
    total_followers: number

    // ... (other columns)

    @OneToMany(() => CarShare, (carShare) => carShare.vendor)
    carShares: CarShare[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = hashSync(this.password, 10)
        }
    }

    @ManyToOne(() => Cars, cars => cars.vander)
    cars: Cars

    // Other methods and hooks can be added here
}
