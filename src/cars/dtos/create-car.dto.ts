// create-car.dto.ts
export class CreateCarDto {
    name: string
    title: string
    brandId: number
    vendorId: number
    modelId?: number
    bodyType: string
    carType: string
    installment: string
    price: string
    description: string
    warranty: string
    regionalSpecs: string
    transmission: string
    fuelType: string
    color: string
    year: number
    mileage: number
    bodyCondition: string
    mechanicalCondition: string
    seatingCapacity: number
    cylinders: number
    horsepower: number
    carLocation: number
    carImage: any[] // Assuming you handle file uploads appropriately
    features: number[]
}
