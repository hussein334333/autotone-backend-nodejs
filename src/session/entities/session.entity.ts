import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn, UpdateDateColumn, JoinColumn,
} from 'typeorm'
import {User} from '../../users/entities/user.entity'
import {EntityHelper} from 'src/utils/entity-helper'

@Entity()
export class Session extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, {
        eager: true,
    })
    @JoinColumn({name: "user_id"})
    @Index()
    user: User

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date
}
