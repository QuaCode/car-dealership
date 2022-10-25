# Introduccion a NestJs

NestJs es un marco de trabajo que por debajo usa Express o Fastify. NestJs mantiene un orden, gerarquia y forma de llamar cada archivo. Por ende 2 APIs creadas con NestJs seran muy parecidas entre si. Y por defecto usa TypeScript.

## Nota

[Aquí](https://torch-neighbor-933.notion.site/NestJS-e4c57083bd9f4e4b984cae9f0f8e6c56) tienes las notas en Notion
⌨️ con ❤️ por [QuaCode](https://github.com/QuaCode) 😊

## ¿Por qué usarlo?

Usar NestJs nos da un mejor soporte, una mejor API para su consumo y facilidad de lectura de codigo.

Pero si es necesario puedes usar codigo de NodeJs/Express o Fastify.

## Nest CLI

```jsx
npm i -g @nestjs/cli

```

## Core Nest building blocks

- **Module**

  Agrupan y desacoplan un conjunto de funcionalidad específica por dominio. Ej: auth.module.ts, encargado de todo lo relacionado a la autenticación

- **Controladores (Post, Patch, Get, Delete)**

  Controlan rutas, son los encargados de escuchar la solicitud y emitir una respuesta. Ej: Rutas CRUD

- **Servicios**

  Alojan la lógica de negocio de tal manera que sea reutilizable mediante inyección de dependencias. Ej: PeliculasService para todo lo relacionado a obtener, grabar, actualizar o eliminar información de películas.

- **Pipes**

  Una tubería es una clase anotada con el decorador, que implementa la interfaz.`@Injectable()PipeTransform`

  Las tuberías tienen dos casos de uso típicos:

  - **Transformación**: transformar los datos de entrada a la forma deseada (por ejemplo, de cadena a entero)
  - **validación**: evalúe los datos de entrada y, si son válidos, simplemente páselos sin cambios; De lo contrario, produzca una excepción cuando los datos sean incorrectos

  ```tsx
  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  ```

- **Exception Filters**

  Transformar la data recibida en requests, para asegurar un tipo, valor o instancia de un objeto. Ej: Transformar a números, validaciones, etc

  - BadRequestException UnauthorizedException
  - NotFoundException ForbiddenException
  - RequestTimeoutException GoneException
  - PayloadTooLargeException InternalServerErrorException

    ```tsx
    const car = this.cars.find(item => item.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    ```

# DTOs y Validacion de informacion

Los DTO con clases que nos permiten validar la informacion que el usuario nos envia y mantenerla a lo largo del manejo de esos datos.

Puediendo validarla y regresar errores al usuario segun los datos que envie.

```tsx
import { IsString } from 'class-validator'; // Package to validate with @UsePipes(ValidationPipes)

export class CreateCarDto {
  //DTO class
  @IsString() // Is String? you can write your error message
  readonly brand: string;

  @IsString()
  readonly model: string;
}
```

## Patch, Post, Delete

```tsx
@Post() //Method
  @UsePipes(ValidationPipe) //Use Pipes to validate with dto
  createCar(@Body() createCarDto: CreateCarDto ) { //CreateCarDto : DTO
    console.log(createCarDto);

    return createCarDto;
  }

```

## Seguir el principio DRY (Don't repeat yourself)

El DTO de createCarDto lo utilizaremos siempre a lo largo de la app seria bueno tenerlo a nivel global.

## Validaciones automáticas

Con los paquetes `class-validator class-transformer` nos permitiran agregar validaciones a nuestros DTO.

Algunos decoradores de [Class Validator](https://github.com/typestack/class-validator#validation-decorators)

- IsOptional
- IsPositive
- IsMongoId
- IsArray
- IsString
- IsUUID
- IsDecimal
- IsDate
- IsDateString
- IsBoolean
- IsEmail
- IsUrl

```tsx
import { IsString } from 'class-validator'; // Package to validate with @UsePipes(ValidationPipes)

export class CreateCarDto {
  //DTO class
  @IsString() // Is String? you can write your error message
  readonly brand: string;

  @IsString()
  readonly model: string;
}
```

## Class Validator

Permite el uso de validación basada en decorador y no decorador. Utiliza internamente [validador.js](https://github.com/chriso/validator.js) para realizar la validación. El validador de clases funciona tanto en plataformas .js navegador como en nodos.

```tsx
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class Post {
  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;

  @IsDate()
  createDate: Date;
}
```

[GitHub](https://github.com/typestack/class-validator#readme)

## Class Transformer

El transformador de clase le permite transformar el objeto simple en alguna instancia de clase y viceversa.

[GitHub](https://github.com/typestack/class-transformer#readme)

## Algunos decoradores del Class Validator útiles

- IsOptional
- IsPositive
- IsMongoId
- IsArray
- IsString
- IsUUID
- IsDecimal
- IsDate
- IsDateString
- IsBoolean
- IsEmail
- IsUrl

# Brands CRUD completo

Con la ayuda de la CLI de NestJs podemos crear las bases de un CRUD completo podiendo agregar nuestra logica de negocio luego nosotros sobre una base ya establecida.

```bash
Crear las bases para un CRUD

nest g res brands

// Flags
// --no-spec => Crear sin tests

```

## Inyección de dependencias de módulos externos

### Exportar Modulo

Para poder exportar un module y usarlo en otros tendremos que ir a nuestro archivo ${name}.module.ts y agregar el servicio que queremos exponer a los otros modulos.

```tsx
import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService], // Exponer CarsService a otros Modulos
})
export class CarsModule {}
```

### Importar Modulo

Para importar un modulo desde otro tendremos que agregar el siguiente codigo `imports: [CarsModule, BrandsModule],` a nuestro modulo.

```tsx
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CarsModule } from 'src/cars/cars.module';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CarsModule, BrandsModule],
})
export class SeedModule {}
```

## SEED Endpoint

Crear un SEED o una semilla nos ayudara a crear datos falsos con los cuales un nuevo dev que se integre al equipo pueda jugar sin afectar la aplicacion.

```bash
nest g res seed --no-spec

```

Esto nos creara un modulo nuevo con el nombre de SEED nosotros podemos borrar los dtos y los entities y crear una carpeta llamada data en ella podremos agregar los mocks que querremos inyectar en nuestros modulos.

```tsx
// EJEMPLO
// Mock de brands
import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Volvo',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Jeep',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Toyota',
    createdAt: new Date().getTime(),
  },
];
```

En nuestro `seed.controller.ts` podremos dejar unicamente un endpoint

```tsx
@Get()
  runSeed() {
    return this.seedService.populateDB();
  }

```

Al igual que en nuestro seed.services.ts podremos dejar unicamente un metodo

```tsx
populateDB() {
    return 'SEED execute successfully';
  }

```

En cada uno de los servicios donde querremos agregar nuestro mock tendremos que agregar un servicio que nos permita ello por eso c

```tsx
// cars.services.ts
// Agregar el metodo
fillCarsWithSeedData(cars: ICar[]) {
    this.cars = cars;
  }

```

Una vez [creado el metodo](https://www.notion.so/Nest-CLI-and-Import-Export-Module-85c33407fa094c6c9abe02786955a257) y [importado los servicios de los modulos](https://www.notion.so/Nest-CLI-and-Import-Export-Module-85c33407fa094c6c9abe02786955a257) a los que querremos agregar los mocks podremos importarla en nuestro constructor y ejecutar ese servicio enviando nustro mock.

```tsx
constructor(
 // Importamos los servicios que utilizaremos
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ) {}

  populateDB() {
// Esto agrega el mock CARS_SEED a carsService
    this.carsService.fillCarsWithSeedData(CARS_SEED);

// Esto agrega el mock BRANDS_SEED a brandsService
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);

    return 'SEED execute successfully';
  }

```
