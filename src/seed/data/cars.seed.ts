import { v4 as uuid } from 'uuid';
import { ICar } from 'src/cars/interfaces';

export const CARS_SEED: ICar[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Prado',
  },
  {
    id: uuid(),
    brand: 'Honda',
    model: 'Civic',
  },
  {
    id: uuid(),
    brand: 'Hyundai',
    model: 'Elantra',
  },
];
