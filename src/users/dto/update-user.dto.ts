import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//definiremos un DTO de actualización que extienda el DTO de creación y haga que todos los campos sean opcionales.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
