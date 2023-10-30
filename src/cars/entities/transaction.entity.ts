
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('transaction_history')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    card_id: number;

    @Column()
    amount: number;

    @Column()
    balance_transaction: number;

    @Column()
    payment_status: string;

    @Column()
    owner_id: number;
}
