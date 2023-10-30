import {Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {Car} from "./entities/price.entity"
import {CreateCarDto} from "./dtos/create-car.dto"

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
    ) {
    }


    async addCar(request: CreateCarDto) {
        const carData = {
            name: request.name,
            title: request.title,
            brand_id: request.brandId,
            vendor_id: request.vendorId,
            model_id: request.modelId,
            body_type: request.bodyType,
            car_type: request.carType,
            installment: request.installment,
            price: request.price,
            description: request.description,
            warranty: request.warranty,
            regional_specs: request.regionalSpecs,
            transmission: request.transmission,
            fuel_type: request.fuelType,
            color: request.color,
            year: request.year,
            mileage: request.mileage,
            body_condition: request.bodyCondition,
            mechanical_condition: request.mechanicalCondition,
            seating_capacity: request.seatingCapacity,
            cylinders: request.cylinders,
            horsepower: request.horsepower,
            car_location: request.carLocation,
            car_image: request.carImage,
            features: request.features,
        }
        return await this.carRepository.create(carData)
    }
}
