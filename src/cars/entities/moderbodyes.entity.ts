import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'


@Entity()
export class ModerBodyes {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    model_id: number

    @Column()
    bodytype_id: number

}
