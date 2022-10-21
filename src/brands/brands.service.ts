import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const newBrand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(item => item.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const { name } = updateBrandDto;
    const branToUpdate = this.findOne(id);
    const brandUpdated: Brand = { id, ...branToUpdate, name, updatedAt: new Date().getTime() };
    this.brands = this.brands.map(brand => (brand.id === brandUpdated.id ? brandUpdated : brand));

    return brandUpdated;
  }

  remove(id: string) {
    this.findOne(id);
    this.brands = this.brands.filter(brand => brand.id !== id);
    return { message: `Car with id ${id} deleted` };
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
