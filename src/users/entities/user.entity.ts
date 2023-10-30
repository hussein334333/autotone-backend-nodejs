import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm'
import {Role} from 'src/roles/entities/role.entity'
import {Status} from '../../statuses/entities/status.entity'
import {FileEntity} from '../../files/entities/file.entity'
import {EntityHelper} from 'src/utils/entity-helper'
import {AuthProvidersEnum} from 'src/auth/auth-providers.enum'
import {Exclude, Expose} from 'class-transformer'

@Entity({name: "users"})
export class User extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number

    // For "string | null" we need to use String type.
    // More info: https://github.com/typeorm/typeorm/issues/2567
    @Column({type: String, unique: true, nullable: true})
    @Expose({groups: ['me', 'admin']})
    email: string | null

    @Column({default: AuthProvidersEnum.email})
    @Expose({groups: ['me', 'admin']})
    provider: string

    @Index()
    @Column({name: "first_name", type: String, nullable: true})
    firstName: string | null

    @Index()
    @Column({name: "last_name", type: String, nullable: true})
    lastName: string | null

    @Index()
    @Column({name: "vehicle_registration_country", type: String, nullable: true})
    vehicleRegistrationCountry: string | null

    @Index()
    @Column({name: "vehicle_registration_state", type: String, nullable: true})
    vehicleRegistrationState: string | null

    @Index()
    @Column({name: "vehicle_registration_number", type: String, nullable: true})
    vehicleRegistrationNumber: string | null

    @ManyToOne(() => FileEntity, {
        eager: true,
    })
    @JoinColumn({name: "photo_id"})
    photo?: FileEntity | null

    @ManyToOne(() => Role, {
        eager: true,
    })
    @JoinColumn({name: "role_id"})
    role?: Role | null

    @ManyToOne(() => Status, {
        eager: true,
    })
    @JoinColumn({name: "status_id"})
    status?: Status

    @Column({type: String, nullable: true})
    @Index()
    @Exclude({toPlainOnly: true})
    hash: string | null

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date
}
