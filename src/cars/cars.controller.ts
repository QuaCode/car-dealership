import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id') id) {
    return this.carsService.findOneById(id);
  }

  @Post()
  createCar(@Body() body) {
    console.log(body);

    return body;
  }

  @Patch(':id')
  updateCar(@Param('id') id, @Body() body) {
    console.log({ id, body });

    return { method: 'Patch', id, body };
  }

  @Delete(':id')
  deleteCart(@Param('id') id) {
    console.log(id);

    return { method: 'DELETE', id };
  }
}
