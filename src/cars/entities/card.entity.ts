
// Nestjs TypeORM Entity Class
@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    customer_id: number;

    @Column()
    brand: string;

    @Column()
    last4: string;

    @Column()
    name: string;

    @Column()
    is_default: boolean;

    @Column()
    exp_month: number;

    @Column()
    exp_year: number;

    @Column()
    card_id: string;

    @Column()
    card_type: string;

    @Column()
    token: string;

    public createCard(data: any): Card {
        const card = new Card();
        card.user_id = data.user_id;
        card.customer_id = data.customer_id;
        card.token = data.token;
        card.brand = data.brand;
        card.last4 = data.last4;
        card.name = data.name;
        card.is_default = data.is_default;
        card.exp_month = data.exp_month;
        card.exp_year = data.exp_year;
        card.card_id = data.card_id;
        card.card_type = data.card_type || null;
        return card;
    }
}