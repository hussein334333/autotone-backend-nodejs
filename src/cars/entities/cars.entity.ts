//Nestjs TypeORM Entity Class
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn} from "typeorm"
import {Images} from './images.entity'
import {Carmodel} from './carmodel.entity'
import {Carbody} from './carbody.entity'
import {Features} from './features.entity'
import {Brand} from '../../brand/entities/brand.entity'
import {Carlikes} from './carlikes.entity'
import {Carviews} from './carviews.entity'
import {User} from './users.entity'
import {Cites} from './cites.entity'
import {Postexpiretiming} from './postexpiretiming.entity'

@Entity()
export class Cars {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    title: string

    @Column()
    regional_specs: string

    @Column()
    brand_id: number

    @Column()
    model_id: number

    @Column()
    body_type: number

    @Column()
    car_type: string

    @Column()
    installment: string

    @Column()
    price: number

    @Column()
    description: string

    @Column()
    warranty: string

    @Column()
    transmission: string

    @Column()
    fuel_type: string

    @Column()
    color: string

    @Column()
    year: number

    @Column()
    mileage: number

    @Column()
    body_condition: string

    @Column()
    mechanical_condition: string

    @Column()
    seating_capacity: number

    @Column()
    cylinders: number

    @Column()
    horsepower: number

    @Column()
    car_location: number

    @Column()
    vendor_id: number

    @Column()
    car_likes: number

    @Column()
    expire_date: Date

    @Column()
    car_views: number

    @OneToMany(type => Images, images => images.car)
    carimages: Images[]

    @OneToOne(type => Carmodel, carmodel => carmodel.cars)
    carmodel: Carmodel

    @OneToOne(type => Carbody, carbody => carbody.cars)
    bodytype: Carbody

    @OneToMany(type => Features, features => features.cars)
    features: Features[]

    @OneToOne(type => Brand, brand => brand.cars)
    brand: Brand

    @OneToMany(type => Carlikes, carlikes => carlikes.cars)
    postLike: Carlikes[]

    @OneToMany(type => Carviews, carviews => carviews.cars)
    postView: Carviews[]

    @OneToOne(type => User, user => user.cars)
    vander: User

    @OneToOne(type => Cites, cites => cites.cars)
    city: Cites

    @OneToMany(type => Postexpiretiming, postexpiretiming => postexpiretiming.cars)
    expirePost: Postexpiretiming[]

    // get attribute price
    getPriceAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    //get attribute year
    getYearAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    //get attribute mileage
    getMileageAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    //get attribute seating_capacity
    getSeatingCapacityAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    //get attribute cylinders
    getCylindersAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    //get attribute horsepower
    getHorsepowerAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    //get attribute car_views
    getCarViewsAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    //get attribute car_likes
    getCarLikesAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    // get attribute created_at
    getCreatedAtAttribute(value: Date) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

    getCarSharesAttribute(value: number) {
        //if (request()->language == 1) return Numbers::ShowInArabicDigits($value);
        return value
    }

}
