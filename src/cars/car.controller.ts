import {Controller, Body, Post} from '@nestjs/common'
import {CarService} from './car.service'
import {CreateCarDto} from "./dtos/create-car.dto"
import {Car} from "./entities/price.entity"

@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) {
    }

    @Post()
    async addCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return await this.carService.addCar(createCarDto)
    }
}
