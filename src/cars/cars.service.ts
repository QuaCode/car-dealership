import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { ICar } from './interfaces';

@Injectable()
export class CarsService {
  private cars: ICar[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
    { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find(item => item.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create({ brand, model }: CreateCarDto): ICar {
    const newCar = { brand, model, id: uuid() };
    this.cars.push(newCar);

    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto): ICar {
    const carToUpdate = this.findOneById(id);
    const carUpdated = { id, ...carToUpdate, ...updateCarDto };
    this.cars = this.cars.map(car => (car.id === carUpdated.id ? carUpdated : car));

    return carUpdated;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter(car => car.id !== id);
    return { message: `Car with id ${id} deleted` };
  }
}
