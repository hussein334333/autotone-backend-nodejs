// First, create the Notify Entity class
// Next, import TypeORM and the @Entity decorator
import {Entity, Column} from 'typeorm'

// Then, add the @Entity decorator and specify the table name
@Entity('notify')
export class Notify {

    // For each of the attributes, add the @Column decorator
    @Column()
    message: string

    @Column()
    user_id: number

    @Column()
    action_id: number

    @Column()
    read_status: boolean

}
