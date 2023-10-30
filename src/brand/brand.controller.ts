import {
    Controller,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
    Get,
    Query,
    Req,
} from '@nestjs/common'
import {FileInterceptor} from '@nestjs/platform-express'
import {Request} from 'express'
import {BrandService} from './brand.service' // Import the BrandService if it exists in your project

@Controller('api/brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {
    }

    @Post('addBrand')
    @UseInterceptors(FileInterceptor('image'))
    async addBrand(@UploadedFile() image, @Body() body, @Req() request: Request) {
        return this.brandService.addBrand(body, image, request)
    }

    @Post('addCarModel')
    async addCarModel(@Body() body) {
        return this.brandService.addCarModel(body)
    }

    @Post('addCarBody')
    @UseInterceptors(FileInterceptor('image'))
    async addCarBody(
        @UploadedFile() image,
        @Body() body,
        @Req() request: Request,
    ) {
        return this.brandService.addCarBody(body, image, request)
    }

    @Get('getBodyType')
    async getBodyType(@Query('language') language: string) {
        return this.brandService.getBodyType(language)
    }

    @Get('getBody')
    async getBody(@Query('language') language: string) {
        return this.brandService.getBody(language)
    }
}
