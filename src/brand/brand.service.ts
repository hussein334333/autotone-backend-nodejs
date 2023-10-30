import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity'; // Import the Brand entity if it exists in your project
import { Carmodel } from '../cars/entities/carmodel.entity'; // Import the Carmodel entity if it exists in your project
import { Carbody } from '../cars/entities/carbody.entity'; // Import the Carbody entity if it exists in your project

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
        @InjectRepository(Carmodel)
        private readonly carModelRepository: Repository<Carmodel>,
        @InjectRepository(Carbody)
        private readonly carBodyRepository: Repository<Carbody>,
    ) {}

    async addBrand(data, image, request) {
        const brand = new Brand();
        brand.name = data.name;
        brand.nameArb = data.name_arb;
        brand.image = image.path; // Assuming 'image' is the uploaded file object
        return await this.brandRepository.save(brand);
    }

    async addCarModel(data) {

        const carModel = new Carmodel();
        carModel.name = data.name;
        carModel.name_arb = data.name_arb;
        carModel.brand = data.brand_id; // Assuming 'brand_id' is the ID of the associated brand
        return await this.carModelRepository.save(carModel);
    }

    async addCarBody(data, image, request) {

        const carBody = new Carbody();
        carBody.name = data.name;
        carBody.name_arb = data.name_arb;
        carBody.model = data.model_id; // Assuming 'model_id' is the ID of the associated car model
        carBody.image = image.path; // Assuming 'image' is the uploaded file object
        return  await this.carBodyRepository.save(carBody);

    }

    async getBodyType(language: string) {
        return await this.carBodyRepository.find({ where: { delete_status: false } });
    }

    async getBody(language: string) {
        return await this.carBodyRepository.find({ where: { delete_status: false } });
    }
}
